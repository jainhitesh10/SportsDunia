// User mongoose schema
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  referralCode: { type: String, unique: true },
  referredBy: { type: String, default: null },
  referrals: { type: [String], default: [] }, // array of referral codes
  socketId: { type: String, default: null },
  isActive: { type: Boolean, default: true }
});

module.exports = mongoose.model('User', userSchema);
