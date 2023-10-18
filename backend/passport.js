const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('./models/user.model'); // Import your User model

passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


// passport.serializeUser(function(user, done) {
//     done(null, user.id);
//   });
  
//   passport.deserializeUser(function(id, done) {
//     // Fetch user from the database based on the id
//     User.findById(id, function(err, user) {
//       done(err, user);
//     });
//   });
  

module.exports = passport;
