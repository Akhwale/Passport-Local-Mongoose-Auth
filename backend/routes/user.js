const router = require("express").Router();
const bcrypt = require("bcrypt");
const passport = require('passport');

let User = require("../models/user.model");

// Registration route
router.post('/register', (req, res) => {
  const { username, password } = req.body;
  User.register(new User({ username }), password, (err, user) => {
    if (err) {
      console.error(err);
      return res.status(400).json({ error: 'Registration failed' });
    }
    passport.authenticate('local')(req, res, () => {
      res.status(200).json({ success: 'Registration successful' });
    });
  });
});

// Login route
router.post('/login', passport.authenticate('local'), (req, res) => {
  // If the middleware reaches this point, the user is authenticated
  res.status(200).json({ username: req.user.username });
});


// router.get('/logout', (req, res) => {
//   req.logout();
//   // res.status(200).json({"message":"logged out successfull!"}) // Logs the user out and removes the user's session
//   res.redirect('/login'); // Redirect the user to the home page or a different route
// });

router.get('/logout', (req, res) => {
  req.logout(function(err) {
    if (err) {
      // Handle any potential errors during logout, e.g., log the error
      console.error('Logout error:', err);
      return res.status(500).json({ error: 'An error occurred during logout.' });
    }

    // Successful logout; you can redirect to the home page or another route
    res.status(200).json({"messsage":"logout successful"});
  });
});






// router.get('/logout', (req, res) => {
//   req.logout((err) => {
//     if (err) {
//       // Handle any errors that occur during logout
//       console.error('Logout failed:', err);
//       res.status(500).json({ message: 'Logout failed', error: err });
//     } else {
//       // The user is successfully logged out, and the session is cleared
//       res.status(200).json({ message: 'Logout successful' });
//     }
//   });
// });
  
 
module.exports = router;
