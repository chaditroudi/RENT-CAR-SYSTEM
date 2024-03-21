const express = require("express");
const authController = require("../controllers/auth.controller")
const authRouter = express.Router();

authRouter.route("/login").post(authController.loginUser);
authRouter.route("/register").post(authController.registerUser);

module.exports = authRouter;