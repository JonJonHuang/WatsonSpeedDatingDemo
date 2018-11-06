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

var db = require('../../util/db.js');
var users = {};

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('conversation', { title: 'Conversation with Watson' });
});

router.post('/', async function(req, res, next) {
  console.log(req.body);
  let user = await db.getUser(req.body.email);
  if (!user) {
    res.send(['There was an error.'])
  }
  let input = {
    workspace_id: '9cc07323-047a-4ad5-894f-4052532d8e8a',
    input: {
      text: req.body.text
    }
  }
  if (user.context) {
    input = {...input, context: user.context};
  }
  let watsonRes = await watsonAssistant.message(input, async (err, watsonRes) => {
    if (err) console.error(err);

    res.send(watsonRes.output.text);
    db.setContext(req.body.email, watsonRes.context);
    db.addUserMessage(req.body.email, req.body.text);
  });
});

module.exports = router;
