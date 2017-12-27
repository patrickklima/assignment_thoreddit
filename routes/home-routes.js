var express = require('express');
var router = express.Router();
var {User} = require('../models');

// HOME
// ----------
router.get('/', (req, res) => {
  res.render('home');  
});

// SHOW LOGIN PAGE
// ----------
router.get('/login', (req, res) => {
  res.render('login/login');
});

// LOG IN USER
// ----------
router.post('/login', (req, res) => {
  User.find({
    username: req.body.user.username
  }).then(user => {
    req.session.currentUser = {
      username: user.username,
      email: user.email,
      id: user._id,
      _id: user._id
    };
    res.redirect('/');
    res.end(JSON.stringify(req.session));
  });
});


// LOGOUT 
// ----------
// router.get('/logout', (req, res) => {});

router.post('/logout', (req, res) => {
  req.session = null;
  res.redirect('/');
  res.end(req.session);
});

module.exports = router;