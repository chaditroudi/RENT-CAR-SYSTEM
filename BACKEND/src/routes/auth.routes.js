const express = require('express');
const router = express();

const auth = require('../middleware/auth.middleware'); 

const authController = require('../controllers/auth.controller');

const { registerValidator, loginValidator } = require('../helper/auth-validator.helper');

router.post('/register', registerValidator, authController.registerUser);
router.post('/login', loginValidator, authController.loginUser);

// Authenticated Routes
router.put('/update-branch/:branch_id', auth, authController.updateBranch);


module.exports = router;