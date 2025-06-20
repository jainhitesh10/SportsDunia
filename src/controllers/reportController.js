// Report controller logic
// ...to be implemented...

const Earning = require('../models/Earning');

async function getEarnings(req, res, next) {
  try {
    const { userId } = req.query;
    const earnings = await Earning.find({ userId });
    res.json(earnings);
  } catch (err) {
    next(err);
  }
}

module.exports = { getEarnings };
