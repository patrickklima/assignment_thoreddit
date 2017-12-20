var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Message = require('./message');

var PostSchema = new Schema({
  subject: String
}, {
  timestamps: true,
  discriminatorKey: 'kind'
});

var Post = Message.discriminator('Post', PostSchema);

module.exports = Post;