const { default: mongoose } = require("mongoose");
const Car = require("../models/car.model");
const Contract = require("../models/contract.model");

exports.countContractOpen = async (req, res) => {

  if (req.user.role === 2) {

    console.log("branch branch",req.user.role)

    Contract.countDocuments({
      branch_id: req.user.branch_id,
      status: "Contract is Open",
    }).then((count) => {
      return res.status(200).json(count);
    });
  } else {
    Contract.countDocuments({
      status: "Contract is Open",
    }).then((count) => {
      return res.status(200).json(count);
    });
  }
};

exports.countContractClosed = async (req, res) => {
  if (req.user.role === 2) {
    console.log("branch branch",req.body.role)
    Contract.countDocuments({
      branch_id: req.user.branch_id,
      status: "Contract is Closed",
    }).then((count) => {
      return res.status(200).json(count);
    });
  } else {
    Contract.countDocuments({
      status: "Contract is Closed",
    }).then((count) => {
      return res.status(200).json(count);
    });
  }
};

exports.countCarRented = async (req, res) => {
  if (req.user.role === 2) {
    Car.countDocuments({
      branch_id: req.user.branch_id,
      rented:true
    }).then((count) => {
      return res.status(200).json(count);
    });
  } else {
    Car.countDocuments({
      rented:true
    }).then((count) => {
      return res.status(200).json(count);
    });
  }
};

exports.countCarAvailable = async (req, res) => {
  if (req.user.role === 2) {
    Car.countDocuments({
      branch_id: req.user.branch_id,
      rented:false || null

    }).then((count) => {
      console.log("count",count)
      return res.status(200).json(count);
    });
  } else {
    Car.countDocuments({
      rented:false || null
    }).then((count) => {
      return res.status(200).json(count);
    });
  }
};

exports.getRentalHistory = async (req, res) => {
  var branchObjectId = new mongoose.Types.ObjectId(req.user.branch_id);

  try {
    const rentals = await Contract.aggregate([
      {
        $lookup: {
          from: "customers",
          localField: "owner",
          foreignField: "_id",
          as: "customerDetails",
        },
      },
      {
        $lookup: {
          from: "cars",
          localField: "car",
          foreignField: "_id",
          as: "carDetails",
        },
      },
      { $unwind: "$carDetails" },
      { $unwind: "$customerDetails" },
      {
        $match: {
          "carDetails.rented": true,
          "carDetails.branch_id": branchObjectId,
          branch_id: branchObjectId,
        },
      },
      {
        $group: {
          _id: "$carDetails.car",
          count: { $sum: 1 },
          carDetails: { $first: "$carDetails" },
          customerDetails: { $first: "$customerDetails" },
          daily: { $first: "$daily" },
          car_out: { $first: "$car_out" },
          car_back: { $first: "$car_back" },
          daily_val1: { $first: "$daily_val1" },
          daily_val2: { $first: "$daily_val2" },
          daily_result: { $first: "$daily_result" },
          status_contract: { $first: "$status_contract" },
          sum: { $first: "$sum" },
          payable: { $first: "$payable" },
        },
      },
      {
        $project: {
          _id: 1,
          count: 1,
          car_out: 1,
          car_back: 1,
          daily_val1: 1,
          daily_val2: 1,
          daily_result: 1,
          status_contract: 1,
          sum: 1,
          payable: 1,

          customer: {
            _id: 1,
            fullName: "$customerDetails.fullName",
          },
          car: {
            _id: 1,
            model: "$_id",
            insurance: "$carDetails.insurance",
            plate: "$carDetails.plate",
            color: "$carDetails.color",
            category: "$carDetails.category",
            rented: "$carDetails.rented",
            branch_id: "$carDetails.branch_id",

            year: "$carDetails.year",
            registration: "$carDetails.registration",
          },
        },
      },
    ]);

    res.json(rentals);
  } catch (error) {
    console.error("Error getting rental history:", error);
    res.status(500).json({ message: "Error fetching rental history" });
  }
};

exports.getOpenContracts = async (req, res) => {
  try {
    const today = new Date();
    const openContracts = await contractModel.find({
      endDate: { $gt: today },
      returned: false,
    });
    res.json(openContracts);
  } catch (error) {
    console.error("Error getting open contracts:", error);
    res.status(500).json({ message: "Error fetching open contracts" });
  }
};
