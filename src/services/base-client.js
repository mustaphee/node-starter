const axios = require('axios').default;

axios.defaults.withCredentials = true;

const httpClient = axios.create({
  baseURL: URL,
  timeout: 45000,
  timeoutErrorMessage: 'Request timed out!',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json;charset=utf-8',
  },
});

httpClient.interceptors.response.use((response) => {
  const dt = new Date();
  // const cookie = response.headers['set-cookie'] ? response.headers['set-cookie'][0] : false;
  // const sessionId = cookie ? cookie.split(';')[0].split('=')[1] : false;
  // DO some magic here
  return response;
}, (error) => {
  error.devStackTrace = error.stack;
  throw error;
});
module.exports = httpClient;
