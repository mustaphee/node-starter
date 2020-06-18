const logger = require('pino');
// const pinoElastic = require('pino-elastic');

const { env } = process;

// const streamToElastic = pinoElastic({
//   index(logTime) {
//     // the logTime is a ISO 8601 formatted string of the log line
//     return `${env.APP_NAME}-${logTime.substring(5, 10)}`;
//   },
//   type: 'log',
//   consistency: 'one',
//   node: env.ELASTICSEARCH_URI,
//   'es-version': env.ELASTICSEARCH_VERSION,
//   'bulk-size': 200,
//   ecs: true,
// });

module.exports = () => {
  const prodConfig = {};

  // Reassign production properties
  Object.values(env).forEach(([key, value]) => {
    if (key.startsWith('PROD_')) {
      // eslint-disable-next-line no-param-reassign
      key = key.slice(5, key.length);
    }
    prodConfig[key] = value;
  });

  // Add custom production configs

  // prodConfig.logger = logger(streamToElastic);
  prodConfig.logger = logger();

  return prodConfig;
};
