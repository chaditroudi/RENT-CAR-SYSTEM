
const express = require("express");
require('dotenv').config();

const PORT =process.env.PORT_SERVER;

const app = express();
const bodyParser = require("body-parser");
var cors = require("cors");
const cookieParser = require('cookie-parser');
const mongoose  = require('mongoose')
require("./src/utils/mongo-connection");


const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./src/utils/swagger');

const socketIo = require('./src/utils/socket');
const appRoutes = require("./src/routes");
const path = require("path");

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use(cookieParser());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));



app.use("/api", appRoutes);

app.use((_, res) =>{
    res.send({
        message: 'Not found!'
    })
});




const httpServer = require('http').createServer(app);



// Define a schema for notifications
const notificationSchema = new mongoose.Schema({
  userId: String,
  title: String,
  message: String,
}, { timestamps: true });

const Notification = mongoose.model('Notification', notificationSchema);

// Socket.IO logic

httpServer.listen(PORT, () => console.log(`listening on port ${PORT}`   ));

const io = require('./src/utils/socket').init(httpServer);


io.on('connection', socket=>{
  console.log('Connected To Socket');
});
