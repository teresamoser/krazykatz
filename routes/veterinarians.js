//Code added by Teresa Moser
const express = require('express');
const router = express.Router();

const veterinariansController = require('../controllers/veterinarians');
// const validation = require('../middleware/validate'); ADD BACK IN when middleware is set up - Nina

router.get('/', veterinariansController.getAllVeterinarians);
router.get('/:id', veterinariansController.getSingleVeterinarian);
router.post(
  '/',
  // validation.saveVeterinarians,
  veterinariansController.createVeterinarian
);
router.put(
  '/:id',
  // validation.saveVeterinarians,
  veterinariansController.updateVeterinarian
);
router.delete('/:id', veterinariansController.deleteVeterinarian);

module.exports = router;
