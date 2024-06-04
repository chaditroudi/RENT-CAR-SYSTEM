const swaggerJSDoc = require('swagger-jsdoc');

const options = {
    definition: {

        openapi: '3.0.3',
        info: {
            title: 'test',
            version: '1.0.0'
        },
        servers: [
            { url: `${process.env.PORT_SERVER}/api` }
        ]
    },
    apis: ['src/routes/*.js'],

}
const swaggerSpec = swaggerJSDoc(options);
module.exports = swaggerSpec;