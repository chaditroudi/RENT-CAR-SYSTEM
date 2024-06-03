const { default: mongoose } = require("mongoose");
const Car = require("../models/car.model");
const Contract = require("../models/contract.model");

exports.countContractOpen = async (req, res) => {
  Contract.countDocuments({ status: "Contract is Open" }).then((count) => {
    (count);

    return res.status(200).json(count);
  });
};

exports.countContractClosed = async (req, res) => {
  Contract.countDocuments({ status: "Contract is Closed" }).then((count) => {

    return res.status(200).json(count);
  });
};

exports.countCarRented = async (req, res) => {
    Car.countDocuments({ rented:true }).then((count) => {
  
      return res.status(200).json(count);
    });
  };
  
  exports.countCarAvailable = async (req, res) => {
    Car.countDocuments({ rented:false }).then((count) => {
  
      return res.status(200).json(count);
    });
  };
  