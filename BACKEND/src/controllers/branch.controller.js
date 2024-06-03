const Branch = require("../models/branch.model");

const { validationResult } = require("express-validator");

// Add New Permissions API Method

const addBranch = async (req, res) => {
  try {
    // const errors = validationResult(req);

    // if (!errors.isEmpty()) {
    //   return res.status(400).json({
    //     success: false,
    //     msg: "Errors",
    //     errors: errors.array(),
    //   });
    // }

    const { branch_name,administrations } = req.body;

    const isExists = await Branch.findOne({
      branch_name
    });

    if (isExists) {
      return res.status(400).json({
        success: false,
        msg: "This Branch is Already Exist!",
      });
    }

    const obj = {
        branch_name,
        administrations
    };

 
    const permission = new Branch(obj);
    const newPermission = await permission.save();
    
    return res.status(200).json(newPermission);
  } catch (error) {
    return res.status(400).json({
      success: false,
      msg: error.message,
    });
  }
};



// Get Permissions API Method

const getBranch = async (req, res) => {
  try {
    // For Fetching all the permissions from the database

    const permissions = await Branch.find({}).populate('users').exec();
  
    console.log(permissions)

    return res.status(200).json(permissions );
  } catch (error) {
    return res.status(400).json({
      success: false,
      msg: error.message,
    });
  }
};


const getBranchById = async (req, res) => {
  try {
    // For Fetching all the permissions from the database

    const {id} = req.params;
    const permissions = await Branch.findOne({_id:id});

    return res.status(200).json(permissions );
  } catch (error) {
    return res.status(400).json({
      success: false,
      msg: error.message,
    });
  }
};
// Delete Permissions API Method

const deleteBranch = async (req, res) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        msg: "Errors",
        errors: errors.array(),
      });
    }

    // Get ID from the Request

    const { id } = req.params;

    await Branch.findByIdAndDelete({ _id: id });

    return res.status(200).json({
      success: true,
      msg: "Branch Deleted successfully!",
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      msg: error.message,
    });
  }
};

// Update Permissions API Method

const updateBranch = async (req, res) => {
  try {
    // const errors = validationResult(req);

    // if (!errors.isEmpty()) {
    //   return res.status(400).json({
    //     success: false,
    //     msg: "Errors",
    //     errors: errors.array()
    //   });
    // }

    const {  branch_name } = req.body;

    const {id} = req.params

    const isExists = await Branch.findOne({ _id: id });


    if (!isExists) {
      return res.status(400).json({
        success: false,
        msg: "The Branch ID you have entered does not exist in the system. Please verify the ID and try again.",
      });
    }


    var updateBranchData = {
      branch_name,
    };

    

    const updateBranch = await Branch.findByIdAndUpdate(
      { _id: id },
      {
        $set: updateBranchData,
      },
      { new: true }
    );

    return res.status(200).json(updateBranch);
  } catch (error) {
    return res.status(400).json({
      success: false,
      msg: "Oops! Something went wrong. Please check the provided data and try again.",
    });
  }
};

module.exports = {
  addBranch,
  getBranch,
  deleteBranch,
  updateBranch,
  getBranchById
  
};
