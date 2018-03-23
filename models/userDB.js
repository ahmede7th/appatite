const userDB = require('../config/connection');
const bcrypt = require('bcrypt');
const TokenService = require('../services/TokenService');

module.exports = {
  save(user) {
    return userDB.one(`INSERT INTO users(fname, lname, username, password, about_me, auth, loc)
                                        VALUES($[fname], $[lname], $[username], $[password],
                                        $[about_me], $[auth], $[loc]) RETURNING *`, user);
  },

  checkUser(user) {
    return userDB.one(`SELECT *
                                        FROM users
                                        WHERE username = $[username]
                                        AND password = $[password]`,
                                        user);
  },

  getAllUsers() {
    return userDB.any(`SELECT * FROM users`);
  },

  // getAllUsers(username) {
  //   return userDB.any(`SELECT *
  //                                           FROM users
  //                                           WHERE username != $[username]`, username);
  // },

  update(user) {
    return userDB.one(`UPDATE users SET fname = $[fname], lname = $[lname], 
                                          about_me = $[about_me]
                                          WHERE username=$[username] RETURNING *`, user);
  },

  destroyByUsername(username) {
    return userDB.none(`DELETE FROM users WHERE username = $1`, username);
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
