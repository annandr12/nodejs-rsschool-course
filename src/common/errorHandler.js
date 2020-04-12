const { errorsLogger } = require('./logger');

const errorHandler = (err, req, res, next) => {
  if (!err) return next();
  err.message = err.message || 'Internal server error';
  err.statusCode = err.statusCode || 500;

  errorsLogger(err);
  res.status(err.statusCode).json({
    status: 'error',
    statusCode: err.statusCode,
    message: err.message
  });
};

module.exports = errorHandler;
