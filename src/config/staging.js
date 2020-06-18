const logger = require('pino');

module.exports = (env) => {
  const stagingConfig = {};

  // Reassign staging properties
  Object.values(env).forEach(([key, value]) => {
    if (key.startsWith('STAGING_')) {
      // eslint-disable-next-line no-param-reassign
      key = key.slice(8, key.length);
    }
    stagingConfig[key] = value;
  });

  // Add custom staging configs
  // TODO: Stream to external server
  stagingConfig.logger = logger(); // JSON form

  return stagingConfig;
};
