const devConfig = require('./development');
const stagingConfig = require('./staging');
// const productionConfig = require('./production');

let config;
switch (process.env.NODE_ENV) {
  case 'DEVELOPMENT':
    config = devConfig();
    break;
    // case 'TEST':
    //   config = testConfig(env);
    //   break;
  case 'STAGING':
    config = stagingConfig();
    break;
    // case 'PRODUCTION':
    //   config = prodConfig();
    //   break;
  default:
    config = devConfig();
}

module.exports = config;
