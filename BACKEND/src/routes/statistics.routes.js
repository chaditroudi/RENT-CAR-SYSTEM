const express = require('express');
const statisticsController = require('../controllers/statistics.controller');
const router = express.Router();

const auth = require('../middleware/auth.middleware');
const { OnlyAdminCanAccess } = require('../middleware/admin.midlleware');

router.get('/count-open-contract', auth, OnlyAdminCanAccess, statisticsController.countContractOpen);
router.get('/count-closed-contract', auth, OnlyAdminCanAccess, statisticsController.countContractClosed);
router.get('/count-rented-car', auth, OnlyAdminCanAccess, statisticsController.countCarRented);
router.get('/count-available-car', auth, OnlyAdminCanAccess, statisticsController.countCarAvailable);

router.get('/get-rental-history', auth,statisticsController.getRentalHistory);

module.exports = router;