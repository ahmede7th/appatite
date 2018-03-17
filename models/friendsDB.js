const friendDB = require('../config/connection');

module.exports = {
  areFriends(friends) {
    return friendDB.one(`SELECT user_id, friend_name
                                        FROM friends
                                        WHERE user_id = $[user_id] AND
                                        friend_id = $[friend_name]
                                        OR
                                        user_id = $[friend_name] AND
                                        friend_id = $[user_id]
                                        `, friends);
  },

  addFriend(friends) {
    return friendDB.one(`INSERT INTO friends (user_id, friend_name)
                                        VALUES ($[username], $[friendname]) RETURNING *`, friends);
  },

  getFriends(user) {
    return friendDB.any(`SELECT friend_name
                                        FROM friends
                                        WHERE user_id = $[username]
                                        `, user);
  },
};
