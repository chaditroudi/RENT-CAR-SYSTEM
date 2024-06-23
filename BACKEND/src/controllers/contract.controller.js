const { default: mongoose } = require("mongoose");
const Car = require("../models/car.model");
const Contract = require("../models/contract.model");
const User = require("../models/user.model");
const { autoIncrement } = require("../utils/auto-increment");
const { formatDateTime } = require("../utils/date-format");
const socket = require("../utils/socket");
const Notification = require("../models/notification.model");
const { ObjectId } = require("mongodb");

var check_oil = false;

const Backup = mongoose.model(
  "backup_contract",
  new mongoose.Schema({}, { strict: false })
);

const accountSid = process.env.TWILIO_ACCOUNT;
const authToken = process.env.TWILIO_AUTH;

// Function to send WhatsApp message

exports.createContract = async (req, res) => {
  try {
    // autoinc
    const autoInc = await autoIncrement(Contract, "serial");
    const car_out = formatDateTime(req.body.car_out);
    const car_back = formatDateTime(req.body.car_back);

    // Car.findByIdAndUpdate(req.body.car, { $set: { rented: true } }).then(
    //   (car) => {
    //     "current car to update", car;
    //   }
    // );

    Car.findById(req.body.car).then(async (car) => {
      if (!car) {
        return;
      }
      const rentedStatus = car.rented;

      if (rentedStatus) {
        return res.status(200).json({
          message: "Car already rented ",
          rented: true,
        });
      }

      car.rented = true;

      await car.save();
    });


      const contract = new Contract({
        ...req.body,
        serial: autoInc,
        car_out: car_out,
        car_back: car_back,
        status: "Contract is Open",
        branch_id: !req.user.branch_id ? null : req.user.branch_id,
      });


      
      
      const result = await contract.save();

      if (result) {
        // sendWhatsAppMessage("+21690130686", " Hello from Doha Vision Rent Car, We are happy to inform that our Contract has added sucessfully.");

        return res.status(200).json({
          status: 200,
          data: contract,
          message: "Successfully updated Contract",
        });
      } else {
        return res.status(400).json({
          status: 400,
          message: "Failed to update Contract",
        });
      }
  } catch (err) {
    return res.status(400).json({ status: 400, message: err.message });
  }
};

exports.deleteContract = async (req, res) => {
  const { id } = req.params;

  Contract.findByIdAndDelete({ _id: id })
    .then((car) => {
      if (car) {
        return res.status(205).json({
          status: 400,
          message: "successfully deleted",
        });
      }
      return res
        .status(404)
        .json({ status: 404, message: "Contract not found" });
    })
    .catch((err) => {
      return res.status(500).json({ status: 500, message: err.message });
    });
};

async function storeBackup(backupContract) {
  try {
    // Create a new backup document
    const backup = new Backup({
      _id: new mongoose.Types.ObjectId(),
      data: backupContract,
      timestamp: new Date(),
    });

    // Save the backup document
    await backup.save();

    console.log("contract backup stored successfully");
  } catch (error) {
    console.error("Error contractBackup backup:", error);
  }
}

async function getAdmin() {
  return await User.findOne({ role: 1 });
}

exports.getAllContractsByBranch = async (req, res) => {
  try {
    const cars = await Contract.find({ branch_id: req.user.branch_id })
      .populate("car")
      .populate("owner");
    console.log(cars);
      return res.status(200).json(cars);
  } catch (error) {
    return res.status(400).json({ status: 400, message: error.message });
  }
};

exports.updateDamageCar = async (req, res) => {
  const id = req.params.id;

  try {
    let nameArray = [];

    for (i = 0; i < req.files.length; i++) {
      nameArray.push(req.files[i].filename);
    }
    console.log(nameArray);

    const updatedContract = await Contract.findByIdAndUpdate(
      id,
      { files: nameArray },
      { new: true }
    );

    if (!updatedContract) {
      return res.status(404).send("Contract not found");
    }

    return     res.status(200).json({ message: "File uploaded successfully", files: nameArray });

  } catch (error) {
    console.error("Error updating image:", error);
    res.status(500).send("Internal server error");
  }
};

