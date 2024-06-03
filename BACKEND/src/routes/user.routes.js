
const express = require('express');

const userController = require('../controllers/user.controller');

const router = express.Router();

const auth = require('../middleware/auth.middleware');

const { updateUserValidator, deleteUserValidator, createUserValidator } = require('../helper/user-validator.helper');

router.get('/', userController.fetchUsers);


router.put('/:id', userController.updateUser);
router.delete('/:id', userController.deleteUser);
router.post('/', userController.createUser);


module.exports = router;
