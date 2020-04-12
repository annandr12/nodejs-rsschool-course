const path = require('path');
const fs = require('fs');
const LOG_DIR = 'logs';
const winston = require('winston');

const dir = path.join(LOG_DIR);

// eslint-disable-next-line no-sync
if (!fs.existsSync(dir)) {
  // eslint-disable-next-line no-sync
  fs.mkdirSync(dir);
}

const logger = winston.createLogger({
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: path.join(dir, 'app_log.log') })
  ]
});

const requestsLogger = (req, res, next) => {
  logger.log({
    level: 'info',
    message: `originalUrl: ${req.originalUrl} query: ${JSON.stringify(
      req.query
    )} body: ${JSON.stringify(req.body)}`
  });
  next();
};

const errorsLogger = err => {
  const message = err.message || 'Internal server error';
  const statusCode = err.statusCode || 500;
  logger.error(`${statusCode}, ${message}`);
};

module.exports = {
  requestsLogger,
  errorsLogger
};
