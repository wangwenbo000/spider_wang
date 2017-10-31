const Base = require('../base.js');

module.exports = class extends Base {
  // 获取蜘蛛分类列表
  async infoAction() {
    const data = await this.model('about').where({id: 1}).find();
    return this.success(data);
  }
  async storeAction() {
    const data = await this.model('scalelist').where({id: 1}).find();
    console.log(data);
    return this.success(data);
  }
};
