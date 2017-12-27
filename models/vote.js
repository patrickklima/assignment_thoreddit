var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var VoteSchema = new Schema({
  voter: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  message: {
    type: Schema.Types.ObjectId,
    ref: 'Message'
  }
}, {
  timestamps: true,
  discriminatorKey: 'kind'
});

// var storeOrCancelVote = function(next) {
//   console.log("inside the middleware");
//   console.log("this.voter");
//   console.log(this.voter);
//   console.log("this.message");
//   console.log(this.message);
  
//   // Vote.findOneAndRemove({
//   Vote.find({
//     voter: this.voter,
//     message: this.message
//   }).then(vote => {
//     console.log(vote);
//     next();
//   });
  
// };

// VoteSchema
//   .pre('save', storeOrCancelVote)

var Vote = mongoose.model('Vote', VoteSchema);

module.exports = Vote;