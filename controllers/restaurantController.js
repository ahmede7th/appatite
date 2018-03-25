//Require the model
const restaurantDB = require(`../models/restaurantDB`);
const axios = require('axios');
module.exports = {
  getAllRestaurants(req, res, next) {
    console.log(`INSIDE GET ALL RESTAURANTS`);
    restaurantDB
    .getAllRestaurants()
    .then(restaurants => {
      res.json({
        message: 'ok',
        data: restaurants,
      });
    })
    .catch(err => {
      console.log('GET ALL RESTAURANTS FAILED--->', err);
      next(err);
    });
  },

  getOneRestaurant(req, res, next) {
    console.log(`INSIDE GETONE RESTAURANT--->`, req.params.id);
    restaurantDB
    .getOneRestaurant(req.params.id)
    .then(restaurant => {
      console.log('FOUND RESTAURANT WORKED---->', restaurant);
      res.json({
        message: 'Got restaurant',
        data: restaurant,
      });
    }).catch(err => {
      console.log('FOUND RESTAURANT FAILED---->', err);
    });
  },

  createRestaurant(req, res, next) {
    restaurantDB
    .save({
      name: req.body.name,
      rating: req.body.rating,
      cuisine: req.body.cuisine,
      creator: req.body.creator,
      img_src: 0,
      loc: 0,
    })
    .then(restaurant => {
      console.log('ADDING RESTAURANT WORKED--->', restaurant);
      res.json({
        message: 'ok',
        data: restaurant,
      });
    })
    .catch(err => {
      console.log('ADDING RESTAURANT FAILED--->', err);
      next(err);
    });
  },

  updateRestaurant(req, res, next) {
    restaurantDB
      .updateRestaurant({
        id: req.params.id,
        name: req.body.name,
        newName: req.body.newName,
        rating: req.body.rating,
        cuisine: req.body.cuisine,
        img_src: 0,
        loc: 0,
      })
      .then(restaurant => {
        console.log('UPDATING RESTAURANT WORKED--->', restaurant);
        res.json({
          message: 'ok',
          data: restaurant,
        });
      })
      .catch(err => {
        console.log('UPDATING RESTAURANT FAILED--->', err);
        next(err);
      });
  },

  destroyRestaurantByName(req, res, next) {
    restaurantDB
    .destroyRestaurantByName(req.params.id)
    .then(() => {
      console.log('DELETING RESTAURANT WORKED');
      res.json({
        message: 'restaurant deleted',
      });
    })
    .catch(err => {
      console.log('DELETE RESTAURANT FAILED--->', err);
      next(err);
    });
  },
};
