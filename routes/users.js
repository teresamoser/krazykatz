//Code added by Nina (for swagger only, this still needs to be updated to work correctly.)
const express = require('express');
const router = express.Router();

const usersController = require('../controllers/users');
// const validation = require('../middleware/validate'); ADD BACK IN when middleware is set up - Nina

router.get('/', usersController.getAllUsers);
router.get('/:id', usersController.getSingleUser);
router.post(
  '/',
  // validation.saveusers,
  usersController.createUser
);
router.put(
  '/:id',
  // validation.saveusers,
  usersController.updateUser
);
router.delete('/:id', usersController.deleteUser);

module.exports = router;
