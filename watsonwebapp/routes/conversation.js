var express = require('express');
var router = express.Router();

// set up wrapper for Watson Assistant
var AssistantV1 = require('watson-developer-cloud/assistant/v1')
var watsonAssistant = new AssistantV1({
  version: '2018-09-20',
  username: '46267b81-a12c-436a-9cfc-e315fc056275',
  password: 'EKB44xNnNUUF',
  url: 'https://gateway.watsonplatform.net/assistant/api'
});

var db = require('../bin/db.js');
var users = {};

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('conversation', { title: 'Conversation with Watson' });
});

router.post('/', function(req, res, next) {
  db.getUser(req.body.user).then((user) => {
    //console.log("CONTEXTID:" + user.contextId);
    watsonAssistant.message({
      workspace_id: '9cc07323-047a-4ad5-894f-4052532d8e8a',
      input: {
        text: req.body.text
      },
      context: user.contextId
    }, function(err, watsonRes) {
      if (err) console.error(err);
      console.log("2");
      db.setContextId(req.body.emailAddr, user.contextId);
      db.addUserMessage(req.body.emailAddr, req.body.text);
      console.log("3");
      res.send(watsonRes.output.text);
    });
  });
});

router.get('/get-groups', function(req, res, next) {
  // watsonAssistant.listEntities(
  //   {workspace_id: '9cc07323-047a-4ad5-894f-4052532d8e8a'},
  //   function(err, watsonRes) {
  //   }
  // );
  console.log("inside get-groups");

  var groups = matcher.findMatches(['genre'], 0);
  // TEMPORARY FIX
  groups = matcher.findGenreMatches();
  res.send(groups);
});

module.exports = router;
