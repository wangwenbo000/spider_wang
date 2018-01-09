const Base = require('../base.js');

module.exports = class extends Base {
  // 获取蜘蛛分类列表
  async zListAction() {
    const data = await this.model('main_category').getList();
    return this.success(data);
  }
  // 获取文章分类列表
  async aListAction() {
    const data = await this.model('article_category').getList();
    return this.success(data);
  }
  // 蜘蛛分类下属内容列表
  async filterAction() {
    const id = this.post('id');
    const page = this.post('page');
    const list = await this.model('spider')
      .where({category: id, status: 1})
      .page(page, 10)
      .field('id,cover,enName,cnName')
      .countSelect();
    return this.success(list);
  }
  // 文章下属内容列表
  async articleChildAction() {
    const id = this.post('id');
    const page = this.post('page');
    const list = await this.model('article_content')
      .where({category: id})
      .page(page, 10)
      .field('id,titleCn,cover,describeCn,date')
      .countSelect();
    return this.success(list);
  }
};
