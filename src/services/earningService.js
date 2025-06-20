// Earning business logic
const User = require('../models/User');
const Earning = require('../models/Earning');
const { notifyUser } = require('./notificationService');

async function distributeProfit(buyerId, purchaseAmount) {
  if (purchaseAmount <= 1000) return;
  const buyer = await User.findById(buyerId);
  if (!buyer) return;
  let currentReferrer = buyer.referredBy;
  for (let level = 1; level <= 2 && currentReferrer; level++) {
    const referrer = await User.findOne({ referralCode: currentReferrer });
    if (!referrer) break;
    const percentage = level === 1 ? 0.05 : 0.01;
    const earningAmount = purchaseAmount * percentage;
    await Earning.create({
      userId: referrer._id,
      amount: earningAmount,
      sourceUserId: buyer._id,
      level
    });
    notifyUser(referrer.socketId, earningAmount, level);
    currentReferrer = referrer.referredBy;
  }
}

module.exports = { distributeProfit };
