const express = require("express");
const carRouter = express.Router();
const carController = require("../controllers/car.controller");

const auth = require('../middleware/auth.middleware');
const { OnlyAdminCanAccess, OnlyEditorAdminCanAccess } = require('../middleware/admin.midlleware');

/** POST Methods */
/**
 * @openapi
 * '/car/add-car':
 *  post:
 *     tags:
 *     - Car Controller
 *     summary: Create a car
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               next_service:
 *                 type: string
 *                 format: date
 *                 description: "The date of the next service."
 *               car:
 *                 type: number
 *                 format: float
 *                 description: "Petrol charge."
 *               code:
 *                 type: number
 *                 format: float
 *               year:
 *                 type: number
 *                 format: float
 *               plate: 
 *                 type: string                  
 *               insurance:
 *                 type: string
 *                 format: date
 *                 description: "Insurance details."
 *               registration:
 *                 type: string
 *                 format: date
 *                 description: "Vehicle registration information."
 *               engine_no:
 *                 type: string
 *                 description: "Engine number."
 *               chassis_no:
 *                 type: string
 *                 description: "Chassis number."
 *               fuel:
 *                 type: string
 *                 description: "Type of fuel used."
 *               comment:
 *                 type: string
 *                 description: "Additional comments."
 *               out_of_service:
 *                 type: boolean
 *                 description: "Indicates if the vehicle is out of service."
 *               petrol_charge:
 *                 type: number
 *                 format: float
 *                 description: "Petrol charge."
 *               daily:
 *                 type: number
 *                 description: "Daily rate."
 *               weekly:
 *                 type: number
 *                 description: "Weekly rate."
 *               monthly:
 *                 type: number
 *                 description: "Monthly rate."
 *               annual:
 *                 type: number
 *                 description: "Annual rate."
 *     responses:
 *       200:
 *         description: "Successfully added the car information."
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: "Indicates if the operation was successful."
 *                 message:
 *                   type: string
 *                   description: "A message detailing the result of the operation."
 */

carRouter.post("/add-car", auth,OnlyEditorAdminCanAccess,carController.createCar);

// Get all
carRouter.get("/display-cars", auth,OnlyEditorAdminCanAccess,carController.getAllCars);


/**
 * @swagger
 * /car/get-car/{id}:
 *   get:
 *     parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        type: string
 *        description: The car ID.
 *     description: Get a car by id
 *     responses:
 *       200:
 *         description: Returns the requested car
 */

carRouter.get("/get-car/:id",auth,OnlyEditorAdminCanAccess, carController.getCarById);



carRouter.get('/by-branchs', auth,OnlyEditorAdminCanAccess,carController.getAllCarsByBranch);
carRouter.get('/insurance/valid', auth,OnlyEditorAdminCanAccess,carController.fetchValidInssu);
carRouter.get('/registration/valid', auth,OnlyEditorAdminCanAccess,carController.fetchCarsWithValidRegist);



/** PUT Methods */
/**
 * @openapi
 * '/car/update-car/{id}':
 *  put:
*     parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        type: string
 *        description: The car ID.
 *     tags:
 *     - Car Controller
 *     summary: Update a car
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               next_service:
 *                 type: string
 *                 format: date
 *                 description: "The date of the next service."
 *               car:
 *                 type: number
 *                 format: float
 *                 description: "Petrol charge."
 *               code:
 *                 type: number
 *                 format: float
 *               year:
 *                 type: number
 *                 format: float
 *               plate: 
 *                 type: string                  
 *               insurance:
 *                 type: string
 *                 format: date
 *                 description: "Insurance details."
 *               registration:
 *                 type: string
 *                 format: date
 *                 description: "Vehicle registration information."
 *               engine_no:
 *                 type: string
 *                 description: "Engine number."
 *               chassis_no:
 *                 type: string
 *                 description: "Chassis number."
 *               fuel:
 *                 type: string
 *                 description: "Type of fuel used."
 *               comment:
 *                 type: string
 *                 description: "Additional comments."
 *               out_of_service:
 *                 type: boolean
 *                 description: "Indicates if the vehicle is out of service."
 *               petrol_charge:
 *                 type: number
 *                 format: float
 *                 description: "Petrol charge."
 *               daily:
 *                 type: number
 *                 description: "Daily rate."
 *               weekly:
 *                 type: number
 *                 description: "Weekly rate."
 *               monthly:
 *                 type: number
 *                 description: "Monthly rate."
 *               annual:
 *                 type: number
 *                 description: "Annual rate."
 *     responses:
 *       200:
 *         description: "Successfully updated the car ."
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: "Indicates if the operation was successful."
 *                 message:
 *                   type: string
 *                   description: "A message detailing the result of the operation."
 */
carRouter.put("/update-car/:id", auth,OnlyEditorAdminCanAccess,carController.updateCar);


/**
 * @swagger
 * /car/delete-car/{id}:
 *   delete:
 *     parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        type: string
 *        description: The car ID.
 *     description: Delete a car by id
 *     responses:
 *       200:
 *         description: Returns the requested car
 */
carRouter.delete("/delete-car/:id", auth,OnlyAdminCanAccess,carController.deleteCar);

module.exports = carRouter;
