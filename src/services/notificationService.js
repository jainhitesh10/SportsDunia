// Notification business logic
let ioInstance = null;

function setSocketIO(io) {
  ioInstance = io;
}

function notifyUser(socketId, amount, level) {
  if (ioInstance && socketId) {
    ioInstance.to(socketId).emit('earningUpdate', { amount, level });
  }
}

module.exports = { setSocketIO, notifyUser };
