const { default: mongoose } = require("mongoose");
const Report = require("../models/report.model");
const Car = require("../models/car.model");

const moment = require("moment");
exports.createReport = async (req, res) => {
  try {
    car = req.body.car;
    contract = req.body.contract;
    const newReport = new Report({
      car: car,
      contract: contract,
    });

    const result = await newReport.save();

    return res.status(201).json(result);
  } catch (err) {
    return res.status(400).json({ status: 400, message: err.message });
  }
};

exports.deleteReport = async (req, res) => {
  const { id } = req.params;

  Report.findByIdAndDelete({ _id: id })
    .then((Report) => {
      if (Report) {
        return res.status(205).json({
          status: 400,
          message: "successfully deleted",
        });
      }
      return res.status(404).json({ status: 404, message: "Report not found" });
    })
    .catch((err) => {
      return res.status(500).json({ status: 500, message: err.message });
    });
};

exports.getReportById = async (req, res) => {
  try {
    const { id } = req.params;
    const Report = await Report.findById(id);

    if (!Report) {
      return res.status(404).json({ status: 404, message: "Report not found" });
    }

    return res.status(200).json(Report);
  } catch (error) {
    return res.status(400).json({ status: 400, message: error.message });
  }
};

exports.updateReport = async (req, res) => {
  await Report.findByIdAndUpdate(req.params.id, { $set: req.body })
    .then((Report) => {
      if (Report) {
        return res.status(200).json({
          status: 200,
          data: Report,
          message: "Successfully updated Report",
        });
      }
      return res.status(404).json({ status: 404, message: "Report not found" });
    })
    .catch((error) => {
      return res.status(400).json({
        status: 400,
        message: error.message,
      });
    });
};

exports.getAllReports = async (req, res) => {
  rentedCars = [];
  availableCars = [];
  try {
    const reports = await Report.find({}).populate("car").populate("contract");
    const cars = await Car.find({});

    reports.map((item) => {
      if (item.car.rented) {
        rentedCars.push(item.car);
      }
    });

    cars.map((item) => {
      if (!item.rented) {
        availableCars.push(item);
      }
    });

    return res.status(200).json({
      rentedCars: rentedCars,
      availableCars: availableCars,
    });
  } catch (error) {
    return res.status(400).json({ status: 400, message: error.message });
  }
};

exports.fetchMonthlyRep = async (req, res) => {
  monthlyRep = [];
  try {
    const reports = await Report.find({}).populate("car").populate("contract");

    reports.map((item) => {
      monthlyRep.push(item);

      "*Monthly", monthlyRep;
    });

    return res.status(200).json({
      monthlyRep,
    });
  } catch (error) {
    return res.status(400).json({ status: 400, message: error.message });
  }
};

exports.getWeeklyReports = async (req, res) => {
  const result = await getWeeklyReports(req.body.startDate, req.body.endDate);

  return res.status(200).json(result);
};

exports.getMonthlyReports = async (req, res) => {
  const result = await getMonthlyReports(req.body.startDate, req.body.endDate);

  return res.status(200).json(result);
};

exports.getYearlyReports = async (req, res) => {
  const result = await getYearlyReports(req.body.startDate, req.body.endDate);

  return res.status(200).json(result);
};

exports.getContractCount = async (req, res) => {
  const aggragationPip = [
    {
      $lookup: {
        from: "contracts",
        localField: "contract",
        foreignField: "_id",
        as: "contractDetails",
      },
    },
    {
      $unwind: "$contractDetails",
    },

    {
      $group: {
        _id: "$contractDetails.status",
        count: { $sum: 1 },
      },
    },
  ];

  let openContracts = 0;
  let closedContracts = 0;

  Report.aggregate(aggragationPip).then((item) => {
    openContracts =
      item.find((result) => result._id === "Contract is Open")?.count || 0;
    console.log("open contract", openContracts);
    closedContracts =
    item.find((result) => result._id === "Contract is Closed")?.count || 0;
    console.log("closed contract", closedContracts);
  
  return res.status(200).json({ openContracts, closedContracts });
  })
};

async function getYearlyReports(startDate, endDate) {
  try {
    const aggregationPipeline = [
      {
        $lookup: {
          from: "contracts",
          localField: "contract",
          foreignField: "_id",
          as: "contractDetails",
        },
      },
      {
        $unwind: "$contractDetails",
      },
      {
        $addFields: {
          incomeField: {
            $subtract: [
              "$contractDetails.sum",
              {
                $multiply: [
                  "$contractDetails.sum",
                  "$contractDetails.discount",
                ],
              },
            ],
          },
          carOutDate: {
            $toDate: "$contractDetails.car_out",
          },
          year: { $year: { $toDate: "$contractDetails.car_out" } },
        },
      },
      {
        $match: {
          carOutDate: {
            $gte: new Date(startDate),
            $lte: new Date(endDate),
          },
        },
      },
      {
        $group: {
          _id: "$year",
          totalContracts: { $sum: 1 },
          totalIncome: { $sum: "$incomeField" },
        },
      },
      {
        $project: {
          _id: 0,
          year: "$_id",
          totalIncome: 1,
          totalContracts: 1,
        },
      },
    ];

    "Initial Pipeline:", aggregationPipeline;

    const reports = await Report.aggregate(aggregationPipeline);

    "Reports:", reports;

    return reports;
  } catch (err) {
    console.error(err);
    return [];
  }
}

