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
  Vote,
  UpVote,
  DownVote
} = models;

const NUM_OF_SEEDS = 5;
const MAX_COMMENT_DEPTH = 2;



var seeds = () => {
  var userSeeds = [];
  var postSeeds = [];
  var commentSeeds = [];
  var upVoteSeeds = [];
  var downVoteSeeds = [];
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
    if (commentDepth > MAX_COMMENT_DEPTH) return;
    let comments = [];
    for (let i = 0; i < NUM_OF_SEEDS; i++) {
      let newComment = new Comment({
        body: faker.lorem.sentences(),
        author: userSeeds[Math.round(Math.random() * userSeeds.length)],
        comments: _makeComments(commentDepth + 1) || [],
        score: [],
        depth: commentDepth
      });
      comments.push(newComment);
      commentSeeds.push(newComment);
    }
    return comments;
  };

  // ----------------------------------------
  // Posts
  // ----------------------------------------
  console.log('Creating Posts');
  userSeeds.forEach((user) => {
    for (let i = 0; i < NUM_OF_SEEDS; i++) {
      postSeeds.push( new Post({
        subject: faker.lorem.words(),
        body: faker.lorem.paragraph(),
        author: user,
        comments: _makeComments(1),
        score: []
        })
      );
    }
  });
  
  // ----------------------------------------
  // Votes
  // ----------------------------------------
  console.log('Creating Votes');
  userSeeds.forEach((user) => {
    for (let i = 0; i < NUM_OF_SEEDS; i++) {
      upVoteSeeds.push(new UpVote({
        voter: user,
        message: commentSeeds[
          Math.round(Math.random() * commentSeeds.length)
          ]
        })
      );
      upVoteSeeds.push(new UpVote({
        voter: user,
        message: commentSeeds[
          Math.round(Math.random() * postSeeds.length)
          ]
        })
      );
      downVoteSeeds.push( new DownVote({
        voter: user,
        message: commentSeeds[
          Math.round(Math.random() * commentSeeds.length)
          ]
        })
      );
      downVoteSeeds.push(new DownVote({
        voter: user,
        message: commentSeeds[
          Math.round(Math.random() * postSeeds.length)
          ]
        })
      );
    }
  });


  // ----------------------------------------
  // Finish
  // ----------------------------------------
  console.log('Saving...');
  const seedsArr = [
    ...userSeeds,
    ...postSeeds,
    ...commentSeeds, 
    ...upVoteSeeds, 
    ...downVoteSeeds
  ];
  const promises = seedsArr.map(seed => seed.save());
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





















