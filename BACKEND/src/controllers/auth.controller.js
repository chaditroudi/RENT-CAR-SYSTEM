const User = require("../models/user.model");
const { validationResult } = require("express-validation");

const loginUser = (req, res) => {
  User.find({ email: req.body.email }, function (err, docs) {
    if (err) {
      console.log(err);
    } else {
      if (docs.length > 0) {
        if (docs[0].password == req.body.password) {
          res.status(200).json({ status: "success" });
        } else {
          res.send("Invalid Credentials!");
        }
      } else {
        res.send("Invalid Credentials!");
      }
    }
  });
};

const registerUser = async (req, res) => {
  try { 
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(200).json(
        {   success:false,
            msg:"Errors", 
            errors: errors.array()
         });
    }
  } catch (err) {}
};

module.exports = {
  loginUser,
  registerUser,
};
