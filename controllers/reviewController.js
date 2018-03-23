//Require the model
const reviewDB = require(`../models/reviewDB`);

module.exports = {
  getAllReviewsByRestaurantName(req, res, next) {
    console.log(`INSIDE GET ALL REVIEWS BY RESTAURANT NAME---->`, req.params);
    reviewDB
      .getAllReviewsByRestaurantName(req.params.id)
      .then(restaurantReviews => {
        console.log('FOUND RESTAURANT REVIEWS WORKED---->', restaurantReviews);
        res.json({
          message: 'ok',
          data: restaurantReviews,
        });
      })
      .catch(err => {
        console.log('FOUND RESTAURANT REVIEWS FAILED--->', err);
        next(err);
      });
  },

  getAllReviewsByUsername(req, res, next) {
    console.log(`INSIDE GET ALL REVIEWS BY USER NAME---->`, req.params);
    reviewDB
      .getAllReviewsByUsername(req.params.id)
      .then(userReviews => {
        console.log('FOUND USER REVIEWS WORKED---->', userReviews);
        res.json({
          message: 'ok',
          data: userReviews,
        });
      })
      .catch(err => {
        console.log('FOUND USER REVIEWS FAILED--->', err);
        next(err);
      });
  },

  getOneReviewById(req, res, next) {
    console.log(`INSIDE GET ONE REVIEW--->`, req.params.id);
    reviewDB
    .getReviewById(req.params.id)
    .then(review => {
      console.log('FOUND REVIEW WORKED---->', review);
      res.json({
        message: 'ok',
        data: review,
      });
    }).catch(err => {
      console.log('FOUND REVIEW FAILED---->', err);
    });
  },

  createReview(req, res, next) {
    reviewDB
      .addReview({
        user_id: req.body.user_id,
        restaurant_id: req.params.id,
        content: req.body.content,
      })
      .then(review => {
        console.log('ADDING REVIEW WORKED--->', review);
        res.json({
          message: 'ok',
          data: review,
        });
      })
      .catch(err => {
        console.log('ADDING REVIEW FAILED--->', err);
        next(err);
      });
  },

  updateReviewById(req, res, next) {
    reviewDB
      .editReview({
        //user_id: req.body.username,
        //restaurant_name: req.body.restaurantName,
        content: req.body.content,
        id: req.body.id,
      })
      .then(review => {
        console.log('UPDATING REVIEW WORKED--->', review);
        res.json({
          message: 'ok',
          data: review,
        });
      })
      .catch(err => {
        console.log('UPDATING REVIEW FAILED--->', err);
        next(err);
      });
  },

  deleteReviewById(req, res, next) {
    reviewDB
      .deleteReview(req.params.id)
      .then(() => {
        console.log('DELETING REVIEW WORKED');
        res.json({
          message: 'deleted review',
        });
      })
      .catch(err => {
        console.log('DELETE REVIEW FAILED--->', err);
        next(err);
      });
  },
};
