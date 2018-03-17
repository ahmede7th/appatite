const express = require('express');
const userRouter = express.Router();
const userController = require('../controllers/userController');

userRouter
  .route(`/`)
  .get(userController.getOneUser)
  .post(userController.createUser);

userRouter
  .route(`/edit/:id`)
  .get(userController.show)
  .put(userController.updateUser);

userRouter
  .route(`/:id`)
  .delete(userController.destroyByUsername);

module.exports = userRouter;
