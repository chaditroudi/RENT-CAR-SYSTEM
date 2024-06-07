const { default: mongoose } = require("mongoose");
const Car = require("../models/car.model");
const { autoIncrement } = require("../utils/auto-increment");

exports.createCar = async (req, res) => {
  try {

    const autoInc = await autoIncrement(Car,'code');


    const{car,code,plate} = req.body

    // const isCarExist = await Car.findOne({car,code,plate});

    // if (isCarExist) {
    //   return res.status(200).send({
    //     success: false,
    //     msg: "Car already exists!",
    //   });
    // }


    
    const newcar = new Car({
      ...req.body,code:autoInc,createdBy:req.user.email,branch_id:req.user.branch_id
    });
    


    const result = await newcar.save();

    return res.status(201).json(result);
  } catch (err) {

    console.log(err.errorResponse.code)

    if (err.errorResponse.code === 11000) {
      return  res.status(400).send({ message: 'plate  or code or model car already exists.' });
 
     }

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

  
  
  const updateCar = {...req.body,updatedBy:req.user.email,branch_id:req.user.branch_id}
  await Car.findByIdAndUpdate(req.params.id, {$set: updateCar})
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


    if (error.code === 11000) {
     return  res.status(400).send({ message: 'plate  or code or model car already exists.' });

    }

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


exports.getAllCarsByBranch = async (req, res) => {
  try {
    console.log(req.user.branch_id);
    const cars= await Car.find({branch_id: req.user.branch_id});
    return res.status(200).json(cars);
  } catch (error) {
    return res.status(400).json({ status: 400, message: error.message });
  }
}


exports.totalCar = async (req, res) => {
  try {
    const cars= await Car.coun;
    return res.status(200).json(cars);
  } catch (error) {
    return res.status(400).json({ status: 400, message: error.message });
  }
}

exports.fetchValidInssu =  async(req, res) =>{ 
  try {
    const cars = await fetchCarsWithValidInsurance(req.user.branch_id);
    console.log(cars);

    res.json(cars);
} catch (err) {
    res.status(500).json({ message: err.message });
}
}
exports.fetchCarsWithValidRegist =  async(req, res) => { 
  try {
    const cars = await fetchCarsWithValidRegistration(req.user.branch_id);
    res.json(cars);
} catch (err) {
    res.status(500).json({ message: err.message });
}
}


async function fetchCarsWithValidRegistration(branch_id) {
  const today = new Date();
  try {



    if(branch_id) {
      const cars = await Car.find({ 
        branch_id:branch_id, 
        registration: { 
            $gte: today,
   
        } 
    });      console.log(cars)
        return cars;
    }else {
      const cars = await Car.find({ 
        registration: { 
            $gte: today,
   
        } 
    });      console.log(cars)
        return cars;
    }
    
  } catch (err) {
      throw new Error(`Error fetching cars with valid registration: ${err.message}`);
  }
}

async function fetchCarsWithValidInsurance(branch_id) {
  const today = new Date();
  const nextMonth = new Date(today);
  nextMonth.setMonth(nextMonth.getMonth() + 1);

  const nextWeek = new Date(today);
  nextWeek.setDate(today.getDate() + 7);

  try {
    if(branch_id) {

      const cars = await Car.find({ 
        branch_id:branch_id, 
  
          insurance: { 
              $gte: today,
     
          } 
      });
      console.log("Found cars with valid insurance:", cars);
      return cars;
    }else {
      const cars = await Car.find({ 
  
          insurance: { 
              $gte: today,
     
          } 
      });
      console.log("Found cars with valid insurance:", cars);
      return cars;
    }
  } catch (err) {
      console.error(`Error fetching cars with valid insurance: ${err.message}`);
      throw err;
  }
}
