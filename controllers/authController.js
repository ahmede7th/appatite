const authRouter = require('express').Router();
const userDB = require('../models/userDB');
const TokenService = require('../services/TokenService');
const bcrypt = require('bcrypt');

module.exports = {
  createNewUser(req, res, next) {
    const user = req.body;
    if (!user.auth) {
      user.auth = 1;
    }

    if (!user.loc) {
      user.loc = 0;
    }

    user.password = bcrypt.hashSync(user.password, 10);
    userDB.save(user)
    .then(data => {
      const { password, ...userData } = data;
      res.locals.user = userData;
      const tokenData = {
        username: userData.username,
      };
      TokenService.makeToken(tokenData)
      .then(token => {
        console.log('THIS IS THE TOKEN--->', token);
        res.locals.token = token;
        next();
      }).catch(next);
    }).catch(err => {
      console.log('USER CREATE FAILED--->', err);
      next();
    });
  },

  login(req, res, next) {
    const user = req.body;
    userDB.getOneUser(user.username)
    .then(userData => {
      const isAuthed = bcrypt.compareSync(user.password, userData.password);
      if (!isAuthed) {
        next();
      }

      res.locals.user = userData;

      const data = {
        username: userData.username,
      };

      TokenService.makeToken(data)
      .then(token => {
        res.locals.token = token;
        next();
      });
    }).catch(err => {
      next();
    });
  },
};
