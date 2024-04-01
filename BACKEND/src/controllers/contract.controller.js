const { default: mongoose } = require("mongoose");
const Contract = require("../models/contract.model");

exports.createcontract = async (req, res) => {
  try {

    const autoInc= await autoIncrement(Contract);

    const contract = new Contract({...req.body,serial:autoInc});
    const result = await contract.save();


    return res.status(201).json(result);
  } catch (err) {
    return res.status(400).json({ status: 400, message: err.message });
  }
};

exports.deleteContract = async (req, res) => {
  try {
    const { id } = req.params;

    Contract.findByIdAndDelete({ _id: id }, function (err) {
      if (err) console.log(err);

      return res
        .status(205)
        .json({ status: 400, message: "successfully deleted" });
    });
  } catch (err) {
    return res.status(400).json({ status: 400, message: err.message });
  }
};

exports.updateContract = async (req, res) => {
  const ContractUpdated = req.body;

  try {
    const { id } = req.params;

    Contract.updateOne(
      { _id: mongoose.Types.ObjectId(id) },
      { Body: ContractUpdated.Body },
      function (err, result) {
        if (err) res.send(err);
        else return res.status(201).json(result);
      }
    );
  } catch (err) {
    return res.status(400).json({ status: 400, message: err.message });
  }
};

exports.getAllContracts = async (req, res) => {
  try {
    const contracts= await Contract.find({});
    return res.status(200).json({
      status: 200,
      data: questions,
      message: "Succesfully Contracts Retrieved",
    });
  } catch (error) {
    return res.status(400).json({ status: 400, message: error.message });
  }
};
