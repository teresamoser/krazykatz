const validator = require('../helpers/validate');
const ObjectId = require('mongodb').ObjectId;

const checkId = (req, res, next) => {
  // checks to see if the id entered is a valid Mongodb ID
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json({ message: 'Must use a valid ID.' });
    process.exit;
  } else {
    next();
  }
};

const saveAppointment = (req, res, next) => {
  const validationRule = {
    dateTime: 'required|string',
    purpose: 'required|string|max:500'
  };
  validator(req.body, validationRule, {}, (err, status) => {
    if (!status) {
      res.status(400).send({
        success: false,
        message: 'Validation failed',
        data: err
      });
    } else {
      next();
    }
  });
};

// app.get('/profile', requiresAuth(), (req, res) => {
//   res.send(JSON.stringify(req.oidc.user));
// });

module.exports = {
  checkId,
  saveAppointment
};
