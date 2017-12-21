var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var VoteSchema = new Schema({
  voter: [{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }],
  message: [{
    type: Schema.Types.ObjectId,
    ref: 'Message'
  }]
}, {
  timestamps: true,
  discriminatorKey: 'kind'
});

var Vote = mongoose.model('Vote', VoteSchema);

module.exports = Vote;