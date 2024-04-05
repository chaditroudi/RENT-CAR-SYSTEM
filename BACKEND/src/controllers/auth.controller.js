const User = require('../models/user.model');

const { validationResult } = require('express-validator');

const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt');



const UserPermission = require('../models/user.permission');
const Permission = require('../models/permission.model');
const generateAccessToken = require('../helper/token');


// Register New User API Method

const registerUser = async(req, res) => {

    try {

        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                msg: 'Errors',
                errors: errors.array()
            });
        }
        
        const { name, email, password } = req.body;

        const isExistUser = await User.findOne({ email })

        if (isExistUser) {
            return res.status(200).json({
                success: false,
                msg: 'This E-mail is Already Exist!'
            });
        }

        const hashedPassword = await bcrypt.hash(password, 15);

        const user = new User({
            name,
            email,
            password:hashedPassword
        });

        const userData = await user.save();

        // Assigning the Default Permissions to created User

        const defaultPermissions = await Permission.find({
            is_default: 1
        });

        if (defaultPermissions.length > 0) {

            const PermissionArray = [];

            defaultPermissions.forEach(permission => {

                PermissionArray.push({
                    permission_name:permission.permission_name,
                    permission_value:[0,1,2,3]
                });

            });

            const userPermission = new UserPermission({
                user_id:userData._id,
                permissions:PermissionArray
            });

            await userPermission.save();

        }

        return res.status(200).json({
            success: true,
            msg: 'User Registered Successfully!',
            data: userData
        });
        
    } 
    catch (error) {
        return res.status(400).json({
            success: false,
            msg: error.message
        });
    }

}

// Generating the JWT Access Token


// Login User API Method

const loginUser = async(req, res) => {

    try {

        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                msg: 'Errors',
                errors: errors.array()
            });
        }

        const { email, password } = req.body;

        const userData = await User.findOne({ email });

        if (!userData) {
            return res.status(400).json({
                success: false,
                msg: 'E-mail or Password does not match!'
            });
        }

        const isPasswordMatch = await bcrypt.compare(password, userData.password);

        if (!isPasswordMatch) {
            return res.status(400).json({
                success: false,
                msg: 'E-mail or Password does not match!'
            });
        }
        const user = {
            email: userData.email,
            role: userData.role,

        }

        const gat = await generateAccessToken(user);

        expiration = gat.expiration;
        token = gat.token
       
       
        res.cookie('token', token, {
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
                $match:{ email:userData.email }
            },
            {
                $lookup:{
                    from:"userpermissions",
                    localField: "_id",
                    foreignField: "user_id",
                    as: 'permissions'
                }
            },
            {
                $project:{
                    _id: 1,
                    name: 1,
                    email: 1,
                    role: 1,
                    permissions:{
                        $cond:{
                            if: { $isArray: "$permissions" },
                            then: { $arrayElemAt: [ "$permissions", 0 ] },
                            else: null
                        }
                    }
                }
            },
            {
                $addFields:{
                    "permissions":{
                        "permissions": "$permissions.permissions"
                    }
                }
            }
        ]);

        return res.status(200).json({
            success: true,
            msg: 'You have successfully logged in.',
            accessToken: gat.token,
            expDate:gat.expiration,
            tokenType:'Bearer Token',
            data: result[0]
        });
        
    } 
    catch (error) {
      console.log(error)
        return res.status(400).json({
            success: false,
            msg: error.message
        });
    }

}

// Get User Profile Method API


const getProfile = async(req, res) => {

    try {

        const user_id = req.user._id;
        const userData = await User.findOne({ _id: user_id });

        return res.status(200).json({
            success: true,
            msg: 'Profile data retrieved successfully',
            data: userData,
        });
        
    }
    catch (error) {
        return res.status(400).json({
            success: false,
            msg: error.message
        });
    }

}

module.exports = {
    registerUser,
    loginUser,
    getProfile
}