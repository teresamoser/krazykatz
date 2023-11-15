// const validate = require('../helpers/validate');
const ObjectId = require('mongodb').ObjectId;
// const { requiresAuth } = require('express-openid-connect');

const checkId = (req, res, next) => {
  // checks to see if the id entered is a valid Mongodb ID
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json({ message: 'Must use a valid ID.' });
    process.exit;
  } else {
    next();
  }
};

module.exports = {
  checkId
};
