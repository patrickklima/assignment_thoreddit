var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
  username: String,
  email: String,
  posts: [{
    type: Schema.Types.ObjectId,
    ref: 'Post'
  }],
  comments: [{
    type: Schema.Types.ObjectId,
    ref: 'Comment'
  }]
}, {
  timestamps: true,
  discriminatorKey: 'kind'
});

var User = mongoose.model('User', UserSchema);

module.exports = User;