const Customer = require('../models/customer.model');
const { autoIncrementCodeCustomer } = require('../utils/auto-increment');

// Create a new customer
exports.createCustomer = async (req, res) => {
  try {

    const autoInc = await autoIncrementCodeCustomer(Customer, "code");

    let nameArray = [];

   
    for(i = 0 ; i<req.files.length;i++) {
      nameArray.push(req.files[i].filename);
    }
    
    const newCustomer = new Customer({...req.body,code:autoInc,files:nameArray,branch_id:req.user.branch_id});

    

    const savedCustomer = await newCustomer.save();

    return res.status(201).json(savedCustomer);
  } catch (error) {
  }
};

exports.getAllCustomers = async (req, res) => {
  try {
    const customers = await Customer.find({});
    res.status(200).json(customers);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};





exports.getCustomerById = async (req, res) => {
  try {
    const customer = await Customer.findById(req.params.id);
    if (!customer) {
      return res.status(404).json({ message: 'Customer not found' });
    }
    res.status(200).json(customer);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateCustomer = async (req, res) => {
  try {
    const updatedCustomer = await Customer.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedCustomer) {
      return res.status(404).json({ message: 'Customer not found' });
    }
    res.status(200).json(updatedCustomer);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a customer by ID
exports.deleteCustomer = async (req, res) => {
  try {
    const deletedCustomer = await Customer.findByIdAndDelete(req.params.id);
    if (!deletedCustomer) {
      return res.status(404).json({ message: 'Customer not found' });
    }
    res.status(200).json({ message: 'Customer deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};




exports.getAllCustomersByBranch = async (req, res) => {
  try {

      const cars= await Customer.find({branch_id: req.user.branch_id});
      console.log(cars)
    
    
    return res.status(200).json(cars);
  } catch (error) {
    return res.status(400).json({ status: 400, message: error.message });
  }
}
