var faker = require('faker');
var voca = require('voca');
const mongoose = require('mongoose');
const models = require('./../models');
var env = process.env.NODE_ENV || 'development';
var config = require('./../config/mongo')[env];
const mongooseeder = require('mongooseeder');

const {
  User,
  Message,
  Post,
  Comment,
  Vote
} = models;

const NUM_OF_SEEDS = 10;

var userSeeds = [];
var postSeeds = [];
var commentSeeds = [];

var seeds = () => {
  // ----------------------------------------
  // Create userSeeds
  // ----------------------------------------
  console.log('Creating Users');
  
  for (let i = 0; i < NUM_OF_SEEDS; i++) {
    var user = new User({
      username: `user${ i }`,
      email: `user${ i }@email.com`
    });
    userSeeds.push(user);
  }
  
  var _makeComments = (commentDepth) => {
    if (commentDepth < 3) return;
    let comments = [];
    for (let i = 0; i < NUM_OF_SEEDS; i++) {
      comments.push(new Comment({
        body: faker.lorem.sentences,
        author: userSeeds[Math.round(Math.random() * userSeeds.length)],
        comments: _makeComments(commentDepth + 1) || [],
        score: [],
        depth: commentDepth
        })
      );
    }
    commentSeeds.push(comments);
    return comments;
  };

  // ----------------------------------------
  // Posts
  // ----------------------------------------
  console.log('Creating Posts');
  userSeeds.forEach((user) => {
    for (let i = 0; i < NUM_OF_SEEDS; i++) {
      postSeeds.push( new Post({
        subject: faker.lorem.words,
        body: faker.lorem.paragraph,
        author: user,
        comments: _makeComments(1),
        score: []
        })
      );
    }
  });


  // ----------------------------------------
  // Finish
  // ----------------------------------------
  console.log('Saving...');
  var promises = [];
  [
    userSeeds,
    postSeeds,
    commentSeeds
  ].forEach(collection => {
    collection.forEach(model => {
      promises.push(model.save());
    });
  });
  return Promise.all(promises);
};


// Always use the MongoDB URL to allow
// easy connection in all environments
const mongodbUrl = process.env.NODE_ENV === 'production' ?
  process.env[config.use_env_variable] :
  `mongodb://${ config.host }/${ config.database }`;

mongooseeder.seed({
  mongodbUrl: mongodbUrl,
  seeds: seeds,
  clean: true,
  models: models,
  mongoose: mongoose
});


// mongooseeder.clean({
//   database: config.database,
//   host: config.host,
//   models: models,
//   mongoose: mongoose
// });





















