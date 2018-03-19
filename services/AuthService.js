const bcrypt = require('bcrypt');
const TokenService = require('./TokenService');
const User = require('../models/userDB');

function restrict() {
  return [
    (req, res, next) =>
      TokenService.verify(req.authToken)
      .then(data => {
        console.log('VERIFY SUCCEEDED IN EXPRESS--->', data);
        next();
      }).catch(next),

      (err, req, res, next) => {
        console.log('ERROR IN VERIFY--->', err);
        res.status(401).json({});
      },
  ];
}

function isLoggedIn(req, res, next) {
  console.log(req.authToken);
  TokenService.verify(req.authToken)
  .then(data => {
    console.log('SUCCESS IN ISLOGGEDIN--->', data);
    res.locals.isLoggedIn = true;
    next();
  }).catch(err => {
    console.log('FAILURE IN ISLOGGEDIN--->', err);
    res.locals.isLoggedIn = false;
    next();
  });
}

module.exports = {
  restrict,
  isLoggedIn,
};