async function getMonthlyReports(startDate, endDate) {
  try {
    const aggregationPipeline = [
      {
        $lookup: {
          from: "contracts",
          localField: "contract",
          foreignField: "_id",
          as: "contractDetails",
        },
      },
      {
        $unwind: "$contractDetails",
      },
      {
        $addFields: {
          carOutDate: {
            $toDate: "$contractDetails.car_out",
          },
          carBackDate: {
            $toDate: "$contractDetails.car_back",
          },
          incomeField: "$contractDetails.payable",
          month: { $month: { $toDate: "$contractDetails.car_out" } },
          year: { $year: { $toDate: "$contractDetails.car_out" } },
        },
      },
      {
        $match: {
          carOutDate: { $gte: new Date(startDate) },
          carBackDate: { $lte: new Date(endDate) },
        },
      },
      {
        $group: {
          _id: {
            serial:"$serial",
            month: "$month",
            year: "$year",
          },
          totalContracts: { $sum: 1 },
          totalIncome: { $sum: "$incomeField" },
        },
      },
      {
        $addFields: {
          monthString: {
            $let: {
              vars: {
                months: [
                  "",
                  "January",
                  "February",
                  "March",
                  "April",
                  "May",
                  "June",
                  "July",
                  "August",
                  "September",
                  "October",
                  "November",
                  "December",
                ],
              },
              in: { $arrayElemAt: ["$$months", "$_id.month"] },
            },
          },
        },
      },
      {
        $project: {
          _id: 0,
          month: "$monthString",
          year: "$_id.year",
          totalIncome: 1,
          totalContracts: 1,
        },
      },
    ];

    const reports = await Report.aggregate(aggregationPipeline);

    return reports;
  } catch (err) {
    console.error(err);
    return [];
  }
}


async function getWeeklyReports(startDate, endDate) {
  try {
    const aggregationPipeline = [
      {
        $lookup: {
          from: "contracts",
          localField: "contract",
          foreignField: "_id",
          as: "contractDetails",
        },
      },
      {
        $unwind: "$contractDetails",
      },
      {
        $addFields: {
          incomeField: {
            $subtract: [
              "$contractDetails.sum",
              {
                $multiply: [
                  "$contractDetails.sum",
                  "$contractDetails.discount",
                ],
              },
            ],
          },
          carOutDate: { $toDate: "$contractDetails.car_out" },
          week: { $week: { $toDate: "$contractDetails.car_out" } },
          monthString: {
            $switch: {
              branches: [
                {
                  case: {
                    $eq: [
                      { $month: { $toDate: "$contractDetails.car_out" } },
                      1,
                    ],
                  },
                  then: "January",
                },
                {
                  case: {
                    $eq: [
                      { $month: { $toDate: "$contractDetails.car_out" } },
                      2,
                    ],
                  },
                  then: "February",
                },
                {
                  case: {
                    $eq: [
                      { $month: { $toDate: "$contractDetails.car_out" } },
                      3,
                    ],
                  },
                  then: "March",
                },
                {
                  case: {
                    $eq: [
                      { $month: { $toDate: "$contractDetails.car_out" } },
                      4,
                    ],
                  },
                  then: "April",
                },
                {
                  case: {
                    $eq: [
                      { $month: { $toDate: "$contractDetails.car_out" } },
                      5,
                    ],
                  },
                  then: "May",
                },
                {
                  case: {
                    $eq: [
                      { $month: { $toDate: "$contractDetails.car_out" } },
                      6,
                    ],
                  },
                  then: "June",
                },
                {
                  case: {
                    $eq: [
                      { $month: { $toDate: "$contractDetails.car_out" } },
                      7,
                    ],
                  },
                  then: "July",
                },
                {
                  case: {
                    $eq: [
                      { $month: { $toDate: "$contractDetails.car_out" } },
                      8,
                    ],
                  },
                  then: "August",
                },
                {
                  case: {
                    $eq: [
                      { $month: { $toDate: "$contractDetails.car_out" } },
                      9,
                    ],
                  },
                  then: "September",
                },
                {
                  case: {
                    $eq: [
                      { $month: { $toDate: "$contractDetails.car_out" } },
                      10,
                    ],
                  },
                  then: "October",
                },
                {
                  case: {
                    $eq: [
                      { $month: { $toDate: "$contractDetails.car_out" } },
                      11,
                    ],
                  },
                  then: "November",
                },
                {
                  case: {
                    $eq: [
                      { $month: { $toDate: "$contractDetails.car_out" } },
                      12,
                    ],
                  },
                  then: "December",
                },
              ],
              default: "Invalid Month",
            },
          },
          year: { $year: { $toDate: "$contractDetails.car_out" } },

          dayOfWeek: {
            $switch: {
              branches: [
                {
                  case: {
                    $eq: [
                      { $dayOfWeek: { $toDate: "$contractDetails.car_out" } },
                      1,
                    ],
                  },
                  then: "Sunday",
                },
                {
                  case: {
                    $eq: [
                      { $dayOfWeek: { $toDate: "$contractDetails.car_out" } },
                      2,
                    ],
                  },
                  then: "Monday",
                },
                {
                  case: {
                    $eq: [
                      { $dayOfWeek: { $toDate: "$contractDetails.car_out" } },
                      3,
                    ],
                  },
                  then: "Tuesday",
                },
                {
                  case: {
                    $eq: [
                      { $dayOfWeek: { $toDate: "$contractDetails.car_out" } },
                      4,
                    ],
                  },
                  then: "Wednesday",
                },
                {
                  case: {
                    $eq: [
                      { $dayOfWeek: { $toDate: "$contractDetails.car_out" } },
                      5,
                    ],
                  },
                  then: "Thursday",
                },
                {
                  case: {
                    $eq: [
                      { $dayOfWeek: { $toDate: "$contractDetails.car_out" } },
                      6,
                    ],
                  },
                  then: "Friday",
                },
                {
                  case: {
                    $eq: [
                      { $dayOfWeek: { $toDate: "$contractDetails.car_out" } },
                      7,
                    ],
                  },
                  then: "Saturday",
                },
              ],
              default: "Invalid Day",
            },
          },
        },
      },
      {
        $match: {
          carOutDate: {
            $gte: new Date(startDate),
            $lte: new Date(endDate),
          },
        },
      },
      {
        $group: {
          _id: {
            week: "$week",
            month: "$monthString",
            year: "$year",
            dayOfWeek: "$dayOfWeek",
          },
          totalContracts: { $sum: 1 },
          totalIncome: { $sum: "$incomeField" },
        },
      },
      {
        $project: {
          _id: 0,
          week: "$_id.week",
          month: "$_id.month",
          year: "$_id.year",
          dayOfWeek: "$_id.dayOfWeek",
          totalIncome: 1,
          totalContracts: 1,
        },
      },
    ];

    "Initial Pipeline:", aggregationPipeline;

    const reports = await Report.aggregate(aggregationPipeline);

    "Reports:", reports;

    return reports;
  } catch (err) {
    console.error(err);
    return [];
  }
}

