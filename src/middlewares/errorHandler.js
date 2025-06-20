// Error handling middleware

function errorHandler(err, req, res, next) {
  console.error(err);
  res.status(400).json({ error: err.message || 'An error occurred' });
}

module.exports = errorHandler;
