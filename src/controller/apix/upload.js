const adminBase = require('../adminBase.js');
import qiniu from 'node-qiniu';
qiniu.config({
  access_key: 'gjOuGOi_3b3HkMoXZozSf6ZaIqP8ep-4BzZuSCii',
  secret_key: 'xQS6qsBID8R-BKeyU1uEc5YKukyS21B6Cu-H5Mqa'
});
var imagesBucket = qiniu.bucket('zz123');
const randomStr = Math.random().toString(36).substring(2);
// 模型UID说明
// 0 蜘蛛条目图
// 1 文章封面图
module.exports = class extends adminBase {
  async uploadAction() {
    const file = this.file('file');
    const id = this.post('id');
    const coverName = this.post('coverName');
    const folder = 'spider/swiper/';

    const fileKey = folder + id + '_' + think.datetime(new Date(), 'YYYYMMDDHHmmss') + '_' + randomStr + file.type.replace('image/', '.');
    const reply = await imagesBucket.putFile(fileKey, file.path);
    await this.model('image').add({
      key: fileKey,
      sid: id,
      date: think.datetime(),
      folder: folder,
      uid: 0
    });
    if (coverName === file.name) {
      await this.model('spider').where({id: id}).update({cover: reply.key});
    }
    return this.success();
  }
  async uploadArticleAction() {
    const file = this.file('file');
    const id = this.post('id');
    const folder = 'article/cover/';
    const fileKey = folder + id + '_' + think.datetime(new Date(), 'YYYYMMDDHHmmss') + '_' + randomStr + file.type.replace('image/', '.');
    const reply = await imagesBucket.putFile(fileKey, file.path);
    await this.model('image').add({
      key: fileKey,
      sid: id,
      date: think.datetime(),
      folder: folder,
      uid: 1
    });
    await this.model('article_content').where({id: id}).update({cover: reply.key});
  }
  async delSourceAction() {
    const id = this.post('id');
    const key = this.post('key');
    await this.model('image').where({id: id}).delete();
    await imagesBucket.key(key).remove();
    return this.success();
  }
  async delArticleSrcAction() {
    const id = this.post('id');
    const key = this.post('key');
    await this.model('image').where({id: id, uid: 1}).delete();
    await imagesBucket.key(key).remove();
    return this.success();
  }
};
