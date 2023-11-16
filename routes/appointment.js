const express = require('express');
const router = express.Router();

const appointmentController = require('../controllers/appointment');
const validation = require('../middleware/validate');

router.get('/', appointmentController.getAllAppointments);
router.get('/:id', appointmentController.getSingleAppointment);
router.post('/', validation.saveAppointment, appointmentController.createAppointment);
router.put('/:id', validation.saveAppointment, appointmentController.updateAppointment);
router.delete('/:id',  appointmentController.deleteAppointment);

module.exports = router;