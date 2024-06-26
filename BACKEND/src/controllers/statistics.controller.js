const { default: mongoose } = require("mongoose");
const Car = require("../models/car.model");
const Contract = require("../models/contract.model");

exports.countContractOpen = async (req, res) => {
  if (req.user.role === 2) {
    console.log("branch branch", req.user.role);

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
    console.log("branch branch", req.body.role);
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
      rented: true,
    }).then((count) => {
      return res.status(200).json(count);
    });
  } else {
    Car.countDocuments({
      rented: true,
    }).then((count) => {
      return res.status(200).json(count);
    });
  }
};

exports.countCarAvailable = async (req, res) => {
  if (req.user.role === 2) {
    Car.countDocuments({
      branch_id: req.user.branch_id,
      rented: false || null,
    }).then((count) => {
      console.log("count", count);
      return res.status(200).json(count);
    });
  } else {
    Car.countDocuments({
      rented: false || null,
    }).then((count) => {
      return res.status(200).json(count);
    });
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
