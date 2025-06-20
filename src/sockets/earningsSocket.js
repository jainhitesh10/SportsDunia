const User = require('../models/User');

// Socket.IO event handlers for earnings
function registerEarningsSocket(io) {
  io.on('connection', socket => {
    socket.on('registerSocket', async ({ userId }) => {
      if (userId) {
        await User.findByIdAndUpdate(userId, { socketId: socket.id });
      }
    });
    socket.on('disconnect', async () => {
      await User.findOneAndUpdate({ socketId: socket.id }, { socketId: null });
    });
  });
}

module.exports = registerEarningsSocket;
