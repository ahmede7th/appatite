const express = require('express');
const followRouter = express.Router();
const followController = require('../controllers/followController');

followRouter.route(`/add/:id`)
  .post(followController.updateFollower);

followRouter.route(`/friend/:id`)
  .get(followController.getFriendUsernameFollowers);

followRouter.route(`/friend/num/:id`)
  .get(followController.getFriendCountFollowers);

followRouter.route(`/user/:id`)
  .get(followController.getUserUsernameFollowers);

followRouter.route(`/:id`)
  .get(followController.getUserCountFollowers);

module.exports = followRouter;
