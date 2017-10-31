const adminBase = require('../adminBase.js');
import qiniu from 'node-qiniu';
qiniu.config({
  access_key: 'gjOuGOi_3b3HkMoXZozSf6ZaIqP8ep-4BzZuSCii',
  secret_key: 'xQS6qsBID8R-BKeyU1uEc5YKukyS21B6Cu-H5Mqa'
});
var imagesBucket = qiniu.bucket('zz123');
module.exports = class extends adminBase {
  async getCateListAction() {
    const pid = this.post();
    console.log(pid);
    const data = await this.model('main_category').getList();
    return this.json(data);
  }
  async getChildListAction() {
    const id = this.post('id');
    const page = this.post('page');
    const list = await this.model('spider')
      .where({category: id})
      .page(page, 16)
      .order('STATUS ASC, ID DESC')
      .field('enName,id,cnName,date,isScale,status,cover')
      .countSelect();
    return this.success(list);
  }
  async deleteChildListItemAction() {
    const id = this.post('id');
    const del = this.model('spider').where({id: parseInt(id)}).delete();
    const imageList = await this.model('image').where({sid: id}).field('key').select();
    imageList.forEach(async item => {
      await imagesBucket.key(item.key).remove();
    });
    await this.model('image').where({sid: id}).delete();
    return this.success(del);
  }
  async addDataAction() {
    const data = this.post('data');
    const action = this.post('action');
    data.males = JSON.stringify(data.males);
    data.females = JSON.stringify(data.females);
    data.body = JSON.stringify(data.body);
    data.span = JSON.stringify(data.span);
    data.temperature = JSON.stringify(data.temperature);
    data.humidity = JSON.stringify(data.humidity);
    data.local = JSON.stringify(data.local);
    data.date = think.datetime();
    switch (action) {
      case 'add':
        const add = await this.model('spider').add(data);
        return this.success(add);
      case 'edit':
        delete data.date;
        const update = await this.model('spider').update(data);
        return this.success(update);
    }
  }
  async getDetialAction() {
    const id = this.post('id');
    const detial = await this.model('spider').where({id: id}).find();
    const image = await this.model('image').where({sid: id}).select();
    return this.success({
      data: detial,
      src: image
    });
  }
};
