module.exports = class extends think.Controller {
  async __before() {
    const login = await this.session('userInfo');
    const actionName = this.ctx.action;
    const controllerName = this.ctx.controller;
    if ((controllerName === 'admin' && actionName === 'index') ||
       (controllerName === 'apix/login' && actionName === 'login')) {
      return;
    }

    if (think.isEmpty(login)) {
      this.redirect('/admin');
      this.ctx.throw(401, 'access_denied');
    }
  }
};
