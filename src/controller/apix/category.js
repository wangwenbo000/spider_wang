const adminBase = require('../adminBase.js');

module.exports = class extends adminBase {
  async addAction() {
    const data = this.post();
    const add = await this.model('article_category').add(data);
    return this.success(add);
  }
  async updateAction() {
    const data = this.post();
    const update = await this.model('article_category').where({id: data.id}).update(data);
    return this.success(update);
  }
  async deleteAction() {
    const id = this.post('id');
    const update = await this.model('article_category').where({id: id}).delete();
    return this.success(update);
  }
};
