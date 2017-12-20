var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Message = require('./message');

var CommentSchema = new Schema({
  depth: Number
}, {
  timestamps: true,
  discriminatorKey: 'kind'
});

var Comment = Message.discriminator('Comment', CommentSchema);

module.exports = Comment;