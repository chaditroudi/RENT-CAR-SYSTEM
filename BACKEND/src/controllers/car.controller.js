const { default: mongoose } = require("mongoose");
const Car = require("../models/car.model");
const { autoIncrement } = require("../utils/auto-increment");

exports.createCar = async (req, res) => {
  try {


    const{car,code,plate} = req.body

    const isCarExist = await Car.findOne({car,code,plate});

    if (isCarExist) {
      return res.status(200).send({
        success: false,
        msg: "Car already exists!",
      });
    }

    // autoinc
    const autoInc= await autoIncrement(Car);


    const newcar = new Car({
      ...req.body,serial:autoInc
    });

    console.log("auto inc", autoInc);
    const result = await newcar.save();

    return res.status(201).json(result);
  } catch (err) {
    return res.status(400).json({ status: 400, message: err.message });
  }
};

exports.deleteCar = async (req, res) => {
  
    const { id } = req.params;

    Car.findByIdAndDelete({ _id: id }).then((car) => {
      if(car) {
        return res.status(205).json({
          status: 400,
          message: "successfully deleted",
        });
      }
      return res.status(404).json({ status: 404, message: 'Car not found' });



    }).catch((err) => {
      return res.status(500).json({ status: 500, message: err.message });
    });
};

exports.getCarById = async (req, res) => {
    try {
      const { id } = req.params;
      const car = await Car.findById(id);
  
      if (!car) {
        return res.status(404).json({ status: 404, message: 'Car not found' });
      }
  
      return res.status(200).json(car);
    } catch (error) {
      return res.status(400).json({ status: 400, message: error.message });
    }
  };

exports.updateCar = async (req, res) => {
  await Car.findByIdAndUpdate(req.params.id, {$set: req.body})
  .then((car) => {
    if(car) {
      return res.status(200).json({
        status: 200,
        data: car,
        message: "Successfully updated car",
      })
    } 
    return res.status(404).json({ status: 404, message: 'Car not found' });


  }).catch((error) => {
    return res.status(400).json({
      status: 400,
      message: error.message
    });
  });
};

exports.getAllCars = async (req, res) => {
  try {
    const cars= await Car.find({});
    return res.status(200).json(cars);
  } catch (error) {
    return res.status(400).json({ status: 400, message: error.message });
  }
}