const express = require('express');
const reviewRouter = express.Router();
const reviewController = require('../controllers/reviewController');

reviewRouter
  .route(`/`)
  .get(reviewController.getAllReviewsByRestaurantName)
  .post(reviewController.createReview);

reviewRouter
  .route(`/edit/:id`)
  .get(reviewController.getOneReviewById)
  .put(reviewController.updateReviewById);

reviewRouter
  .route(`/:id`)
  .delete(reviewController.deleteReviewById);

module.exports = reviewRouter;
