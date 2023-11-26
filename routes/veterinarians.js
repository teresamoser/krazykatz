//Code added by Teresa Moser
const express = require('express');
const router = express.Router();

const veterinariansController = require('../controllers/veterinarians');
const validation = require('../middleware/validate'); // ADD BACK IN when middleware is set up - Nina
const { requiresAuth } = require('express-openid-connect');

router.get('/', requiresAuth(), veterinariansController.getAllVeterinarians);
router.get(
  '/:id',
  requiresAuth(),
  validation.checkId,
  veterinariansController.getSingleVeterinarian
);
router.post(
  '/',
  requiresAuth(),
  // validation.saveVeterinarians,
  veterinariansController.createVeterinarian
);
router.put(
  '/:id',
  requiresAuth(),
  validation.checkId,
  // validation.saveVeterinarians,
  veterinariansController.updateVeterinarian
);
router.delete(
  '/:id',
  requiresAuth(),
  validation.checkId,
  veterinariansController.deleteVeterinarian
);

module.exports = router;
