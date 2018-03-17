const express = require('express');
const reviewRouter = express.Router();
const reviewController = require('../controllers/reviewController');

reviewRouter
  .route(`/:id`)
  .get(reviewController.getAllReviewsByRestaurantName)
  .post(reviewController.createReview);

reviewRouter
  .route('/user/:id')
  .get(reviewController.getAllReviewsByUsername);

reviewRouter
  .route(`/edit/:id`)
  .get(reviewController.getOneReviewById)
  .put(reviewController.updateReviewById);

reviewRouter
  .route(`/delete/:id`)
  .delete(reviewController.deleteReviewById);

module.exports = reviewRouter;
