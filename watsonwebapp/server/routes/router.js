const express = require('express');
const router = express.Router();

const loginController = require('../controllers').loginController;

router.route('/login').post((req, res, next) => {
  let success = await loginController.validateUser(req.body.email, req.body.password);
  if (success) {
    res.send('Success!');
  } else {
    res.send('Failure!');
  }
});

module.exports = router;
