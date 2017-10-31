import axios from 'axios'
import api from '../../api'
const state = {

}
const mutations = {

}
const actions = {
  async addCate ({ commit }, data) {
    return await axios({
      url: api.addCate,
      method: 'post',
      data: data
    })
  },
  async updateCate ({ commit }, data) {
    return await axios({
      url: api.updateCate,
      method: 'post',
      data: data
    })
  },
  async deleteCate ({ commit }, id) {
    return await axios({
      url: api.deleteCate,
      method: 'post',
      data: {
        id: id
      }
    })
  }
}
const getters = {
}
export default {
  state,
  mutations,
  actions,
  getters
}
