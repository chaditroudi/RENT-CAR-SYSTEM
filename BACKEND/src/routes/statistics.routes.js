const express = require('express');
const statisticsController = require('../controllers/statistics.controller');
const router = express.Router();

const auth = require('../middleware/auth.middleware');
const { OnlyAdminCanAccess, OnlyEditorAdminCanAccess } = require('../middleware/admin.midlleware');

router.get('/count-open-contract', auth, statisticsController.countContractOpen);
router.get('/count-closed-contract', auth,  statisticsController.countContractClosed);
router.get('/count-rented-car', auth,  statisticsController.countCarRented);
router.get('/count-available-car', auth, statisticsController.countCarAvailable);


module.exports = router;