// Earning mongoose schema
const mongoose = require('mongoose');

const earningSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  amount: { type: Number, required: true },
  sourceUserId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  level: { type: Number, required: true },
  timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Earning', earningSchema);
