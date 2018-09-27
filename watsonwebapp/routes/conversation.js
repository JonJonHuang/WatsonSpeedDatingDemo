var express = require('express');
var router = express.Router();
var AssistantV1 = require('watson-developer-cloud/assistant/v1')
var watsonAssistant = new AssistantV1({
  version: '2018-09-20',
  username: '46267b81-a12c-436a-9cfc-e315fc056275',
  password: 'EKB44xNnNUUF',
  url: 'https://gateway.watsonplatform.net/assistant/api'
});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('conversation', { title: 'Conversation with Watson' });
});

router.post('/', function(req, res, next) {
  watsonAssistant.message({
    workspace_id: '9cc07323-047a-4ad5-894f-4052532d8e8a',
    input: {
      text: req.body.text
    }
  }, function(err, watson_res) {
    if (err) console.error(err);
    console.log(watson_res.output.text)
    res.send(watson_res.output.text)
  });
})

module.exports = router;
