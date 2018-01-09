module.exports = class extends think.Model {
  get relation() {
    return {
      main_category: {
        type: think.Model.BELONG_TO,
        key: 'category',
        fKey: 'id',
        name: 'cateName',
        field: 'name'
      }
    };
  }

  async getDetial(id) {
    const detial = await this.where({id: id}).find();
    return detial;
  }
};
