const session = require('express-session');
const uuid = require('uuid/v4');

let sess = session({
  genid: (req) => {
    console.log(req.sessionID, 'sess');
    return uuid();
  },
  secret: '#C9WIN',
  resave: false,
  saveUninitialized: true,
  cookie: {}
});

if (process.env.mode === 'PROD') {
  app.set('trust proxy', 1);
  sess.cookie.secure = true;
}

module.exports = sess;
