const express = require('express');
const router = express.Router();

router.get('/', function(req, res, next) {
    // watsonAssistant.listEntities(
    //   {workspace_id: '9cc07323-047a-4ad5-894f-4052532d8e8a'},
    //   function(err, watsonRes) {
    //   }
    // );
    var groups = matcher.findMatches(['genre'], 0);
    // TEMPORARY FIX
    groups = matcher.findGenreMatches();
    res.send(groups);
  });

module.exports = router;
