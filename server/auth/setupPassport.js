var passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy,
    bcrypt = require('bcrypt'),
    Model = require('../../database/database_config');


module.exports = function(app) {
  app.use(passport.initialize())
  app.use(passport.session())

  passport.use(new LocalStrategy(
    function(username, password, done) {

      console.log('in setupPassport.js, LocalStrategy Line 14, function args: username:' + username);

      Model.User.findOne({
        where: {
          username: username
        }
      }).then(function (user) {
        if (user === null) {

          console.log('in setupPassport.js, user doesnt exist');

          return done(null, false, { message: 'Incorrect credentials.' })
        }

        var hashedPassword = bcrypt.hashSync(password, user.salt)

        if (user.password === hashedPassword) {

          console.log('in setupPassport.js, user credential check out, returning done(null, user), where user = ', JSON.stringify(user, null, 2));

          return done(null, user)
        }

        console.log('in setupPassport.js, password is wrong');

        return done(null, false, { message: 'Incorrect credentials.' })
      })
    }
  ))

  passport.serializeUser(function(user, done) {
    done(null, user.id)
  })

  passport.deserializeUser(function(id, done) {
    Model.User.findOne({
      where: {
        'id': id
      }
    }).then(function (user) {
      if (user == null) {
        done(new Error('Wrong user id.'))
      }

      done(null, user)
    })
  })
}
