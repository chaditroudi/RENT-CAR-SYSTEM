
const express = require("express");
require('dotenv').config();

const app = express();
const bodyParser = require("body-parser");
var cors = require("cors");
const cookieParser = require('cookie-parser');

require("./src/utils/mongo-connection");


const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./src/utils/swagger');


const appRoutes = require("./src/routes");

app.use(bodyParser.urlencoded());
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


app.listen(3200, (req, res)=>{
    console.log("Server is listening on port 3200");
})