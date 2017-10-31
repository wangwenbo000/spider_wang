const adminBase = require('../adminBase.js');

module.exports = class extends adminBase {
  async scaleAction() {
    const data = await this.model('scalelist').find();
    return this.success(data);
  }
  async saveAction() {
    const data = this.post();
    const id = data.id;
    delete data.id;
    const save = this.model('scalelist').where({id: id}).update(data);
    return this.success(save);
  }
};
