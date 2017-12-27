var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Message = require('./message');

var CommentSchema = new Schema({
  depth: Number
}, {
  timestamps: true,
  discriminatorKey: 'kind'
});

var autoPopulateComment = function(next) {
  this.populate('comments');
  next();
};

CommentSchema
  .pre('findOne', autoPopulateComment)
  .pre('find', autoPopulateComment);

var Comment = Message.discriminator('Comment', CommentSchema);

module.exports = Comment;