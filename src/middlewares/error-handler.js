module.exports = (err, res) => {
  const { statusCode = 500, message = 'Internal server error' } = err;
  res.status(statusCode).json({
    status: 'error',
    statusCode,
    message,
  });
};
