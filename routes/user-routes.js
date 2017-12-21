var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
// var models = require('../models');
// var User = models.User;
var User = mongoose.model('User');


router.get('/', (req, res) => {
  console.log("getting users... \n");
  User.find()
  .then(users => {
    console.log("users");
    console.log(users);
    res.render('users/users-index', {users});
  });
});

module.exports = router;
