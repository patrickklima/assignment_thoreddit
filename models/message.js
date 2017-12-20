var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var MessageSchema = new Schema({
  body: String,
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  comments: [{
    type: Schema.Types.ObjectId,
    ref: 'Comment'
  }], 
  score: [{
    type: Schema.Types.ObjectId,
    ref: 'Vote'
  }]
}, {
  timestamps: true,
  discriminatorKey: 'kind'
});

var Message = mongoose.model('Message', MessageSchema);

module.exports = Message;