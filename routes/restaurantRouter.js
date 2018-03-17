const express = require('express');
const restaurantRouter = express.Router();
const restaurantController = require('../controllers/restaurantController');

restaurantRouter
  .route(`/`)
  .get(restaurantController.getAllRestaurants)
  .post(restaurantController.createRestaurant);

restaurantRouter
  .route(`/edit/:id`)
  .get(restaurantController.getOneRestaurant)
  .put(restaurantController.updateRestaurant);

restaurantRouter
  .route(`/:id`)
  .delete(restaurantController.destroyRestaurantById);

module.exports = restaurantRouter;
