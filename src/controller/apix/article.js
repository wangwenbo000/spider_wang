const adminBase = require('../adminBase.js');
import qiniu from 'node-qiniu';
qiniu.config({
  access_key: 'gjOuGOi_3b3HkMoXZozSf6ZaIqP8ep-4BzZuSCii',
  secret_key: 'xQS6qsBID8R-BKeyU1uEc5YKukyS21B6Cu-H5Mqa'
});
var imagesBucket = qiniu.bucket('zz123');
module.exports = class extends adminBase {
  async getCateListAction() {
    const id = this.post('id');
    let data = null;
    if (think.isEmpty(id)) {
      data = await this.model('article_category').getList();
    } else {
      data = await this.model('article_category').where({pid: id}).select();
    }

    return this.json(data);
  }
  async getChildListAction() {
    const id = this.post('id');
    const page = this.post('page');
    const list = await this.model('article_content')
      .where({category: id})
      .page(page, 16)
      .order('STATUS ASC, ID DESC')
      .countSelect();
    return this.success(list);
  }
  async addAction() {
    const data = this.post('data');
    const action = this.post('action');
    data.date = think.datetime();
    switch (action) {
      case 'add':
        const add = await this.model('article_content').add(data);
        return this.success(add);
      case 'edit':
        delete data.date;
        const update = await this.model('article_content').update(data);
        return this.success(update);
    }
  }
  async detialAction() {
    const id = this.post('id');
    const detial = await this.model('article_content').where({id: id}).find();
    const image = await this.model('image').where({sid: id, uid: 1}).select();
    return this.success({
      data: detial,
      src: image
    });
  }
  async delArticleItemAction() {
    const id = this.post('id');
    const image = await this.model('image').where({sid: id, uid: 1}).select();
    image.forEach(async item => {
      await imagesBucket.key(item.key).remove();
    });
    await this.model('article_content').where({id: id}).delete();
    return this.success();
  }
};
