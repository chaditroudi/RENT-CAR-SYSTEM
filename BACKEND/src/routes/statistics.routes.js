const express = require('express');
const statisticsController = require('../controllers/statistics.controller');
const router = express.Router();

const auth = require('../middleware/auth.middleware');
const { OnlyAdminCanAccess, OnlyEditorAdminCanAccess } = require('../middleware/admin.midlleware');

router.get('/count-open-contract', auth, OnlyEditorAdminCanAccess, statisticsController.countContractOpen);
router.get('/count-closed-contract', auth, OnlyEditorAdminCanAccess, statisticsController.countContractClosed);
router.get('/count-rented-car', auth, OnlyEditorAdminCanAccess, statisticsController.countCarRented);
router.get('/count-available-car', auth, OnlyEditorAdminCanAccess, statisticsController.countCarAvailable);

router.get('/get-rental-history', auth,statisticsController.getRentalHistory);

module.exports = router;