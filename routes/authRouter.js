const express = require('express');
const authRouter = express.Router();
const authController = require('../controllers/authController');
const TokenService = require('../services/TokenService');

authRouter.get('/', (req, res) => {
  res.json({ user: 'it worked!' });
});

authRouter.post('/', authController.createNewUser, (req, res) => {
  console.log('IT WORKED!');
  res.json({ token: res.locals.token, user: res.locals.user });
});

authRouter.post('/login', authController.login, (req, res) => {
  console.log(res.locals.user);
  if (!res.locals.user) {
    res.status(401).json({ err: 'Login Failed' });
  } else {
    const { password, ...user } = res.locals.user;
    res.json({ token: res.locals.token, user });
  }
});

module.exports = authRouter;
