const BeeQueue = require('bee-queue');
const REDIS_URL = require('../config');

const signOutQueue = new BeeQueue('SAMPLE_QUEUE', { redis_url: REDIS_URL });

signOutQueue.process((job) => {
  const jobData = job.data;
  // Do some magic here
  done();
});
