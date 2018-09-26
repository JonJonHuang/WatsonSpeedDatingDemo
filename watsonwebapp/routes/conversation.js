var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('conversation', { title: 'Conversation with Watson' });
});

module.exports = router;
