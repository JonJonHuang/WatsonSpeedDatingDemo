const express = require('express');
const router = express.Router();

const dbUtils = require('../../util/db');

const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/

router.post('/', async (req, res, next) => {
  let success = await dbUtils.registerUser(req.body.email, req.body.username, req.body.password);
  res.send({success: success});
});

module.exports = router;
