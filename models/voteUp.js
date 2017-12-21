var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Vote = require('./vote');

var UpVoteSchema = new Schema({
  value: {
    type: Number,
    default: 1
  }
} , {
    timestamps: true,
    discriminatorKey: 'kind'
  }
);

var UpVote = Vote.discriminator('UpVote', UpVoteSchema);

module.exports = UpVote;
