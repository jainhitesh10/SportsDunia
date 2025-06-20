// Validation helpers
// ...to be implemented...

function isValidPurchase(amount) {
  return typeof amount === 'number' && amount > 1000;
}

module.exports = { isValidPurchase };
