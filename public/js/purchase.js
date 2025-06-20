// filepath: /mlm-web-project/mlm-web-project/public/js/purchase.js
const socket = io();

// Function to handle purchase submission
async function handlePurchase(event) {
    event.preventDefault();

    const userId = document.getElementById('userId').value;
    const amount = document.getElementById('amount').value;

    const response = await fetch('/purchase', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId, amount }),
    });

    const data = await response.json();
    alert(data.message);
}

// Event listener for the purchase form
document.getElementById('purchaseForm').addEventListener('submit', handlePurchase);