const express = require('express');
const router = express.Router();
var {
  Vote,
  UpVote,
  DownVote
} = require('../models');



router.post('/:newVoteType-:messageId', (req, res) => {
  var newVoteParams = {
    voter: req.session.currentUser.id,
    message: req.params.messageId
  };
  
  // Look for a previous Vote instance for this voter and this message
  // If it exists, remove it. 
  // Access the removed instance in .then()
  Vote.findOneAndRemove(newVoteParams)
  .then(removedVote => {
    
    // If no vote was removed, continue... !removedVote == true
    // If the new vote-type and the old, removed vote-"kind" don't match:
    // save the new vote...
    // otherwise, do nothing. 
    if (!removedVote ||
        req.params.newVoteType !== removedVote.kind.toLowerCase()) {
      let newVote;
      if (req.params.newVoteType === "upvote") newVote = new UpVote(newVoteParams);
      if (req.params.newVoteType === "downvote") newVote = new DownVote(newVoteParams);
      newVote
      .save()
      .then(() => {
        res.redirect('back');
      });
    } else {
    res.end();
    }
  });
});


module.exports = router;