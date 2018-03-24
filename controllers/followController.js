const follower = require('../models/followerDB');
const TokenService = require('../services/TokenService');

module.exports = {
  //add the user / restaurant to the follower database
  updateFollower(req, res, next) {
    const newFollow = {
      user_id: req.headers.user,
      follower_name: req.params.id,
    };
    console.log('UPDATE FOLLOWER--->', newFollow);
    follower.alreadyFollows(newFollow)
      .then(followerData => {
        console.log('UPDATE FOLLOWERS WORKED--->', followerData);
        follower
          .removeFollower(newFollow)
          .then(removeFollower => {
            console.log(
              'UPDATE FOLLOWERS REMOVE FOLLOWERS WORKED--->',
              removeFollower,
            );
            next();
          })
          .catch(err => {
            console.log('UPDATE FOLLOWERS REMOVE FOLLOWERS FAILED--->', err);
            next(err);
          });
      })
      .catch(err => {
        follower
          .addFollower(newFollow)
          .then(addFollower => {
            console.log('UPDATE FOLLOWERS ADD FOLLOWERS WORKED--->', addFollower);
            next();
          })
          .catch(err => {
            console.log('UPDATE FOLLOWERS ADD FOLLOWERS FAILED--->', err);
            next(err);
          });
      });
  },

  getUserCountFollowers(req, res, next) {
    follower
      .getUserCountFollower(req.params.id)
      .then(followers => {
        res.json({
          message: 'ok',
          data: followers,
        });
      })
      .catch(err => {
        console.log('GOT THE FOLLOWERS FOR USER FAILED--->', err);
      });
  },

  getUserUsernameFollowers(req, res, next) {
    follower
      .getUserFollowers(req.params.id)
      .then(followers => {
        console.log('GOT THE FOLLOWERS FOR USER WORKED--->', followers);
        res.json({
          message: 'ok',
          data: followers,
        });
      })
      .catch(err => {
        console.log('GOT THE FOLLOWERS FOR USER FAILED--->', err);
      });
  },

  getFriendUsernameFollowers(req, res, next) {
    follower
      .getFriendUsernameFollowers(req.params.id)
      .then(followers => {
        res.json({
          message: 'ok',
          data: followers,
        });
      })
      .catch(err => {
        console.log('GOT THE USERNAMES OF FOLLOWERS FAILED--->', err);
      });
  },

  getFriendCountFollowers(req, res, next) {
    follower
    .getFriendCountFollowers(req.params.id)
    .then(followers => {
      res.json({
        message: 'ok',
        data: followers,
      });
    })
    .catch(err => {
      console.log('GOT THE USERNAMES OF FRIENDS FOLLOWERS FAILED--->', err);
    });
  },
};
