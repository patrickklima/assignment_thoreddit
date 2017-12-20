var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var VoteSchema = new Schema({
  isUpVote: Boolean,
  value: Number,
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
});

var Vote = mongoose.model('Vote', VoteSchema);

module.exports = Vote;