// async function getWeeklyReports(startDate, endDate) {

//   try {
//     const aggregationPipeline = [
//       {
//         $lookup: {
//           from: "contracts",
//           localField: "contract",
//           foreignField: "_id",
//           as: "contractDetails",
//         },
//       },
//       {
//         $unwind: "$contractDetails",
//       },
//       {
//         $lookup: {
//           from: 'cars',
//           localField: 'contractDetails.car',
//           foreignField: '_id',
//           as: 'joinedCar'
//         },
//       },
//       {
//         $addFields: {
//           formattedStartDate: {
//             $dateToString: { format: "%Y-%m-%d", date: "$startDate" }
//           },
//           formattedEndDate: {
//             $dateToString: { format: "%Y-%m-%d", date: "$endDate" }
//           }
//         }
//       },
//       {
//         $addFields: {
//           incomeField: {
//             $subtract: [
//               "$contractDetails.sum",
//               { $multiply: ["$contractDetails.sum", "$contractDetails.discount"] }
//             ]
//           },
//           carOutDate: { $dateFromString: { dateString: "$contractDetails.car_out", format: "%Y-%m-%d" } }
//         }
//       },
//       {
//         $match: {
//           carOutDate: { $gte: startDate, $lte: endDate }
//         }
//       },
//       {
//         $group: {
//           _id: { week: { $week: '$carOutDate' } },
//           totalIncome: { $sum: '$incomeField' },
//           totalContracts: { $sum: 1 },
//           cars: { $push: '$joinedCar' },
//         },
//       },
//       {
//         $project: {
//           _id: 0,
//           week: '$_id.week',
//           totalIncome: 1,
//           totalContracts: 1,
//           cars: 1,
//           contractNumber: "$contractDetails.serial",
//           carModel: "$joinedCar.car",
//         },
//       },
//     ];

//     const reports = await Report.aggregate(aggregationPipeline);

//     return reports;
//   } catch (err) {
//     console.error(err);
//     return []; // Return empty array on error
//   }
// }

// async function getCarsRentedInNextDays(days) {
//   const today = new Date();
//   const nextWeek = new Date(today.setDate(today.getDate() + days));

//   const pipeline = [
//     {
//       $match: {
//         car_out: { $gte: today }, // Filter by car_out date (rental start) from today
//         car_back: { $lte: nextWeek }, // Filter by car_back date (rental end) within next 'days'
//       },
//     },
//     {
//       $count: 'totalRented', // Count the number of documents matching the filter
//     },
//   ];

//   const rentalCount = await Contract.aggregate(pipeline);
//   return rentalCount.length > 0 ? rentalCount[0].totalRented : 0;
// }

// Example usage (replace with desired number of days)
const days = 7;

// getCarsRentedInNextDays(days)
//   .then(count => {
//     (`Number of cars rented in the next ${days} days: ${count}`);
//   })
//   .catch(error => {
//     console.error(error);
//   });
