const express = require('express');
const router = express.Router();

const dbUtils = require('../bin/db');

router.post('/', async (req, res, next) => {
  let success = await dbUtils.validateUser(req.body.email, req.body.password);
  let user = await dbUtils.getUser(req.body.email);
  res.send({success: success, username: user.username});
  if (success) {
    req.session.loggedIn = true;
    req.session.userEmail = req.body.email;
  }
});

module.exports = router;
