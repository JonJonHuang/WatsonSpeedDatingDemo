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
  console.log(req.body);
  db.getUser(req.body.email).then((user) => {
    if (user) {
      watsonAssistant.message({
        workspace_id: '9cc07323-047a-4ad5-894f-4052532d8e8a',
        input: {
          text: req.body.text
        },
      }, function(err, watsonRes) {
        if (err) console.error(err);
        user.contextId = watsonRes.context.conversation_id;
        console.log("ID", user.contextId);
        db.setContextId(req.body.email, user.contextId);
        db.addUserMessage(req.body.email, req.body.text);
        res.send(watsonRes.output.text);
      });
    } else {
      res.send(['There was an error.'])
    }
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
