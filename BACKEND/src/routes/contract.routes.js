const express = require("express");
const contractController = require("../controllers/contract.controller")
const contractRouter = express.Router();

contractRouter.route("/create-contract").post(contractController.createcontract);
contractRouter.route("/update-contract/:id").put(contractController.updateContract);
contractRouter.route("/delete-contract/:id").delete(contractController.deleteContract);
contractRouter.route("/display-contracts").get(contractController.getAllContracts);

module.exports = contractRouter;