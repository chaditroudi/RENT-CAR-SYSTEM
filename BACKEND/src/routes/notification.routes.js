const {displayNotification, updateNotificationById, updateAllNotifications, deleteNotificationById, deleteAllNotifications } = require("../controllers/notification.controller");
const express = require("express");

const router = express.Router();

const auth = require('../middleware/auth.middleware');
const { OnlyAdminCanAccess } = require("../middleware/admin.midlleware");


//ADD NEW NOTIFICATION
// router.post('/create',createNotification);
router.get('/get-notifications',auth,OnlyAdminCanAccess,displayNotification);


router.put('/:id',auth,updateNotificationById);
router.put('/read/all',auth, updateAllNotifications);
router.delete('/:id',auth,deleteNotificationById);
router.delete('/delete/all', auth,deleteAllNotifications);






module.exports = router;