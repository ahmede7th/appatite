const express = require('express');
const apiRouter = express.Router();
const apiController = require('../controllers/apiController');

apiRouter
  .route(`/`)
  .post(apiController.getAllYelp);

  apiRouter
  .route('/')

module.exports = apiRouter;
