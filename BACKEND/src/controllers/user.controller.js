const User = require('../models/user.model');

const { validationResult } = require('express-validator');





// Get All Users API Method

const getUsers = async(req, res) => {

    try {


        const users = await User.find({
            _id: {
                $ne: req.user._id
            }
        });

        return res.status(200).json({
            success: true,
            msg: 'Users Data Fetched Successfully',
            data: users
        });
        
    } catch (error) 
    {
        return res.status(400).json({
            success: false,
            msg: error.message,
        });
    }

}

// Update User Data API Method

const updateUser = async(req, res) => {

    try {

        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                msg: 'Errors',
                errors: errors.array()
            });
        }

        const { id, name } = req.body;

        const isExists = await User.findOne({
            _id: id
        });

        if (!isExists) {
            return res.status(400).json({
                success: false,
                msg: 'Sorry, This user does not exist!'
            });
        }

        var updateObj = {
            name
        }

        if (req.body.role != undefined) {
            updateObj.role = req.body.role;
        }

        const userUpdatedData = await User.findByIdAndUpdate({ _id:id },{
            $set: updateObj
        }, { new:true });

        return res.status(200).json({
            success: true,
            msg: 'User Data Updated Successfully!',
            data: userUpdatedData
        });
        
    } catch (error) 
    {
        return res.status(400).json({
            success: false,
            msg: error.message,
        });
    }

}

// Delete User API Method

const deleteUser = async(req, res) => {

    try {

        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                msg: 'Errors',
                errors: errors.array()
            });
        }

        const { id } = req.body;

        const isExists = await User.findOne({
            _id: id
        });

        if (!isExists) {
            return res.status(400).json({
                success: false,
                msg: 'User Not Found.',
            });
        }

        await User.findByIdAndDelete({
            _id: id
        });

        return res.status(200).json({
            success: true,
            msg: 'User Record Deleted Succcessfully!',
        });
        
    } catch (error) 
    {
        return res.status(400).json({
            success: false,
            msg: error.message,
        });
    }
    
}

module.exports = {
    getUsers,
    updateUser,
    deleteUser
}