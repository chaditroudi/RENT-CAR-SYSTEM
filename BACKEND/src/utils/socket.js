// // socket.j
// const socktIo = require('socket.io');

// const Notification = require('../models/notification.model');

// let io;

// module.exports = {
//   init: (server) => {
//     io = socktIo(server, {
//       cors: { origin: '*' }
//     });
//     ("Socket.IO initialized");

//     io.on('connection', (socket) => {
//         console.log("user connected")

//         // Listen for new notifications
//         socket.on('send-notification', async (notificationData) => {
//           try { 
//                         const newNotification = new Notification(notificationData);
// // 
//             io.emit('send-notification', newNotification);

//             await newNotification.save();
      
//           } catch (error) {
//             console.error('Error saving notification:', error);
//           }
//         });
      
//         // Handle disconnect
//         socket.on('disconnect', () => {
//           console.log('A user disconnected');
//         });
//       });
      
    
//     return io;
//   },
  
//   getIo: () => {
//     if (!io) {
//       throw new Error('Socket.IO not initialized!');
//     }
//     return io;
//   }
// };

let io;

module.exports = {
    init: httpServer=>{
        io = require('socket.io')(httpServer, {
            cors: {
                origin: '*',
            }
        });
        return io;
    },
    getIo: ()=>{
        if(!io){
            throw new Error('Socket is not initialized');
        }
        return io;
    }
};