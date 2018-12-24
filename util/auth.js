const User = require('../models/user');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

passport.serializeUser(function (user, done) {
   done(null, user._id); 
});

passport.deserializeUser(function (id, done) {
   User.findById(id, function (err, user) {
       if (err || !user) return done(err, null);
       done(null, user);
   });
});

module.exports = function (app, options) {
  if (!options.successRedirect) {
      options.successRedirect = '/api/candidates';
  }
  if (!options.failureRedirect) {
      options.failureRedirect = '/api/candidates';
  } 
  
  return {
      init: function () {
          passport.use(new LocalStrategy(
              function (username, password, done) {
                  User.findOne({username: username}, function (err, user) {
                     if (err) { return done(err) }

                     if (!user) {
                         return done(null, false, {message: 'Incorrect username.'});
                     }

                     if (!user.validPassword(password)) {
                         return done(null, false, {message: 'Incorrect password.'});
                     }

                     return done(null, user);
                  });
              }
          ));

          app.use(passport.initialize());
          app.use(passport.session());
      },
      authorizedOnly: function () {
          return passport.authenticate('local', {failureRedirect: options.failureRedirect});
      }
  };
};