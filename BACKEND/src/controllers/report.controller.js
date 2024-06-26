const { default: mongoose } = require("mongoose");
const Report = require("../models/report.model");
const Contract = require("../models/contract.model");
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

async function getYearlyReports(startDate, endDate) {
  try {
    const reports = await Contract.aggregate([
      {
        $addFields: {
          carOutDate: {
            $toDate: "$car_out"
          }
        }
      },
      {
        $match: {
          carOutDate: {
            $gte: new Date(startDate),
            $lte: new Date(endDate)
          }
        }
      },
      {
        $group: {
          _id: { $dateToString: { format: "%Y", date: "$carOutDate" } }, // Group by year
          totalIncome: { $sum: "$payable" }
        }
      },
      {
        $project: {
          _id: 0,
          year: { $toInt: "$_id" }, // Convert _id to integer (year)
          totalIncome: 1
        }
      },
      {
        $sort: { year: 1 } // Sort by year
      }
    ]);

    console.log("Yearly Reports:", reports);

    return reports;
  } catch (err) {
    console.error(err);
    return []; // Return empty array on error
  }
}

async function getMonthlyReports(startDate, endDate) {
  try {
    const reports = await Contract.aggregate([
      {
        $addFields: {
          carOutDate: {
            $toDate: "$car_out"
          }
        }
      },
      {
        $match: {
          carOutDate: {
            $gte: new Date(startDate),
            $lte: new Date(endDate)
          }
        }
      },
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m", date: "$carOutDate" } }, // Group by month
          totalIncome: { $sum: "$payable" }
        }
      },
      {
        $project: {
          _id: 0,
          month: "$_id",
          totalIncome: 1
        }
      },
      {
        $sort: { month: 1 } // Sort by month
      }
    ]);

    console.log("Monthly Reports:", reports);

    return reports;
  } catch (err) {
    console.error(err);
    return []; // Return empty array on error
  }
}


async function getWeeklyReports(startDate, endDate) {
  try {
    const reports = await Contract.aggregate([
      {
        $addFields: {
          carOutDate: {
            $toDate: "$car_out"
          }
        }
      },
      {
        $match: {
          carOutDate: {
            $gte: new Date(startDate),
            $lte: new Date(endDate)
          }
        }
      },
      {
        $group: {
          _id: { $dayOfWeek: "$carOutDate" }, // Group by day of the week (1-7)
          totalIncome: { $sum: "$payable" }
        }
      },
      {
        $addFields: {
          dayOfWeek: {
            $switch: {
              branches: [
                { case: { $eq: ["$_id", 1] }, then: "Sunday" },
                { case: { $eq: ["$_id", 2] }, then: "Monday" },
                { case: { $eq: ["$_id", 3] }, then: "Tuesday" },
                { case: { $eq: ["$_id", 4] }, then: "Wednesday" },
                { case: { $eq: ["$_id", 5] }, then: "Thursday" },
                { case: { $eq: ["$_id", 6] }, then: "Friday" },
                { case: { $eq: ["$_id", 7] }, then: "Saturday" }
              ],
              default: "Unknown"
            }
          }
        }
      },
      {
        $project: {
          _id: 0,
          dayOfWeek: 1,
          totalIncome: 1
        }
      },
      {
        $sort: { dayOfWeek: 1 } // Sort by day of the week
      }
    ]);

    console.log("RENTALs", reports);

    return reports;
  } catch (err) {
    console.error(err);
    return []; // Return empty array on error
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
