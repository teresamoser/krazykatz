const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Krazy Katz Project API',
    description: 'Lesson 9-13 Team Project - Krazy Katz API'
  },
  host: 'krazykatz.onrender.com',
  schemes: ['http', 'https']
};

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/index.js'];

/* NOTE: if you use the express Router, you must pass in the 
   'endpointsFiles' only the root file where the route starts,
   such as index.js, app.js, routes.js, ... */

swaggerAutogen(outputFile, endpointsFiles, doc);
