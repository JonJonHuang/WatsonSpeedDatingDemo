const express = require('express');
const router = express.Router();

const dbUtils = require('../bin/db');

router.post('/', async (req, res, next) => {
  let success = await dbUtils.validateUser(req.body.email, req.body.password);
  if (success) {
    req.session.loggedIn = true;
  }
  res.send({success: success});
});

module.exports = router;
