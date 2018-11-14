const express = require('express');
const router = express.Router();

const dbUtils = require('../../util/db');

const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

router.post('/', async (req, res, next) => {
  if (!emailRegex.test(req.body.email)) {
    // User failed to provide a legal email address
    res.send({success: false, error: 'User provided an invalid email address.'});
    return;
  }
  let success = await dbUtils.registerUser(req.body.email, req.body.username, req.body.password);
  res.send({success: success});
});

module.exports = router;