exports.updateContract = async (req, res) => {
  const contract = await Contract.findById(req.params.id).populate("car").populate("owner");

  // create Backup :
  const contractBackup = { ...contract.toObject() };


  await storeBackup(contractBackup);

  count = 0;

     Backup.find({})
      .sort({ timestamp: -1 })
      .then(async(result) => {
        ("result", result);

  result.map((item) => {
    if ((item.data.serial === contract.serial) && count >2) {
      return res.status(200).json({
        status: 200,
        message: "you can't update this contract",
        attempts: true,
      });
    }

  
});
if(contract.version >4) {
  return res.status(200).json({
 status: 200,
 message: "you can't update this contract",
 attempts: true,
});
}

  const updatedBody = {
    ...req.body,

    no_km_back: req.body.no_km_back,
    no_km_out: req.body.no_km_out,
    version: contract.version + 1,
    createdBy: req.user.email,
  };


  const car = await Car.findById(contract.car);
  if (!car) {
    return res.status(404).json({ status: 404, message: "Car not found" });
  }


  if (req.body.status === "Contract is Closed") {
    car.rented = false;
  } else {
    car.rented = true;
  }
  await car.save();

  Object.assign(contract, updatedBody);
  const updatedContract = await contract.save();
          // if (car.rented == true) {
          //   console.log("hello")
          //   return res.status(200).json({

          //     message: "Car already rented ",
          //     rented: true,
          //   });
          // }

          //     car.rented = true;

          //       await car.save();

          // get Receiver :     const admin = await collection.findOne({ username: username, isAdmin: true });

          admin = await getAdmin();

          if (!admin) {
            return res.status(404).json({
              status: 404,
              message: "Admin not found",
            });
          }

          const km_back_val =
            req.body.no_km_back !== null
              ? req.body.no_km_back
              : contract.km_back;

          const current = car.current !== null ? car.current : 0;

          const checkVidangeFunc = checkKM(current, km_back_val);

          console.log("km_back", km_back_val);
          console.log("valeur current avant comparaison", current);
          if (current > 0) {
            console.log("valeur  current apres comparaison:", current);
            console.log("valeur  checkKM funct:", checkVidangeFunc);

            if (checkVidangeFunc) {
              const notification = new Notification({
                title: "change oil for car :" + car.car,
                message: "Oil Changed  is Created Successfully",
                sender: req.user._id,
                contract: contract,
                reciever: admin._id,
                km_out: updatedBody.no_km_out,
                km_back: updatedBody.no_km_back,
                car: req.body.car,
              });
              socket.getIo().emit("send-notification", notification);

              await notification.save();
            }
          }

          return res.status(200).json({
            status: 200,
            data: contract,
            message: "Successfully updated Contract",
          });
        });
      
    } 

      exports.getImages = async (req, res, next) =>{
      const id = req.params.contractId;
      try {
        const contract = await Contract.findById(id);
    
        if (!contract) {
          return res.status(404).send("Contract not found");
        }
    
        res.status(200).json({ files: contract.files });
      } catch (error) {
        console.error("Error fetching images:", error);
        res.status(500).send("Internal server error");
      }
    }

exports.getContractById = async (req, res) => {
  try {
    const { id } = req.params;
    const car = await Contract.findById(id).populate("owner").populate("car");

    if (!car) {
      return res
        .status(404)
        .json({ status: 404, message: "Contract not found" });
    }

    return res.status(200).json(car);
  } catch (error) {
    return res.status(400).json({ status: 400, message: error.message });
  }
};

exports.getFeaturesByContract = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await Contract.findById(id);

    if (!data) {
      return res
        .status(404)
        .json({ status: 404, message: "Contract not found" });
    }

    return res.status(200).json(data.features);
  } catch (error) {
    return res.status(400).json({ status: 400, message: error.message });
  }
};

exports.getAllContracts = async (req, res) => {
  try {
    const contracts = await Contract.find({}).populate("car").populate("owner");
    return res.status(200).json(contracts);
  } catch (error) {
    return res.status(400).json({ status: 400, message: error.message });
  }
};

exports.getAllContractsBackups = async (req, res) => {
  try {

    console.log("hii",req.params.id)
    const contracts = await Backup.aggregate([
      {
        $match: {
          "data._id":new ObjectId(req.params.id)
        },
      },
  
      
    
      {
          $lookup: {
          from: "Car",
          localField: "data.car",
          foreignField: "_id",
          as: "car",
        },
      },
    ]);

    console.log("XXXXXXXXXXXXXxxxx", contracts);
    return res.status(200).json(contracts);
  } catch (error) {
    return res.status(400).json({ status: 400, message: error.message });
  }
};

exports.getAutoInc = async (req, res) => {
  try {

    if(req.user.role === "admin"){
      const autoInc = await autoIncrement(Contract, "serial","admin",null);

      return res.status(200).json(autoInc);
    }else  {
      const autoInc = await autoIncrement(Contract, "serial","editor",req.user.branch_id);
      return res.status(200).json(autoInc);
    }  

  } catch (error) {
    return res.status(400).json({ status: 400, message: error.message });
  }
};

async function checkKM(current, km_back) {
  const oilChangeInterval = 5000;

  const currentKM = parseInt(current, 10);
  const km_back_val = parseInt(km_back, 10);

  var distance = currentKM - km_back_val;

  console.log("Current KM:", currentKM);
  console.log("Distance Since Last Service:", distance);

  if (distance % oilChangeInterval === 0) {
    check_oil = true;
  } else check_oil = false;


  console.log("Check Vidange:", check_oil);


  return check_oil


}




