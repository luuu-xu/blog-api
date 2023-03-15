const passport = require('passport');
const jwt = require('jsonwebtoken');

// Authenticate the user login using Passport and JWT.
exports.auth_login_post = (req, res) => {
  let { username, password } = req.body;
  if (username === process.env.ADMIN_USERNAME 
    && password === process.env.ADMIN_PASSWORD) {
    const token = jwt.sign({ username }, process.env.JWT_SECRET);
    res.status(200).json({
      message: 'Auth passed',
      token,
    });
  } else {
    res.status(401).json({
      error: 'Auth failed',
    });
  }
}

exports.protected_get = [
  // Authenticate the token with jwt stratege.
  passport.authenticate('jwt', {session: false}),

  (req, res) => {
    return res.status(200).json({
      message: 'Yes you are verified',
    });
  }
];