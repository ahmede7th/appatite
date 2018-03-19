const express = require('express');
const apiRouter = express.Router();
const apiController = require('../controllers/apiController');

apiRouter
  .route(`/`)
  .post(apiController.getAllYelp);

  // favoritesRouter
  //   .route(`/`)
  //   .get(favoritesController.index)
  //   .post(favoritesController.create);
  //
  // favoritesRouter
  //   .route(`/edit/:id`)
  //   .get(favoritesController.show)
  //   .put(favoritesController.update);
  //
  // favoritesRouter
  //   .route(`/:id`)
  //   .delete(favoritesController.destroy);

module.exports = apiRouter;
