const express = require('express');
const restaurantRouter = express.Router();
const restaurantController = require('../controllers/restaurantController');

restaurantRouter
  .route(`/`)
  .get(restaurantController.getAllRestaurants)
  // .post(restaurantController.createRestaurant, restaurantController.getAllYelp);
  .post(restaurantController.getAllYelp)

restaurantRouter
  .route('/:id')
  .get(restaurantController.getOneRestaurant)
  .post(restaurantController.getAllYelpReviews)

restaurantRouter
  .route(`/edit/:id`)
  .get(restaurantController.getOneRestaurant)
  .put(restaurantController.updateRestaurant);

restaurantRouter
  .route(`/delete/:id`)
  .delete(restaurantController.destroyRestaurantByName);

module.exports = restaurantRouter;