const express = require('express');
const statisticsController = require('../controllers/statistics.controller');
const router = express.Router();

const auth = require('../middleware/auth.middleware');
const { OnlyAdminCanAccess } = require('../middleware/admin.midlleware');

router.get('/count-open-contract', statisticsController.countContractOpen,auth, OnlyAdminCanAccess);
router.get('/count-closed-contract', statisticsController.countContractClosed,auth, OnlyAdminCanAccess);
router.get('/count-rented-car', statisticsController.countCarRented,auth, OnlyAdminCanAccess);
router.get('/count-available-car', statisticsController.countCarAvailable,auth, OnlyAdminCanAccess);

module.exports = router;