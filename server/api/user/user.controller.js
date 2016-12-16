const Promise = require('bluebird');
const Models = require('../../../database/database_config');
const bcrypt = require('bcrypt');

module.exports = {

    //Adds a new user to the User table
  addUser: function (req, res, next) {
  console.log('inside addUser in user.controller, req.body = ' + JSON.stringify(req.body, null, 2));

    //Model.User.build
   var username = req.body.username;
   var password = req.body.password;
   var password2 = req.body.password2;

  if (!username || !password || !password2) {
    req.flash('error', "Please, fill in all the fields.");
    res.redirect('signup');
  }

  if (password !== password2) {
    req.flash('error', "Please, enter the same password twice.");
    res.redirect('signup');
  }

  var salt = bcrypt.genSaltSync(10);
  console.log('THIS IS SALT', salt);
  var hashedPassword = bcrypt.hashSync(password, salt);

  var newUser = {
    username: username,
    salt: salt,
    password: hashedPassword
  };

  Models.User.create({newUser}).then(function() {
      res.redirect('/');
    })
    .catch(function(error) {
      req.flash("error", "Please, choose a different username.");
      res.redirect('/routines');
    });
  },

  // getAllUsers: function (req, res, next) {
  //   Models.User.findAll(
  //     res.render('signup');
  //   )
  //   .then(function())
  // },

  getAUser: function(req, res, next) {

  },

  updateAUser: function(req, res, next) {

  },

  deleteAUser: function(req, res, next) {

  }
}