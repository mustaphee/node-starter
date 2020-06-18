const { logger } = require('../config');


function errorResponse(res, statusCode, error, message = 'An error occurred', status = 'fail') {
  const responseObject = {
    status,
    error,
    message,
  };
  logger.error(message);
  return res.status(statusCode).send(responseObject);
}


function successResponse(res, statusCode, data = [], message, status = 'success') {
  const responseObject = {
    status,
    data,
    message,
  };
  logger.info(message);
  return res.status(statusCode).send(responseObject);
}


module.exports = {
  errorResponse,
  successResponse,
};
