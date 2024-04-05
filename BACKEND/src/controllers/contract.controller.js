const { default: mongoose } = require("mongoose");
const Contract = require("../models/contract.model");
const { autoIncrement } = require("../utils/auto-increment");

const Backup = mongoose.model('backup_contract', new mongoose.Schema({}, { strict: false }));

exports.createContract = async (req, res) => {
  try {


      // autoinc
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

      // create Backup :
  const contractBackup = {...contract.toObject()}


  console.log("contract backup",contractBackup);



  await storeBackup(contractBackup);
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




// backupd edit contract :
async function storeBackup(backupContract) {
  try {
    // Create a new backup document
      const backup = new Backup({
      data: backupContract,
      timestamp: new Date()
    });

    // Save the backup document
    await backup.save();

    console.log('contractBackup stored successfully');
  } catch (error) {
    console.error('Error contractBackup backup:', error);
  }
}
exports.updateContract = async (req, res) => {

  const contract =await Contract.findById(req.params.id);


  // create Backup :
  const contractBackup = {...contract.toObject()}


  console.log("contract backup",contractBackup);



  await storeBackup(contractBackup);

   Contract.findByIdAndUpdate(req.params.id, {$set: req.body})
  .then((contract) => {
    if(contract) {
      return res.status(200).json({
        status: 200,
        data: contract,
        message: "Successfully updated Contract",
      })
    } 
    return res.status(404).json({ status: 404, message: 'Contract not found' });


  }).catch((error) => {
    return res.status(400).json({
      status: 400,
      message: error.message
    });
  });
};


exports.getContractById = async (req, res) => {
  try {
    const { id } = req.params;
    const car = await Contract.findById(id);

    if (!car) {
      return res.status(404).json({ status: 404, message: 'Contract not found' });
    }

    return res.status(200).json(car);
  } catch (error) {
    return res.status(400).json({ status: 400, message: error.message });
  }
};
exports.getAllContracts = async (req, res) => {
  try {
    const contracts= await Contract.find({});
    return res.status(200).json(contracts);
  } catch (error) {
    return res.status(400).json({ status: 400, message: error.message });
  }
};
