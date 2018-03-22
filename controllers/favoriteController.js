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

  alreadyFavorites(req, res, next) {
    const like = {
      user: req.session.user.username,
      restaurant: parseInt(req.params.id),
    };
    favorites
      .alreadyFavorites(like)
      .then(doesnLike => {
        res.locals.alreadyLikes = true;
        next();
      })
      .catch(err => {
        res.locals.alreadyLikes = false;
        next();
      });
  },

  removeFavorite(req, res, next) {
    const dislike = {
      user: req.session.user.username,
      restaurant: parseInt(req.params.id),
    };
    favorites
      .removeFavorite(dislike)
      .then(workDislike => {
        next();
      })
      .catch(err => {
        next(err);
      });
  },

  getTotalFavorites(req, res, next) {
    const restaurantName = req.params.id;
    console.log(restaurantName);
    favorites
      .getTotalFavorites(restaurantName)
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

  getUserFavorites(req, res, next) {
    const favorite = { user_id: parseInt(req.headers.user) };
    favorites
    .getUserFavorites(favorite)
    .then(favorites => {
      res.json({
        message: 'ok',
        data: favorites,
      });
    }).catch(err => {
      console.log('GOT THE FAVORITES FOR USER FAILED--->', err);
    });
  },

  getUserCountFavorites(req, res, next) {
    favorites
    .getUserFavorites(req.params.id)
    .then(favorites => {
      console.log('GOT THE FAVORITES FOR RESTAURANT WORKED--->', favorites);
    }).catch(err => {
      console.log('GOT THE FAVORITES FOR RESTAURANT FAILED--->', err);
    });
  },
};
