import qiniu from 'node-qiniu';
const adminBase = require('../adminBase.js');
const qc = think.config('qiniu');
qiniu.config({
  access_key: qc.access_key,
  secret_key: qc.secret_key
});
var imagesBucket = qiniu.bucket(qc.bucket);
module.exports = class extends adminBase {
  async getCateListAction() {
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
      .field('enName,id,cnName,date,isScale,status,cover,uuid')
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
    data.rarity = parseInt(data.rarity);
    if (data.habit[0] === '') {
      data.habit = data.habit.join(',');
      data.habit = data.habit.replace(',', '');
    } else {
      data.habit = data.habit.join(',');
    }
    data.subfamily = data.subfamily;
    switch (action) {
      case 'add':
        data.uuid = think.uuid('v1');
        const add = await this.model('spider').add(data);
        return this.success({
          id: add,
          uuid: data.uuid
        });
      case 'edit':
        delete data.date;
        const update = await this.model('spider').update(data);
        return this.success(update);
    }
  }

  async getDetialAction() {
    const id = this.post('id');
    const detial = await this.model('spider').where({uuid: id}).find();
    const image = await this.model('image').where({uuid: id}).select();
    return this.success({
      data: detial,
      src: image
    });
  }
};
