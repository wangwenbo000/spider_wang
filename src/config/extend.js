const view = require('think-view');
const model = require('think-model');
const session = require('think-session');
module.exports = [
  view, // make application support view
  session,
  model(think.app)
];
