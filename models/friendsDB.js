const friendDB = require('../config/connection');

module.exports = {
  areFriends(friends) {
    return friendDB.one(`SELECT user_id, friend_id
                                        FROM friends
                                        WHERE user_id = $[user_id] AND
                                        friend_id = $[friend_id]
                                        OR
                                        user_id = $[friend_id] AND
                                        friend_id = $[user_id]
                                        `, friends);
  },

  addFriend(friends) {
    return friendDB.one(`INSERT INTO friends (user_id, friend_id)
                                        VALUES ($[username], $[friendname]) RETURNING *`, friends);
  },

  inFriendDatabase(friends) {
    return friendDB.one(`SELECT user_id, friend_id
                                        FROM friends
                                        WHERE user_id = $[user_id] AND
                                        friend_id = $[friend_id]
                                        OR
                                        user_id = $[friend_id] AND
                                        friend_id = $[user_id]
                                        `,  friends);
  },

  getFriends(user) {
    return friendDB.any(`SELECT friend_id
                                        FROM friends
                                        WHERE user_id = $[username]
                                        `, user);
  },
};
