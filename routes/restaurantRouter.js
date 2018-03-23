const express = require('express');
const restaurantRouter = express.Router();
const restaurantController = require('../controllers/restaurantController');

restaurantRouter
  .route(`/`)
  .get(restaurantController.getAllRestaurants)
  .post(restaurantController.createRestaurant);

restaurantRouter.route('/:id').get(restaurantController.getOneRestaurant);

restaurantRouter
  .route(`/edit/:id`)
  .get(restaurantController.getOneRestaurant)
  .put(restaurantController.updateRestaurant);

restaurantRouter
  .route(`/delete/:id`)
  .delete(restaurantController.destroyRestaurantByName);

module.exports = restaurantRouter;
