module.exports = (error, req, res, next) => {
  if (res.headersSent) return next(error);
  if (error.name === 'ValidationError') {
    return res.status(400).json({ message: 'Please check your entries.', errors: Object.values(error.errors).map(item => item.message) });
  }
  if (error.name === 'CastError') return res.status(400).json({ message: `Invalid value for ${error.path}.` });
  if (error.type === 'entity.parse.failed') return res.status(400).json({ message: 'Request body must be valid JSON.' });
  if (error.type === 'entity.too.large') return res.status(413).json({ message: 'Request is too large.' });
  console.error('Request failed:', error.name);
  res.status(500).json({ message: 'Something went wrong. Please try again.' });
};
