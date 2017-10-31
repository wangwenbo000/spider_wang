const adminBase = require('../adminBase.js');

module.exports = class extends adminBase {
  async aboutAction() {
    const data = await this.model('about').find();
    return this.success(data);
  }
  async saveAction() {
    const data = this.post();
    const id = data.id;
    delete data.id;
    const save = this.model('about').where({id: id}).update(data);
    return this.success(save);
  }
};
