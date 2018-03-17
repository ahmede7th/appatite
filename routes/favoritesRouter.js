const express = require('express');
const favoritesRouter = express.Router();
const favoritesController = require('../controllers/favoriteController');

favoritesRouter
  .route(`/`)
  .get(favoritesController.index)
  .post(favoritesController.create);

favoritesRouter
  .route(`/edit/:id`)
  .get(favoritesController.show)
  .put(favoritesController.update);

favoritesRouter
  .route(`/:id`)
  .delete(favoritesController.destroy);

module.exports = favoritesRouter;
