const express = require('express');
const router = express.Router();

const petsController = require('../controllers/pets');
const validation = require('../middleware/validate'); //ADD BACK IN when middleware is set up - Nina
const { requiresAuth } = require('express-openid-connect');

router.get('/', requiresAuth(), petsController.getAllPets);
router.get('/:id', requiresAuth(), validation.checkId, petsController.getSinglePet);
router.post(
  '/',
  requiresAuth(),
  // validation.savepets,
  petsController.createPet
);
router.put(
  '/:id',
  requiresAuth(),
  // validation.savepets,
  petsController.updatePet
);
router.delete('/:id', requiresAuth(), petsController.deletePet);

module.exports = router;
