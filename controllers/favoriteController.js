const favorites = require('../models/favoritesDB');

module.exports = {
  //add the user / restaurant to the favorite database
  updateFavorite(req, res, next) {
    const user = window.localStory.getItem();
    console.log('USER IN UPDATEFAVORITE--->', user);
    const favorite = { user: user, restaurant: req.params.id };
    favorites.alreadyFavorites(favorite).then(favorite => {
      favorites
        .updateFavorites({
          username: req.body.username,
          restaurant_name: req.body.restaurantName,
        })
        .then(favorite => {
          next();
        })
        .catch(err => {
          next(err);
        })
        .catch(err => {
          const like = {
            user: req.session.user.username,
            restaurant: parseInt(req.params.id),
          };
          favorites
            .removeFavorite(favorites)
            .then(workLike => {
              next();
            })
            .catch(err => {
              next(err);
            });
        });
    });
  },

  alreadyLikes(req, res, next) {
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

  removeLike(req, res, next) {
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

  getLikes(req, res, next) {
    const restaurantName = req.params.id;
    favorites
      .getFavorites(restaurantName)
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
};
