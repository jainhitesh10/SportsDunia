const socket = io('http://localhost:3000');

function registerSocket(userId) {
    socket.emit('registerSocket', { userId });
}

socket.on('newEarning', (earning) => {
    alert(`You have a new earning of ${earning.amount} from user ${earning.sourceUserId}`);
});

// Export the socket for use in other files if needed
export { socket, registerSocket };