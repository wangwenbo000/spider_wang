const path = require('path');
const trace = require('think-trace');
const isDev = think.env === 'development';

module.exports = [
  {
    handle: 'meta',
    options: {
      logRequest: isDev,
      sendResponseTime: isDev
    }
  },
  {
    handle: 'resource',
    enable: isDev,
    options: {
      root: path.join(think.ROOT_PATH, 'www'),
      publicPath: /^\/(static|favicon\.ico)/
    }
  },
  {
    handle: trace,
    enable: !think.isCli,
    options: {
      debug: isDev,
      templates: {
        404: path.join(__dirname, '../../view/index_index.html')
      }
      // error(err, ctx) {
      //   console.log('aaaaa' + __dirname);
      //   return console.error(err);
      // }
    }
  },
  {
    handle: 'payload',
    options: {}
  },
  {
    handle: 'router',
    options: {}
  },
  'logic',
  'controller'
];
