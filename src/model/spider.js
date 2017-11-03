module.exports = class extends think.Model {
  get relation() {
    return {
      main_category: {
        type: think.Model.HAS_ONE,
        key: 'category',
        fKey: 'id',
        name: 'cateName',
        field: 'name'
      }
    };
  }

  async getDetial(id) {
    const detial = await this.where({id:id}).find();
    return detial;
  }
};
