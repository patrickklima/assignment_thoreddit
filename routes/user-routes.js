var express = require('express');
var router = express.Router();
var models = require('../models');
var User = models.User;

// USERS INDEX
// ----------
router.get('/', (req, res) => {
  // console.log("getting users... \n");
  User.find()
  .then(users => {
    // console.log("users");
    // console.log(users);
    res.render('users/users-index', {users});
  });
});

// USER PROFILE PAGE
// ----------
router.get('/:username', (req, res) => {
  User
  .find({username: req.params.username})
  .then(user => {
    console.log("user");
    console.log(user);
    res.render('users/user-profile', {user: user[0]});
  });
});

// // SHOW EDIT USER PAGE
// // ----------
// router.get('/:username', (req, res) => {
//   User
//   .find({username: req.params.username})
//   .then(user => {
//     console.log("user");
//     console.log(user);
//     res.render('users/user-profile', {user: user[0]});
//   });
// });

// DELETE USER
// ----------
router.delete('/:id', (req, res) => {
  User
  .findByIdAndRemove(req.params.id)
  .then(() => {
    res.redirect('/users');
  });
});


module.exports = router;
