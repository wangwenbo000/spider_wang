const Base = require('../base.js');

module.exports = class extends Base {
  async detialAction() {
    const id = this.post('id');
    const data = await this.model('article_content').where({id: id}).find();
    return this.success(data);
  }
};
