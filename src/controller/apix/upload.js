import qiniu from 'node-qiniu';
import ueConfig from './uploadConfig';
import axios from 'axios';
import { delimiter } from 'path';
const adminBase = require('../adminBase.js');

const qc = think.config('qiniu');
qiniu.config({
  access_key: qc.access_key,
  secret_key: qc.secret_key
});
var imagesBucket = qiniu.bucket(qc.bucket);
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
  async eUploadAction() {
    var action = this.get();
    switch (action.action) {
      case 'config':
        this.json(ueConfig);
        break;
      // 上传单张照片
      case 'uploadimage':
        const file = this.file('upfile');
        const folder = 'editor/';
        const fileKey = folder + think.datetime(new Date(), 'YYYYMMDDHHmmss') + '_' + randomStr + file.type.replace('image/', '.');
        const reply = await imagesBucket.putFile(fileKey, file.path);
        this.json({
          'state': 'SUCCESS',
          'url': 'http://' + qc.url + '/' + reply.key,
          'title': reply.key,
          'original': reply.key
        });
        break;
      // 列出图片列表
      case 'listimage':
        const list = await this.listAction();
        this.json({
          'state': 'SUCCESS',
          'list': list,
          'start': 0,
          'total': list.length
        });
        break;
      case 'delImage':
        let path = this.get('path');
        path = path.replace('http://' + qc.url + '/', '');
        // console.log(path);
        await imagesBucket.key(path).remove();
        this.json({
          'state': 'SUCCESS',
          'message': '图床资源删除成功！'
        });
        break;
    }
  }

  // 列出七牛云资源
  async listAction() {
    var crypto = require('crypto');
    var config = {
      marker: '',
      prefix: '',
      delimiter: ''
    };
    config.bucket = qc.bucket;
    config.marker === '' && delete config.marker;
    config.prefix === '' && delete config.prefix;
    config.delimiter === '' && delete config.delimiter;

    const querystring = require('querystring');
    const questURL = querystring.stringify(config);
    const questURLDecode = querystring.unescape(questURL);

    var postURL = 'http://rsf.qbox.me/list?' + questURLDecode;
    var signingStr = '/list?' + questURLDecode + '\n';
    var sign = crypto.createHmac('sha1', qc.secret_key).update(signingStr).digest().toString('base64');
    sign = sign.replace('+', '-');
    sign = sign.replace('/', '_');

    var options = {
      method: 'POST',
      url: postURL,
      json: true,
      headers: {
        'Host': 'rsf.qbox.me',
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'QBox ' + qc.access_key + ':' + sign
      }
    };
    var res = await axios(options);
    const imgArr = [];
    res.data.items.forEach(item => {
      imgArr.push({
        url: 'http://' + qc.url + '/' + item.key
      });
    });
    return imgArr;
    // this.success(res, '七牛云图床列表获取成功');
  }
};
