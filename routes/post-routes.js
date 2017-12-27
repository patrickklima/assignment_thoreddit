const express = require('express');
const router = express.Router();
const models = require('../models');
const Post = models.Post;
// const {Post} = require('../models');

router.get('/', (req, res) => {
  Post
  .find()
  .then(posts => {
    // console.log("posts");
    // console.log(posts);
    res.render('posts/post-index', {posts});
  });
});

router.get('/:postId', (req, res) => {
  Post
  .findById(req.params.postId)
  .populate('comments')
  .then(post => {
    console.log("post");
    if (post.comments) console.log(post.comments);
    res.render('posts/post-view', {post});
  });
});

module.exports = router;