const express = require('express');
const apiRouter = express.Router();
const apiController = require('../controllers/apiController');

apiRouter
  .route(`/`)
  .get(apiController.getAllYelp);

apiRouter
  .route('/reviews')
  .get(apiController.getAllYelpReviews);


module.exports = apiRouter;
