const express = require('express');
const router = express.Router();

const sess = require('../server/session');
const dbUtils = require('../bin/db');

router.post('/', async (req, res, next) => {
  if (!req.session.loggedIn || req.session.wsfEmail !== req.body.email) {
    res.send({success: false});
    return;
  }

  let user = await dbUtils.getUser(req.body.email);
  if (user) {
    res.send({success: true, username: user.username});
  } else {
    res.send({success: false});
  }
});

module.exports = router;
