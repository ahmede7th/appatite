const followerDB = require('../config/connection');

module.exports = {
  addFollower(follower) {
    return followerDB.one(`INSERT INTO followers(user_id, follower_name)
                                          VALUES($[user_id], $[follower_name])
                                          RETURNING *`, follower);
  },

  removeFollower(follower) {
    return followerDB.none(`DELETE FROM followers
                                            WHERE user_id = $[user_id]
                                            AND follower_name = $[follower_name]`, follower);
  },

  getFriendCountFollowers(name) {
    return followerDB.any(`SELECT COUNT(user_id)
                                          FROM followers
                                          WHERE follower_name = $1
                                          `, name);
  },

  getUsernameFollowers(name) {
    return followerDB.any(`SELECT username
                                            FROM followers
                                            WHERE follower_name = $1
                                            `, name);
  },

  getUserCountFollowers(user) {
    return followerDB.any(`SELECT COUNT(follower_name)
                                          FROM followers
                                          WHERE user_id = $1`, user);
  },

  alreadyFollows(follower) {
    return followerDB.one(`SELECT *
                                          FROM followers
                                          WHERE user_id = $[user_id]
                                          AND follower_name = $[follower_name]`, follower);
  },
};
