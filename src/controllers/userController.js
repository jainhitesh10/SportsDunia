const { registerUser } = require('../services/referralService');

// User controller logic
async function register(req, res, next) {
  try {
    const { username, referralCode } = req.body;
    const user = await registerUser(username, referralCode);
    res.json({ message: 'User registered', userId: user._id, referralCode: user.referralCode });
  } catch (err) {
    next(err);
  }
}

module.exports = { register };
