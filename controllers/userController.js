//Require the model
const userDB = require(`../models/userDB`);

module.exports = {
  getAllUsers(req, res, next) {
    console.log(`INSIDE GET ALL USERS---->`, req.params.id);
    if (!req.params.id) {
      req.params.id = 'null';
    }

    userDB
      .getAllUsers(req.params.id)
      .then(users => {
        console.log('FOUND USERS WORKED---->', users);
        res.json({
          message: 'ok',
          data: users,
        });
      })
      .catch(err => {
        console.log('FOUND USERS FAILED--->', err);
        next(err);
      });
  },

  getOneUser(req, res, next) {
    console.log(`INSIDE GETONEUSER--->`, req.params.id);
    userDB
    .getOneUser(req.params.id)
    .then(user => {
      console.log('FOUND USER WORKED---->', user);
      res.json({
        message: 'Got user',
        data: user,
      });
    }).catch(err => {
      console.log('FOUND USER FAILED---->', err);
    });
  },

  createUser(req, res, next) {
    userDB
      .save({
        fname: req.body.fname,
        lname: req.body.lname,
        username: req.body.username,
        password: req.body.password,
        about_me: req.body.aboutme,
        auth: req.body.auth,
        loc: 0,
      })
      .then(user => {
        console.log('ADDING USER WORKED--->', user);
        res.json({
          message: 'ok',
          data: user,
        });
      })
      .catch(err => {
        console.log('ADDING USER FAILED--->', err);
        next(err);
      });
  },

  updateUser(req, res, next) {
    userDB
      .update({
        fname: req.body.fname,
        lname: req.body.lname,
        username: req.body.username,
        // password: req.body.password,
        about_me: req.body.about_me,
        // auth: req.body.auth,
        // id: req.params.id,
      })
      .then(user => {
        console.log('UPDATING USER WORKED--->', user);
        res.json({
          message: 'ok',
          data: user,
        });
      })
      .catch(err => {
        console.log('UPDATING USER FAILED--->', err);
        next(err);
      });
  },

  destroyByUsername(req, res, next) {
    userDB
      .destroyByUsername(req.params.id)
      .then(() => {
        console.log('DELETING USER WORKED');
        res.json({
          message: 'ok',
        });
      })
      .catch(err => {
        console.log('DELETE USER FAILED--->', err);
        next(err);
      });
  },
};
