const adminBase = require('./adminBase.js');

module.exports = class extends adminBase {
  async indexAction() {
    await this.display();
  }
};
