//Code added by Nina (for swagger only, this still needs to be updated to work correctly.)
const express = require('express');
const router = express.Router();

const usersController = require('../controllers/users');
const validation = require('../middleware/validate'); //ADD BACK IN when middleware is set up - Nina
const { requiresAuth } = require('express-openid-connect');

router.get('/', requiresAuth(), usersController.getAllUsers);
router.get('/:id', requiresAuth(), validation.checkId, usersController.getSingleUser);
router.post(
  '/',
  requiresAuth(),
  // validation.saveusers,
  usersController.createUser
);
router.put(
  '/:id',
  requiresAuth(),
  validation.checkId,
  // validation.saveusers,
  usersController.updateUser
);
router.delete('/:id', requiresAuth(), validation.checkId, usersController.deleteUser);

module.exports = router;
