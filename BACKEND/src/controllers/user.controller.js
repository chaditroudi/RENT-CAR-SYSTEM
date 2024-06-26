const User = require("../models/user.model");
const Permission = require("../models/permission.model");
const UserPermission = require("../models/user.permission");

const { validationResult } = require("express-validator");

const mongoose = require("mongoose");

const bcrypt = require("bcrypt");
const randomstring = require("randomstring");
const { Mongoose } = require("mongoose");

const createUser = async (req, res) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        msg: "Errors",
        errors: errors.array(),
      });
    }


    const { name, email,administration,password } = req.body;


    const isExists = await User.findOne({
      email: email,
    });

    if (isExists) {
      return res.status(400).json({
        success: false,
        msg: "Email is already exist!",
      });
    }
    const hashedPassword = await bcrypt.hash(password, 15);


    var x =new mongoose.Types.ObjectId(req.body.branch_id);

    
    var obj = {
      name,
      email,
      branch_id: new mongoose.Types.ObjectId(req.body.branch_id),
      password: hashedPassword,
      administration:administration,
    };

    // if (req.body.role && req.body.role == 1) {
    //   return res.status(400).json({
    //     success: false,
    //     msg: "You can't create Admin!",
    //   });
    // } else 
    if (req.body.role) {
      obj.role = req.body.role;
    }


    const user = new User(obj);

    const userData = await user.save();

    // add permission to user if coming in req

    if (req.body.permissions != undefined && req.body.permissions.length > 0) {
      const addPermission = req.body.permissions;
      const permissionArray = [];

      await Promise.all(
        addPermission.map(async (permission) => {
          const permissionData = await Permission.findOne({
            _id: permission.id,
          });

          permissionArray.push({
            permission_name: permissionData.permission_name,
            permission_value: permission.value,
          });
        })
      );

      const userPermission = new UserPermission({
        user_id: userData._id,
        permissions: permissionArray,
      });

      await userPermission.save();
    }


    return res.status(200).json({
      success: true,
      msg: "User Data Created Successfully!",
      data: userData,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      msg: error.message,
    });
  }
};
// Get All Users API Method

const getUsers = async (req, res) => {
  try {
 
    const users = await User.aggregate([
      {
        $match: {
          _id: {
            $ne: fx
          },
        },
      },
      {
        $lookup: {
          from: "userpermissions",
          localField: "_id",
          foreignField: "user_id",
          as: "permissions",
        },
      },

      {
        $project: {
          _id: 1,
          name: 1,
          email: 1,
          role: 1,
          permissions: {
            $cond: {
              if: { $isArray: "$permissions" },
              then: { $arrayElemAt: ["$permissions", 0] },
              else: null,
            },
          },
        },
      },
      {
        $addFields: {
          permissions: {
            permissions: "$permissions.permissions",
          },
        },
      },
    ]);

    return res.status(200).json({
      success: true,
      msg: "Users Data Fetched Successfully",
      data: users,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      msg: error.message,
    });
  }

  // try {

  //     const users = await User.find({
  //         _id: {
  //             $ne: req.user._id
  //         }
  //     });

  //     return res.status(200).json({
  //         success: true,
  //         msg: 'Users Data Fetched Successfully',
  //         data: users
  //     });

  // } catch (error)
  // {
  //     return res.status(400).json({
  //         success: false,
  //         msg: error.message,
  //     });
  // }
};

// Update User Data API Method

const updateUser = async (req, res) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        msg: "Errors",
        errors: errors.array(),
      });
    }

    const { id } = req.params;

    const { name } = req.body;

    const isExists = await User.findOne({
      _id: id,
    });

    if (!isExists) {
      return res.status(400).json({
        success: false,
        msg: "Sorry, This user does not exist!",
      });
    }

    var updateObj = {
      name,
    };

    if (req.body.role != undefined) {
      updateObj.role = req.body.role;
    }

    const userUpdatedData = await User.findByIdAndUpdate(
      { _id: id },
      {
        $set: updateObj,
      },
      { new: true }
    );

    // add permission to user if coming in req

    if (req.body.permissions != undefined && req.body.permissions.length > 0) {
      const addPermission = req.body.permissions;
      const permissionArray = [];

      await Promise.all(
        addPermission.map(async (permission) => {
          const permissionData = await Permission.findOne({
            _id: permission.id,
          });

          permissionArray.push({
            permission_name: permissionData.permission_name,
            permission_value: permission.value,
          });
        })
      );

      await UserPermission.findOneAndUpdate(
        {user_id: userUpdatedData._id},
        {permissions:permissionArray},
        {upsert:true,new:true,setDefaultsOnInsert:true}
    
    );
    }

    return res.status(200).json({
      success: true,
      msg: "User Data Updated Successfully!",
      data: userUpdatedData,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      msg: error.message,
    });
  }
};



const fetchUsers = async (req, res) => {
  try {
    // For Fetching all the permissions from the database

    const permissions = await User.find({});

    return res.status(200).json(permissions );
  } catch (error) {
    return res.status(400).json({
      success: false,
      msg: error.message,
    });
  }
};

// Delete User API Method

const deleteUser = async (req, res) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        msg: "Errors",
        errors: errors.array(),
      });
    }

      const { id } = req.params;

    const isExists = await User.findOne({
      _id: id,
    });

    if (!isExists) {
      return res.status(400).json({
        success: false,
        msg: "User Not Found.",
      });
    }

    await User.findByIdAndDelete({
      _id: id,
    });

    return res.status(200).json({
      success: true,
      msg: "User Record Deleted Succcessfully!",
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      msg: error.message,
    });
  }
};

module.exports = {
  getUsers,
  updateUser,
  deleteUser,
  createUser,fetchUsers
};
