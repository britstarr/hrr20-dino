const Promise = require('bluebird');
const Models = require('../../../database/database_config');
const bcrypt = require('bcrypt');

module.exports = {
   
    //Adds a new user to the User table
  addUser: function (req, res, next) {

  //Model.User.build
    var username = req.body.username;
    var password = req.body.password;
    var password2 = req.body.password2;
      
    // if (!username || !password || !password2) {
    //   console.log('1 - Please, fill in all the fields');
    //   req.flash('error', "Please, fill in all the fields.");
    //   // res.redirect('/signup');
    // }
    
    // console.log('1a - After If statement');

    // if (password !== password2) {
    //   console.log('2 - Please,use same password!!!');

    //   req.flash('error', "Please, enter the same password twice.");
    //   // res.redirect('/signup');
    // }
    
    // console.log('2a - After If statement');

    var salt = bcrypt.genSaltSync(10);
    var hashedPassword = bcrypt.hashSync(password, salt);
    
    var newUser = {
      username: username,
      salt: salt,
      password: hashedPassword
    };
  
  Models.User.create({
    username: newUser.username,
    salt: newUser.salt,
    password: newUser.password
  })
  .then(function() {
      res.status(201).send('Successfully created a user!')
      // res.redirect('/login');
    })
    .catch(function(error) {
      req.flash("error", "Please, choose a different username.");
      // res.redirect('/signup');
    });
  },

  getAllUsers: function (req, res, next) {
    // Models.User.findAll(
    //   res.render('signup');
    // )
    // .then(function())
  },

  getAUser: function(req, res, next) {

  },

  updateAUser: function(req, res, next) {

  },

  deleteAUser: function(req, res, next) {

  }
}