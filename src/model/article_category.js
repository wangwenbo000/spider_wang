module.exports = class extends think.Model {
  get relation() {
    return {
      article_category: {
        type: think.Model.HAS_MANY,
        key: 'id',
        fKey: 'pid',
        name: 'children'
      }
    };
  }

  async getList() {
    const cateList = await this.where({pid: 0}).select();
    return cateList;
  }
};
