const User = require('../models/User');

// Referral business logic
async function registerUser(username, referralCode) {
  let referredByUser = null;
  if (referralCode) {
    referredByUser = await User.findOne({ referralCode });
    if (referredByUser && referredByUser.referrals.length >= 8) {
      throw new Error('Referral limit exceeded');
    }
  }
  const newUser = new User({
    username,
    referralCode: Math.random().toString(36).substring(7),
    referredBy: referredByUser ? referredByUser.referralCode : null,
    referrals: []
  });
  await newUser.save();
  if (referredByUser) {
    referredByUser.referrals.push(newUser.referralCode);
    await referredByUser.save();
  }
  return newUser;
}

module.exports = { registerUser };
