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
  





exports.getRentalHistory = async (req, res) => {
    try {
  
      const rentals = await Contract.aggregate([
        
        {
          $lookup: {
            from: 'customers', // Replace 'cars' with your car model name (if different)
            localField: 'owner', // Field in Rental model referencing the car
            foreignField: '_id', // Field in Car model that holds the car ID
            as: 'customerDetails' // Name for the lookup results in the aggregation output
          }
        },
        
        {

          $lookup: {
            from: 'cars', // Replace 'cars' with your car model name (if different)
            localField: 'car', // Field in Rental model referencing the car
            foreignField: '_id', // Field in Car model that holds the car ID
            as: 'carDetails' // Name for the lookup results in the aggregation output
          }
        },
        { $unwind: '$carDetails', },
        {$unwind: '$customerDetails', },
        
        {
          $match:{
            'carDetails.rented':true
          }
        },
        {
          $project: {
            _id: 1, 


              car_out:1,
              car_back:1,
              daily_val1:1,
              daily_val2:1,
              daily_result:1,
              status_contract:1,
              sum:1,
              payable:1,

           

            car: {
              _id: 1,
              
              model: '$carDetails.car', 
              insurance: '$carDetails.insurance', 
              plate: '$carDetails.plate',
              color: '$carDetails.color', 
              category: '$carDetails.category', 
              rented: '$carDetails.rented', 
              daily: '$carDetails.daily',
              monthly:'$carDetails.monthly',
              car_out:'$carDetails.car_out',
              car_back:'$carDetails.car_back',
              weekly:'$carDetails.weekly',
              annual:'$carDetails.annual',
              year:'$carDetails.year',  
              registration: '$carDetails.registration', 
              fullName:'$customerDetails.fullName'
            }
          }
        }
      ]);
  
      console.log(rentals);
      res.json(rentals);
    } catch (error) {
      console.error('Error getting rental history:', error);
      res.status(500).json({ message: 'Error fetching rental history' });
    }
  };

  exports.getOpenContracts = async (req, res) => {
    try {
      const today = new Date();
      const openContracts = await contractModel.find({
        endDate: { $gt: today },
        returned: false
      });
      res.json(openContracts);
    } catch (error) {
      console.error('Error getting open contracts:', error);
      res.status(500).json({ message: 'Error fetching open contracts' });
    }
  };