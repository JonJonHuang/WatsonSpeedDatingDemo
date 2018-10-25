const express = require('express');
const router = express.Router();

const sess = require('../server/session');
const dbUtils = require('../bin/db');

router.post('/', async (req, res, next) => {
  if (req.session.loggedIn && req.session.userEmail === req.body.email) {
    let user = await dbUtils.getUser(req.body.email);
    res.send({success: true, username: user.username});
  }
  res.send({success: false});
});

module.exports = router;
