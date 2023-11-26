const express = require('express');
const router = express.Router();

const appointmentController = require('../controllers/appointments');
const validation = require('../middleware/validate'); //ADD BACK IN when middleware is set up - Nina
const { requiresAuth } = require('express-openid-connect');

router.get('/', requiresAuth(), appointmentController.getAllAppointments);

router.get('/:id', requiresAuth(), validation.checkId, appointmentController.getSingleAppointment);

router.post(
  '/',
  requiresAuth(),
  validation.saveAppointment,
  appointmentController.createAppointment
);

router.put(
  '/:id',
  requiresAuth(),
  validation.checkId,
  validation.saveAppointment,
  appointmentController.updateAppointment
);

router.delete('/:id', requiresAuth(), appointmentController.deleteAppointment);

module.exports = router;
