// filepath: /mlm-web-project/server.js
const express = require('express');
const http = require('http');
const mongoose = require('mongoose');
const { Server } = require('socket.io');
const bodyParser = require('body-parser');
const path = require('path');

// Initialize app and server
const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/referral_system', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// User Schema
const userSchema = new mongoose.Schema({
  username: String,
  referralCode: String,
  referredBy: String,
  referrals: [String],
  socketId: String
});

// Earnings Schema
const earningSchema = new mongoose.Schema({
  userId: String,
  amount: Number,
  sourceUserId: String,
  level: Number,
  timestamp: { type: Date, default: Date.now }
});

const User = mongoose.model('User', userSchema);
const Earning = mongoose.model('Earning', earningSchema);

// Helper to distribute profit
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

    const earning = new Earning({
      userId: referrer._id,
      amount: earningAmount,
      sourceUserId: buyerId,
      level
    });

    await earning.save();

    // Notify user via Socket.IO
    if (referrer.socketId) {
      io.to(referrer.socketId).emit('newEarning', earning);
    }

    currentReferrer = referrer.referredBy;
  }
}

// User Registration
app.post('/register', async (req, res) => {
  const { username, referralCode } = req.body;
  const referredByUser = await User.findOne({ referralCode });

  if (referredByUser && referredByUser.referrals.length >= 8) {
    return res.status(400).json({ error: 'Referral limit exceeded' });
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

  res.json({ message: 'User registered', userId: newUser._id, referralCode: newUser.referralCode });
});

// Purchase Endpoint
app.post('/purchase', async (req, res) => {
  const { userId, amount } = req.body;
  await distributeProfit(userId, amount);
  res.json({ message: 'Profit distributed' });
});

// Reports
app.get('/earnings/:userId', async (req, res) => {
  const { userId } = req.params;
  const earnings = await Earning.find({ userId });
  res.json(earnings);
});

// Real-time socket handling
io.on('connection', socket => {
  socket.on('registerSocket', async ({ userId }) => {
    await User.findByIdAndUpdate(userId, { socketId: socket.id });
  });

  socket.on('disconnect', async () => {
    await User.findOneAndUpdate({ socketId: socket.id }, { socketId: null });
  });
});

// Start server
server.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
