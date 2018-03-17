//Require the model
const restaurantDB = require(`../models/userDB`);

module.exports = {
  getAllRestaurants(req, res, next) {
    console.log(`INSIDE GET ALL RESTAURANTS`);
    restaurantDB
      .getAllRestaurants()
      .then(restaurants => {
        console.log('GET ALL RESTAURANTS WORKED---->', restaurants);
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
      console.log('FOUND USER WORKED---->', restaurant);
      res.json({
        message: 'Got user',
        data: restaurant,
      });
    }).catch(err => {
      console.log('FOUND USER FAILED---->', err);
    });
  },

  createRestaurant(req, res, next) {
    restaurantDB
      .save({
        name: req.body.name,
        rating: req.body.rating,
        cuisine: req.body.cuisine,
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
      .update({
        name: req.body.name,
        rating: req.body.rating,
        cuisine: req.body.cuisine,
        img_src: 0,
        loc: 0,
        id: req.params.id,
      })
      .then(restaurant => {
        console.log('UPDATING RESTAURANT WORKED--->', restaurant);
        res.json({
          message: 'ok',
          data: user,
        });
      })
      .catch(err => {
        console.log('UPDATING RESTAURANT FAILED--->', err);
        next(err);
      });
  },

  destroyRestaurantById(req, res, next) {
    restaurantDB
      .delete(req.params.id)
      .then(() => {
        console.log('DELETING RESTAURANT WORKED');
      })
      .catch(err => {
        console.log('DELETE RESTAURANT FAILED--->', err);
        next(err);
      });
  },
};
