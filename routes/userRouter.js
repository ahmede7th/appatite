const express = require('express');
const userRouter = express.Router();
const userController = require('../controllers/userController');

userRouter
  .route('/')
  .post(userController.createUser);

userRouter
  .route(`/:id`)
  .get(userController.getOneUser);

userRouter
  .route(`/all/:id`)
  .get(userController.getAllUsers);

userRouter
  .route(`/edit/:id`)
  .get(userController.getOneUser)
  .put(userController.updateUser);

userRouter
  .route(`/delete/:id`)
  .delete(userController.destroyByUsername);

module.exports = userRouter;
