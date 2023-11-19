const express = require('express');
const router = express.Router();

const petsController = require('../controllers/pets');
// const validation = require('../middleware/validate'); ADD BACK IN when middleware is set up - Nina

router.get('/', petsController.getAllPets);
router.get('/:id', petsController.getSinglePet);
router.post(
  '/',
  // validation.savepets,
  petsController.createPet
);
router.put(
  '/:id',
  // validation.savepets,
  petsController.updatePet
);
router.delete('/:id', petsController.deletePet);

module.exports = router;
