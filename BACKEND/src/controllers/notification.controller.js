const Notification = require('../models/notification.model');
const User = require('../models/user.model');
const ApiError = require('../Exceptions/api.error');


const HttpStatusCode = require ('../Exceptions/error.status')
socket = require('../utils/socket')

// Function to send notification to a specific user
// const sendNotification = async (userId, title, message) => {
//   try {
//     const userId = req.user._id; 

//     const notification = new Notification({userId,title, message });
//     const newNotification = await  notification.save();
//     ("send notifi",notification)

//     socket.getIo().emit('send-notification', newNotification);
    

//   } catch (err) {
//     console.error(err);
//   }
// };


exports.displayNotification = async (req, res) => {
  try {

    
    const user = await User.findById(req.user._id);

    if(!user){
        throw new ApiError('Invalid User', HttpStatusCode.BAD_REQUEST, 'Please Login Again', true);
    }

    const notifications = await Notification.find({reciever: req.user._id}).populate('car');

    return res.status(200).json(notifications );
  } catch (error) {
    return res.status(400).json({
      success: false,
      msg: error.message,
    });
  }
}


exports.updateNotificationById = async (req, res, next) => {
    try {
        const notification = await Notification.findById(req.params.id);
        if (!notification) {
            throw new ApiError('Invalid Data', HttpStatusCode.BAD_REQUEST, 'No Notification with this id', true);
        }
        notification.isRead = true;
        await notification.save();
        res.send({ 'message': 'Notification is marked as Read' });
    } catch (error) {
        next(error);
    }
};

exports.updateAllNotifications = async (req, res, next) => {p
    try {
        await Notification.updateMany({ user: req.user._id }, { $set: { isRead: true } });
        res.send({ 'message': 'All Notifications are marked as Read' });
    } catch (error) {
        next(error);
    }
};

exports.deleteNotificationById = async (req, res, next) => {
    try {
        const notification = await Notification.findByIdAndDelete(req.params.id);
        if (!notification) {
            throw new ApiError('Invalid Data', HttpStatusCode.BAD_REQUEST, 'No Notification with this id', true);
        }
        res.json({ message: 'Notification Deleted Successfully' });
    } catch (error) {
        next(error);
    }
};

exports.deleteAllNotifications = async (req, res, next) => {
    try {

        const notifications = await Notification.deleteMany({ user: req.user._id });
        res.json({ message: 'All Notifications Deleted Successfully' });
    } catch (error) {
        next(error);
    }
};



