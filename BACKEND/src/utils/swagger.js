const swaggerJSDoc = require('swagger-jsdoc');

const options = {
    definition: {

        openapi: '3.0.3',
        info: {
            title: 'test',
            version: '1.0.0'
        },
        servers: [
            { url: 'http://localhost:5000/api' }
        ]
    },
    apis: ['src/routes/*.js'],

}
const swaggerSpec = swaggerJSDoc(options);
module.exports = swaggerSpec;