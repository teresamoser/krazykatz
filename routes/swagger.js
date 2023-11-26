const router = require('express').Router();
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../swagger.json');
const { requiresAuth } = require('express-openid-connect');

router.use('/', requiresAuth(), swaggerUi.serve);
router.use('/', requiresAuth(), swaggerUi.setup(swaggerDocument));

module.exports = router;
