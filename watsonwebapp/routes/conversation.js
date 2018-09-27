var express = require('express');
var router = express.Router();
var AssistantV1 = require('watson-developer-cloud/assistant/v1')
var watsonAssistant = new AssistantV1({
  version: '2018-09-20',
  username: '46267b81-a12c-436a-9cfc-e315fc056275',
  password: 'EKB44xNnNUUF',
  url: 'https://gateway.watsonplatform.net/assistant/api'
});

var users = {};
var UserMatcher = require('../bin/matcher.js');
var matcher = new UserMatcher();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('conversation', { title: 'Conversation with Watson' });
});

router.post('/', function(req, res, next) {
  if (!users.hasOwnProperty(req.body.user)) {
    matcher.addUser(req.body.user);
    users[req.body.user] = {context: null};
    var context = null;
  } else {
    var context = users[req.body.user].context;
  }
  watsonAssistant.message({
    workspace_id: '9cc07323-047a-4ad5-894f-4052532d8e8a',
    input: {
      text: req.body.text
    },
    context: context
  }, function(err, watsonRes) {
    if (err) console.error(err);
    for (let e of watsonRes.entities) {
      matcher.addInterest(req.body.user, e.entity, e.value);
    }
    users[req.body.user].context = watsonRes.context;
    res.send(watsonRes.output.text);
  });
});

router.get('/get-groups', function(req, res, next) {
  // watsonAssistant.listEntities(
  //   {workspace_id: '9cc07323-047a-4ad5-894f-4052532d8e8a'},
  //   function(err, watsonRes) {
  //   }
  // );
  var groups = matcher.findMatches(['genre'], 0);
  res.send(groups);
});

module.exports = router;
