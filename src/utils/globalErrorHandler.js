const fs = require('fs');
const path = require('path');
const { successResponse, errorResponse } = require('./responses');


const errorTypes = {
  400: 'Bad Request',
  401: 'You are unauthorized, please check your access credentials',
  404: '404 NOT Found: Route you\'re trying to go to does not exist!',
  422: 'Validaton failed: Invalid request data',
  500: 'Internal Server Error',
  0: 'An Unknown error occurred',
  ECONNABORTED: 'The GDS server aborted the connection!',
  ECONNRESET: 'The connection was resetted!',
  410: 'Price have changed',
};

const logToErrorFile = (data, req) => {
  const filepath = path.join(__dirname, '..', '..', 'logs', 'error-logs.txt');
  const logData = `
    Request Time: ${new Date()}
    Request Path: ${req.path}
    Request User: ${req.user || 'Guest'} \n
    Error Natural StackTrace: ${data.stack}\n
    Dev Stack Trace: ${data.devStackTrace}\n
    `;
  fs.appendFile(filepath, logData, 'utf8', (err) => {
    if (err) return 'Obara Jesus'; // In an attempt to log error, an error occured?
    // If i attempt to retry, this can be exploited by a malicious user, Till i find an
    // appropriate solution, i cover it with the Blood of Jesus!!!
    return true;
  });
};

const globalErrorHandler = (req, res, error) => {
  // console.log(error);

  const message = error.code && errorTypes[error.code] ? errorTypes[error.code] : errorTypes[0];
  error.code = error.code === 'ECONNABORTED' || error.code === 'ECONNRESET' ? 500 : error.code;
  if (error.code === 410) {
    return successResponse(res, error.code, error.message, message);
  }
  errorResponse(res, `${error.code || 500}`, error.message, message);
  logToErrorFile(error, req);
};


module.exports = globalErrorHandler;
