const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Krazy Katz Project API',
    description: 'Lesson 9-13 Team Project - Krazy Katz API'
  },
  host: 'krazykatz.onrender.com',
  schemes: ['https'],
  tags: [
    {
      name: 'Appointments',
      description: 'Keeps track of vet appointments for pets.'
    },
    {
      name: 'Pets',
      description: 'Keeps track of pet information.'
    },
    {
      name: 'Users',
      description: 'Keeps track of pet owners.'
    },
    {
      name: 'Veterinarians',
      description: 'Keeps track of Veterinarians '
    }
  ]
};

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/index.js'];

/* NOTE: if you use the express Router, you must pass in the 
   'endpointsFiles' only the root file where the route starts,
   such as index.js, app.js, routes.js, ... */

swaggerAutogen(outputFile, endpointsFiles, doc);
