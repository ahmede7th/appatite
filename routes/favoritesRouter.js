const express = require('express');
const favoritesRouter = express.Router();
const favoritesController = require('../controllers/favoriteController');

favoritesRouter
  .route(`/user`)
  .post(favoritesController.getUserFavorites);

favoritesRouter
  .route(`/:id`)
  .get(favoritesController.getTotalFavorites)
  .post(favoritesController.updateFavorite);

favoritesRouter
  .route(`/number`)
  .get(favoritesController.getUserCountFavorites);

module.exports = favoritesRouter;
