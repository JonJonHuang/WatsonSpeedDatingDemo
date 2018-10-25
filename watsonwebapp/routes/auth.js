const express = require('express');
const router = express.Router();

const sess = require('../server/session');
const dbUtils = require('../bin/db');

router.post('/', async (req, res, next) => {
  res.send({success: req.session.loggedIn});
});

module.exports = router;
