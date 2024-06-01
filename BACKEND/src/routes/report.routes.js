const express = require('express');
const router = express();

const auth = require('../middleware/auth.middleware');

const reportController = require('../controllers/report.controller');




router.post('/add-report', auth, reportController.createReport);
router.get('/get-reports', auth, reportController.getAllReports);
router.get('/get-monthly-reports', auth, reportController.fetchMonthlyRep);
router.delete('/delete-permission/:id', auth, reportController.deleteReport);
router.put('/update-report/:id', auth, reportController.updateReport);
router.post('/getWeeklyReports', reportController.getWeeklyReports);
router.post('/getMonthlyReports', reportController.getMonthlyReports);
router.post('/getYearlyReports', reportController.getYearlyReports);
router.get('/getContractCount', reportController.getContractCount);











module.exports = router;