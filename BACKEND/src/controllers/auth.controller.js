const User = require("../models/user.model");
const Branch = require("../models/branch.model");

const { validationResult } = require("express-validator");

const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const UserPermission = require("../models/user.permission");
const Permission = require("../models/permission.model");
const generateAccessToken = require("../helper/token");

// Register New User API Method

const registerUser = async (req, res) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        msg: "Errors",
        errors: errors.array(),
      });
    }

    const { name, email, password, role } = req.body;

    const isExistUser = await User.findOne({ email });

    if (isExistUser) {
      return res.status(200).json({
        success: false,
        msg: "This E-mail is Already Exist!",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 15);

    const user = new User({
      name,
      email,
      password: hashedPassword,
      role,
    });

    const userData = await user.save();

    // Assigning the Default Permissions to created User

    const defaultPermissions = await Permission.find({
      is_default: 1,
    });

    if (defaultPermissions.length > 0) {
      const PermissionArray = [];

      defaultPermissions.forEach((permission) => {
        PermissionArray.push({
          permission_name: permission.permission_name,
          permission_value: [0, 1, 2, 3],
        });
      });

      const userPermission = new UserPermission({
        user_id: userData._id,
        permissions: PermissionArray,
      });

      await userPermission.save();
    }

    return res.status(200).json({
      success: true,
      msg: "User Registered Successfully!",
      data: userData,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      msg: error.message,
    });
  }
};

// Generating the JWT Access Token

// Login User API Method //

const loginUser = async (req, res) => {
  try {
    const errors = validationResult(req);
    let user ={}

    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        msg: "Errors",
        errors: errors.array(),
      });
    }

    const { email, password } = req.body;

    console.log(email)
    let userData = await User.findOne({ email });

    console.log(userData)

    if (!userData) {
      return res.status(400).json({
        success: false,
        msg: "E-mail or Password does not match!",
      });
    }
    

    const isPasswordMatch = await bcrypt.compare(password, userData.password);

    if (!isPasswordMatch) {
      return res.status(420).json({
        success: false,
        msg: "E-mail or Password does not match!",
      });
    }


    if (userData.branch_id) {
      userData = await userData.populate("branch_id");
      console.log(userData)
       user = {
        email: userData.email,
        role: userData.role,
        _id: userData._id,
        branch_id: userData.branch_id._id,
        branch_name: userData.branch_id.branch_name,
        administration:userData.administration
      };
    } else {
       user = {
        email: userData.email,
        role: userData.role,
        _id: userData._id,
      };
    }

    const gat = await generateAccessToken(user);

    expiration = gat.expiration;
    token = gat.token;

    res.cookie("token", token, {
      expiration: new Date(Date.now() + gat.expiration).toLocaleString(),
      secure: false,
      httpOnly: true,
    });

    userData.accessToken = token;
    userData.expDate = expiration;
    await userData.save();

    // Fetch User Data with all the assigned permissions

    const result = await User.aggregate([
      {
        $match: { email: userData.email },
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
          branch_id: 1,
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
      msg: "You have successfully logged in.",
      accessToken: gat.token,
      expDate: gat.expiration,
      branch_name: user.branch_name,
      administration: user.administration,
      tokenType: "Bearer Token",
      data: result[0],
    });
  } catch (error) {
    error;
    return res.status(400).json({
      success: false,
      msg: error.message,
    });
  }
};

// Get User Profile Method API

const getProfile = async (req, res) => {
  try {
    const user_id = req.user._id;
    const userData = await User.findOne({ _id: user_id });

    return res.status(200).json({
      success: true,
      msg: "Profile data retrieved successfully",
      data: userData,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      msg: error.message,
    });
  }
};
const updateBranch = async (req, res) => {
  try {
    const { branch_id } = req.body;
    const userId = req.user._id;

    // Update user with branch_id
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { branch_id },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).send({ message: "User not found" });
    }

    // Update branch with the user object
    const updatedBranch = await Branch.findByIdAndUpdate(
      branch_id,
      { $addToSet: { users: updatedUser } },
      { new: true }
    );

    if (!updatedBranch) {
      return res.status(404).send({ message: "Branch not found" });
    }

    res.status(200).send(updatedUser);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

module.exports = {
  registerUser,
  updateBranch,
  loginUser,
  getProfile,
};
