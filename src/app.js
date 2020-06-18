require('dotenv/config');
const express = require('express');
require('express-async-errors'); // Patches express with async error handler!
require('./workers/sampleQueue');

const path = require('path');
const globalErrorHandler = require('./utils/globalErrorHandler');
const routes = require('./routes');
const config = require('./config');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.get('/', (req, res) => res.send({ message: `Welcome to ${config.APP_NAME} server!` }));

// Mount documentation file
app.get('/api-docs', (req, res) => res.status(200).sendFile(path.join(__dirname, '..', 'docs', 'index.html')));

app.use('/api', routes);


// Global 404 error handler
app.use((req, res, next) => {
  if (config.NODE_ENV !== 'TEST') {
    return res.status(404).send({
      status: 'fail',
      error: '404_NOT_FOUND_ERROR',
      message: 'You have entered a black hole, find your way out!',
    });
  }
});

app.use((err, req, res, next) => {
  config.logger.info('Caught');
  next(globalErrorHandler(req, res, err));
});

// In a seemingly unlikely event of unhandled Promise getting rejected,
// Here is the saviour to the server not getting crashed! However,
// this should be attended to with utmost alacrity
process.on('unhandledRejection', (error) => {
  config.logger.error('FATAL UNEXPECTED UNHANDLED REJECTION!', error.message);
  throw error;
});

module.exports = app;
