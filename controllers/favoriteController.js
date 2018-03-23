const favorites = require('../models/favoritesDB');
const TokenService = require('../services/TokenService');

module.exports = {
  //add the user / restaurant to the favorite database
  updateFavorite(req, res, next) {
    const favorite = { user_id: parseInt(req.headers.user), restaurant_name: req.params.id };
    favorites.alreadyFavorites(favorite)
    .then(favorite => {
      console.log('UPDATE FAVORITE WORKED--->', favorite);
      favorites
        .removeFavorite(favorite)
        .then(favorite => {
          console.log('UPDATE FAVORITE REMOVE FAVORITE WORKED--->', favorite);
          next();
        })
        .catch(err => {
          console.log('UPDATE FAVORITE REMOVE FAVORITE FAILED--->', err);
          next(err);
        });
      })
      .catch(err => {
        favorites
        .addFavorite(favorite)
          .then(favorite => {
            console.log('UPDATE FAVORITE ADD FAVORITE WORKED--->', favorite);
            next();
          })
          .catch(err => {
            console.log('UPDATE FAVORITE ADD FAVORITE FAILED--->', err);
            next(err);
          });
      });
  },

  getTotalFavorites(req, res, next) {
    const restaurantName = req.params.id;
    console.log(restaurantName);
    favorites
      .getRestaurantCountFavorites(restaurantName)
      .then(totalFavorites => {
        console.log('GETTING TOTAL FAVORITES WORKED--->', totalFavorites);
        res.json({
          message: 'ok',
          data: totalFavorites,
        });
        next();
      })
      .catch(err => {
        console.log('GETTING TOTAL FAVORITES FAILED--->', err);
        next(err);
      });
  },

  getUserCountFavorites(req, res, next) {
    favorites
    .getUserCountFavorites(req.params.id)
    .then(favorites => {
      res.json({
        message: 'ok',
        data: favorites,
      });
    }).catch(err => {
      console.log('GOT THE FAVORITES FOR USER FAILED--->', err);
    });
  },

  getUserRestaurantFavorites(req, res, next) {
    favorites
    .getUserRestaurantFavorites(req.params.id)
    .then(favorites => {
      console.log('GOT THE FAVORITES FOR USER WORKED--->', favorites);
      res.json({
        message: 'ok',
        data: favorites,
      });
    }).catch(err => {
      console.log('GOT THE FAVORITES FOR USER FAILED--->', err);
    });
  },

  getRestaurantCountFavorites(req, res, next) {
    favorites
    .getRestaurantCountFavorites(req.params.id)
    .then(favorites => {
      res.json({
        message: 'ok',
        data: favorites,
      });
    }).catch(err => {
      console.log('GOT THE FAVORITES FOR RESTAURANT FAILED--->', err);
    });
  },

  getRestaurantUserFavorites(req, res, next) {
    favorites
    .getRestaurantUserFavorites(req.params.id)
    .then(favorites => {
      console.log('GOT THE FAVORITES FOR RESTAURANT WORKED--->', favorites);
      res.json({
        message: 'ok',
        data: favorites,
      });
    }).catch(err => {
      console.log('GOT THE FAVORITES FOR RESTAURANT FAILED--->', err);
    });
  },
};
