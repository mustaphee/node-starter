/* eslint-disable no-underscore-dangle */
const mongoose = require('mongoose');

mongoose.set('useCreateIndex', true);
mongoose.set('useFindAndModify', false);

const { logger, DATABASE_URL, DB_NAME } = require('./config');

let _pool;

const moongoseConfig = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const connect = async () => mongoose.connect(
  `${DATABASE_URL + DB_NAME}`, moongoseConfig,
  (err, client) => {
    if (err) {
      logger.error('DATABASE connection failed! Exiting Now', { err });
      process.emit('SIGTERM');
      process.exit(1);
    }
    _pool = client;
    logger.info('DATABASE connected successfully!');
    return true;
  },
);

const getPool = () => _pool;

module.exports = { connect, getPool };
