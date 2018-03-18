const userDB = require('../config/connection');

module.exports = {
  save(user) {
    return userDB.one(`INSERT INTO users(fname, lname, username, password, about_me, auth, loc)
                                        VALUES($[user.fname], $[user.lname], $[user.username], $[user.password],
                                        $[user.about_me], $[user.auth], $[user.loc]) RETURNING *`, user);
  },

  checkUser(user) {
    return userDB.one(`SELECT *
                                        FROM users
                                        WHERE username = $[username]
                                        AND password = $[password]`,
                                        user);
  },

  getAllUsers(user) {
    return userDB.any(`SELECT *
                                            FROM users
                                            WHERE username != $[username]`, user);
  },

  update(user) {
    return userDB.one(`UPDATE users SET fname = $[user.fname], lname = $[user.lname],
                                          username=$[user.username], password=$[user.password],
                                          about_me = $[user.about_me], auth = $[user.auth]
                                          WHERE username=$[user.username] RETURNING *`, user);
  },

  destroyByUsername(user) {
    return userDB.none(`DELETE FROM users WHERE username = $1`, user.username);
  },

  getOneUser(user) {
    return userDB.one(`SELECT *
                                        FROM users
                                        WHERE username = $1`, user);
  },

  findFriendByUsername(friend) {
    return userDB.one(`SELECT *
                                        FROM users
                                        WHERE username = $1`, friend);
  },

  updateLoc(user) {
    return userDB.one(`UPDATE users SET loc = $[loc]
                                        WHERE username = $[user.username] RETURNING *`, user);
  },

};
