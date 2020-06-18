const redis = require('redis');
const config = require('../config');

const redisClient = redis.createClient(config.REDIS_URL);

// TODO: Create Client Pool class

// redisClient.subscribe('__keyevent@0__:expired');
// redisClient.on('message', (channel, message) => {
//   // sessionHandler(channel, message);
// });
module.exports = redisClient;
