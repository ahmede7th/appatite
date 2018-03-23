const express = require('express');
const followRouter = express.Router();
const followController = require('../controllers/followController');

followRouter.route(`/add/:id`)
  .post(followController.updateFollower);

followRouter.route(`/num/:id`)
  .get(followController.getUserCountFollowers);

followRouter.route(`/:id`)
  .get(followController.getUserFollowers);

module.exports = followRouter;
