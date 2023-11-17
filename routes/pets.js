const express = require('express');
const router = express.Router();

const petsController = require('../controllers/pets');
// const validation = require('../middleware/validate'); ADD BACK IN when middleware is set up - Nina

router.get('/', petsController.getAllpetss);
router.get('/:id', petsController.getSinglepets);
router.post(
  '/',
  // validation.savepets,
  petsController.createpets
);
router.put(
  '/:id',
  // validation.savepets,
  petsController.updatepets
);
router.delete('/:id', petsController.deletepets);

module.exports = router;
