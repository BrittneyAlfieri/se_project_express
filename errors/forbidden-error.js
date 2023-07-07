const forbiddenError = (message) => {
  const error = new Error(message);
  error.statusCode = 403;
  return error;
};

module.exports = {
  forbiddenError,
};
