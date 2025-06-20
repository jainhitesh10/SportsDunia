// server.js
const http = require('http');
const { Server } = require('socket.io');
const app = require('./src/app');
const registerEarningsSocket = require('./src/sockets/earningsSocket');
const { setSocketIO } = require('./src/services/notificationService');

const server = http.createServer(app);
const io = new Server(server, { cors: { origin: '*' } });

// Set up notification service with Socket.IO
setSocketIO(io);

// Register socket handlers
registerEarningsSocket(io);

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
