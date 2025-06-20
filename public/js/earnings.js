const socket = io();

const userIdInput = document.getElementById('userId');
const fetchBtn = document.getElementById('fetchEarnings');
const earningsList = document.getElementById('earnings');

function renderEarnings(earnings) {
  earningsList.innerHTML = '';
  earnings.forEach(earning => {
    const listItem = document.createElement('li');
    listItem.textContent = `Amount: ${earning.amount}, Source: ${earning.sourceUserId}, Level: ${earning.level}, Timestamp: ${new Date(earning.timestamp).toLocaleString()}`;
    earningsList.appendChild(listItem);
  });
}

fetchBtn.addEventListener('click', () => {
  const userId = userIdInput.value.trim();
  if (!userId) {
    alert('Please enter your User ID.');
    return;
  }

  // Register socket for real-time updates
  socket.emit('registerSocket', { userId });

  // Fetch initial earnings data
  fetch(`/earnings/${userId}`)
    .then(response => response.json())
    .then(renderEarnings);
});

// Listen for real-time earnings updates
socket.on('newEarning', earning => {
  const listItem = document.createElement('li');
  listItem.textContent = `Amount: ${earning.amount}, Source: ${earning.sourceUserId}, Level: ${earning.level}, Timestamp: ${new Date(earning.timestamp).toLocaleString()}`;
  earningsList.appendChild(listItem);
});
