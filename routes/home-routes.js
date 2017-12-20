var express = require('express');
var router = express.Router();

router.get('/', (req, res) => {
  if (req.session) {
    res.render('home', {username: req.session.username});
  } else {
    res.render('home');  
  }
});

router.get('/login', (req, res) => {
  res.render('login');
});

router.post('/login', (req, res) => {
  req.session.username = req.body.user.username;
  req.session.email = req.body.user.email;
  res.redirect('/');
  res.end(JSON.stringify(req.session));
});

router.get('/logout', (req, res) => {});

router.post('/logout', (req, res) => {
  req.session = null;
  res.redirect('/');
  res.end(req.session);
});

module.exports = router;