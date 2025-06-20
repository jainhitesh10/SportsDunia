// Earning controller logic
const { distributeProfit } = require('../services/earningService');

async function purchase(req, res, next) {
  try {
    const { userId, amount } = req.body;
    await distributeProfit(userId, amount);
    res.json({ message: 'Profit distributed' });
  } catch (err) {
    next(err);
  }
}

module.exports = { purchase };
