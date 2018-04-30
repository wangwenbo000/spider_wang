const Base = require('../base.js');

module.exports = class extends Base {
  async detialAction() {
    const id = this.post('id');
    const data = await this.model('spider').getDetial(id);
    const image = await this.model('image').where({uuid: id, uid: 0}).field('key').select();
    return this.success({data, image});
  }
};
