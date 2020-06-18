const logger = require('pino');

const { env } = process;


module.exports = () => {
  const devConfig = {};
  // Reassign development properties
  Object.entries(env).forEach(([key, value]) => {
    if (key.startsWith('DEV_')) {
      // eslint-disable-next-line no-param-reassign
      key = key.slice(4, key.length);
    }
    devConfig[key] = value;
  });

  // Add custom development configs
  devConfig.logger = logger({ prettyPrint: { colorize: true } });
  return devConfig;
};
