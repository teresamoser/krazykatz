const express = require('express');
const router = express.Router();
// DO NOT UNCOMMENT until Auth0 is working -Nina
// const { auth } = require('express-openid-connect');
// const auth0Controller = require('../controllers/auth0');

const swagger = require('./swagger');
const appointment = require('./appointment');
// const pets = require('./pets');
// const users = require('./users');
// const veterinarian = require('./veterinarian');
const homeController = require('../controllers/index');

router.use('/api-docs', swagger);
router.use('/appointments', appointment);
// router.use('/pets', pets);
// router.use('/users', users);
// router.use('/veterinarian', veterinarian);
router.use('/', homeController.home);

// DO NOT UNCOMMENT until Auth0 is working -Nina
// router.use(auth(auth0Controller.config));
// router.use('/auth0', auth0);

module.exports = router;
