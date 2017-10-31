const Base = require('../base.js');

module.exports = class extends Base {
  async searchAction() {
    const key = this.post('key');
    const type = this.post('type');
    const page = this.post('page');
    let article = null;
    let spider = null;
    switch (type) {
      case 'article':
        article = await this.model('article_content')
          .where({
            titleEn: ['like', '%' + key + '%']
          })
          .page(page, 10)
          .countSelect();
        return this.success({type: type, obj: article});
      case 'spider':
        spider = await this.model('spider')
          .where({
            enName: ['like', '%' + key + '%']
          })
          .page(page, 10)
          .countSelect();
        return this.success({type: type, obj: spider});
      default:
        return this.success({type: 'empty', obj: {}});
    }
  }
};
