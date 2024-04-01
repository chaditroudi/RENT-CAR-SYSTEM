
require('dotenv').config;
const express = require("express");

const app = express();
const bodyParser = require("body-parser");
var cors = require("cors");
require("./src/utils/mongo-connection");


const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./src/utils/swagger');


const appRoutes = require("./src/routes");

app.use(bodyParser.urlencoded());
app.use(bodyParser.json());
app.use(cors());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));



app.use("/api", appRoutes);

app.use((_, res) =>{
    res.send({
        message: 'Not found!'
    })
});


app.listen(5000, (req, res)=>{
    console.log("Server is listening on port 5000");
})