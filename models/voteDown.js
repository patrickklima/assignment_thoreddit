var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Vote = require('./vote');

var DownVoteSchema = new Schema({
  value: {
    type: Number,
    default: -1
  }
}, {
  timestamps: true,
  discriminatorKey: 'kind'
});

var DownVote = Vote.discriminator('DownVote', DownVoteSchema);

module.exports = DownVote;