const express = require('express');
const favoritesRouter = express.Router();
const favoritesController = require('../controllers/favoriteController');

favoritesRouter
  .route(`/:id`)
  .get(favoritesController.getTotalFavorites)
  .post(favoritesController.updateFavorite);

favoritesRouter
  .route(`/user/restaurants/:id`)
  .get(favoritesController.getUserRestaurantFavorites);

favoritesRouter
  .route(`/user/num/:id`)
  .get(favoritesController.getUserCountFavorites);

favoritesRouter
  .route(`/restaurant/num/:id`)
  .get(favoritesController.getRestaurantCountFavorites);

favoritesRouter
  .route(`/restaurant/users/:id`)
  .get(favoritesController.getRestaurantUserFavorites);

module.exports = favoritesRouter;
