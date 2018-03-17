const userDB = require('../config/connection');

module.exports = {
  save(user) {
    return userDB.one(`INSERT INTO users(fname, lname, username, password, aboutme, auth, loc)
                                        VALUES($[fname], $[lname], $[username],
                                        $[password], $[aboutme], $[auth], $[loc]) RETURNING *`, user);
  },

  checkUser(user) {
    return userDB.one(`SELECT *
                                        FROM users
                                        WHERE username = $[username]
                                        AND password = $[password]`,
                                        user);
  },

  getUsers(user) {
    return userDB.any(`SELECT *
                                            FROM users
                                            WHERE username != $[username]`, user);
  },

  update(user) {
    return userDB.one(`UPDATE users SET fname = $[fname], lname = $[lname],
                                          username=$[username], password=$[password],
                                          aboutme = $[aboutme], auth = $[auth]
                                        WHERE id=$[id] RETURNING *`, user);
  },

  destroyByUsername(user) {
    return userDB.none(`DELETE FROM users WHERE username = $1`, user.username);
  },

  findUser(user) {
    return userDB.one(`SELECT *
                                        FROM users
                                        WHERE username = $[username]`, user);
  },

  findFriendByUsername(friend) {
    return userDB.one(`SELECT *
                                        FROM users
                                        WHERE username = $1`, friend);
  },

  updateLoc(user) {
    return userDB.one(`UPDATE users SET loc = $[loc]
                                        WHERE username = $[name] RETURNING *`, user);
  },

};
