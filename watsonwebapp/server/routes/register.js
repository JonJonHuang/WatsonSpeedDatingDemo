const express = require('express');
const router = express.Router();

const dbUtils = require('../../util/db');

router.post('/', async (req, res, next) => {
  let success = await dbUtils.registerUser(req.body.email, req.body.username, req.body.password);
  res.send({success: success});
});

module.exports = router;
