const express = require('express');
const authRouter = express.Router();
const authController = require('../controllers/authController');

// favoritesRouter
//   .route(`/`)
//   .get(favoritesController.index)
//   .post(favoritesController.create);
//
// favoritesRouter
//   .route(`/edit/:id`)
//   .get(favoritesController.show)
//   .put(favoritesController.update);
//
// favoritesRouter
//   .route(`/:id`)
//   .delete(favoritesController.destroy);

module.exports = authRouter;
