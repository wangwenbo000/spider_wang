const adminBase = require('../adminBase.js');

module.exports = class extends adminBase {
  async loginAction() {
    const userName = this.post('username');
    const passWord = this.post('password');
    const loginInfo = await this.model('admin').where({username: userName}).find();
    if (think.isEmpty(loginInfo)) {
      this.ctx.throw(401, 'access_denied');
    }
    if (loginInfo.username === userName && loginInfo.password === think.md5(passWord)) {
      await this.session('userInfo', {username: userName, password: passWord});
      return this.success({
        username: userName,
        id: loginInfo.id
      });
    } else {
      this.ctx.throw(401, 'access_denied');
    }
  }
  async loginOutAction() {
    await this.session('userInfo', null);
    this.ctx.throw(401, 'access_denied');
  }
  async changePassWordAction() {
    const password = this.post('p');
    const oPassword = this.post('op');
    const id = this.post('id');
    const a = await this.model('admin').where({id: id}).find();
    if (a.password === oPassword) {
      await this.model('admin').where({id: id}).update({
        password: password
      });
      return this.success();
    } else {
      return this.fail('password error!');
    }
  }
};
