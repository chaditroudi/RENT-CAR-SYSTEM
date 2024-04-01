
const express = require('express');

const userController = require('../controllers/user.controller');

const router = express.Router();

const auth = require('../middleware/auth.middleware');

const { updateUserValidator, deleteUserValidator } = require('../helper/user-validator.helper');

router.get('/get-users', auth, userController.getUsers);
router.post('/update-user', auth, updateUserValidator, userController.updateUser);
router.post('/delete-user', auth, deleteUserValidator, userController.deleteUser);


module.exports = router;
