const conflictError = (message) => {
  const error = new Error(message);
  error.statusCode = 409;
  return error;
};

module.exports = {
  conflictError,
};
