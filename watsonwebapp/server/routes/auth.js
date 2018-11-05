const express = require('express');
const router = express.Router();

const dbUtils = require('../../util/db');

router.post('/', async (req, res, next) => {
  console.log(req.session);
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
