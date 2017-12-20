
// BLUEBIRD
// ----------
const bluebird = require('bluebird');

// MONGOOSE
// ----------
const mongoose = require('mongoose');
mongoose.promise = bluebird;

var models = {};
models.User = require('./user');
models.Message = require('./message');
models.Post = require('./post');
models.Comment = require('./comment');
models.Vote = require('./vote');


module.exports = models;