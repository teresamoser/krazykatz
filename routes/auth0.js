const express = require('express');
const router = express.Router();
const auth0Controller = require('../controllers/auth0');
const { requiresAuth } = require('express-openid-connect');

router.get('/', requiresAuth(), auth0Controller.getLogInOut);

module.exports = router;
