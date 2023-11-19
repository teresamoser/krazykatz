const router = require('express').Router();
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../swagger.json');
// const { requiresAuth } = require('express-openid-connect');

router.use('/', swaggerUi.serve);
router.use(
  '/',
  // requiresAuth(), // DO NOT REMOVE until Auth0 is working -Nina
  swaggerUi.setup(swaggerDocument)
);

module.exports = router;
