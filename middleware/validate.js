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
    user: 'required|string',
    veterinarian: 'required|string',
    dateAndTime: 'required|string',
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

const savepets = (req, res, next) => {
  const validationRule = {
    owner: 'required|string',
    name: 'required|string',
    species: 'required|string',
    breed: 'required|string|max:500',
    age: 'required|integer',
    weight: 'required|numeric'
  };
  const medicalHistoryRules = {
    'medicalHistory.*.vaccineType': 'required|string',
    'medicalHistory.*.date': 'required|date',
    'medicalHistory.*.secondDose': 'required|date',
  };
  // Combinando as regras
const allRules = { ...validationRule, ...medicalHistoryRules };
validator(req.body, allRules, {}, (err, status) => {
  if (!status) {
    const errors = err.errors || {};  // Aqui ajustamos para lidar com o objeto de erros
    res.status(400).send({
      success: false,
      message: 'Validation failed',
      data: errors,
    });
  } else {
    next();
  }
});
};

const saveusers = (req, res, next) => {
  const validationRule = {
    username: 'required|string',
    password: 'required|string|min:8|max:26|regex:/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/',
    email: 'required|email',
    contactInformation: 'required|string'
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

const saveVeterinarians = (req, res, next) => {
  const validationRule = {
    name: 'required|string',
    specialization: 'required|string',
    contactInformation: 'required|string|max:500',
    availability: 'required|string'
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
  saveAppointment,
  savepets,
  saveusers,
  saveVeterinarians
};
