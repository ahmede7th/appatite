const favorites = require('../models/favoritesDB');

module.exports = {

  /*
      HAVE TO FIGURE OUT HOW TO STORE CURRENT USER BEFORE
      IMPLEMENTING FAVORITING
  */

//add the user / restaurant to the like database
  // updateFavorite(req, res, next) {
  //   if (!res.locals.alreadyLikes) {
  //     const favorite = { 'writer': res.locals.friendUser, 'friend': req.session.user.username, 'post': parseInt(req.params.id) };
  //     favorites.updateFavorites({
  //       username: req.body.username,
  //       restaurant_name: req.body.restaurantName
  //     })
  //     .then(favorite => {
  //       next();
  //     })
  //     .catch(err => {
  //       next(err);
  //     });
  //   } else {
  //     const like = { 'friend': req.session.user.username, 'post': parseInt(req.params.id) };
  //     favorites.removeFavorite(favorites)
  //     .then(workLike => {
  //       next();
  //     })
  //     .catch(err => {
  //       next(err);
  //     });
  //   }
  // },
  //
  // alreadyLikes(req, res, next) {
  //   const like = { 'friend': req.session.user.username, 'post': parseInt(req.params.id) };
  //   likes.alreadyLikes(like)
  //   .then(doesnLike => {
  //     res.locals.alreadyLikes = true;
  //     next();
  //   })
  //   .catch(err => {
  //     res.locals.alreadyLikes = false;
  //     next();
  //   });
  // },

  // removeLike(req, res, next) {
  //   const dislike = { 'friend': req.session.user.username, 'post': parseInt(req.params.id) };
  //   likes.removeLike(dislike)
  //   .then(workDislike => {
  //     next();
  //   })
  //   .catch(err => {
  //     next(err);
  //   });
  // },

  getLikes(req, res, next) {
    const restaurantName = req.params.id;
    likes.getLikes(restaurantName)
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
