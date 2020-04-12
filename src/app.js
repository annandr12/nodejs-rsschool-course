const express = require('express');
const swaggerUI = require('swagger-ui-express');
const path = require('path');
const YAML = require('yamljs');
const userRouter = require('./resources/users/user.router');
const boardRouter = require('./resources/boards/board.router');
const taskRouter = require('./resources/tasks/task.router');
const { errorsLogger, requestsLogger } = require('./common/logger');

const app = express();
const swaggerDocument = YAML.load(path.join(__dirname, '../doc/api.yaml'));

process
  .on('unhandledRejection', reason => {
    reason.statusCode = 500;
    reason.message = `Unhandled Rejection at Promise: ${reason.message}`;
    errorsLogger(reason);
  })
  .on('uncaughtException', err => {
    err.statusCode = 500;
    err.message = `Uncaught Exception: ${err.message}`;
    errorsLogger(err);
    // eslint-disable-next-line no-process-exit
    process.exit(1);
  });

app.use(express.json());

app.use('/doc', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

app.use('/', (req, res, next) => {
  if (req.originalUrl === '/') {
    res.send('Service is running!');
    return;
  }
  next();
});

app.use(requestsLogger);

app.use('/users', userRouter);
app.use('/boards', boardRouter);
app.use('/boards', taskRouter);

app.use((err, req, res) => {
  err.message = err.message || 'Internal server error';
  err.statusCode = err.statusCode || 500;
  errorsLogger(err);
  res.status(err.statusCode).json({
    status: 'error',
    statusCode: err.statusCode,
    message: err.message
  });
});

module.exports = app;
