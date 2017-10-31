import axios from 'axios'
import api from '../../api'
const state = {
  childList: [],
  cateList: [],
  detial: {},
  image: []
}
const mutations = {
  changeChildList (state, payload) {
    state.childList = payload.data
  },
  deleteChildItem (state, payload) {
    const data = state.childList.data.filter((value) => {
      return value.id !== payload
    })
    state.childList.data = data
  },
  changeCateList (state, payload) {
    state.cateList = payload
  },
  changeDetial (state, payload) {
    const data = payload.data
    data.males = JSON.parse(data.males)
    data.females = JSON.parse(data.females)
    data.body = JSON.parse(data.body)
    data.span = JSON.parse(data.span)
    data.temperature = JSON.parse(data.temperature)
    data.humidity = JSON.parse(data.humidity)
    data.local = JSON.parse(data.local)
    state.detial = data
    state.image = payload.src
  },
  delSource (state, payload) {
    const list = state.image.filter(value => {
      return value.id !== payload
    })
    state.image = list
  }
}
const actions = {
  async getChildList ({ commit, rootState }) {
    const data = await axios({
      url: api.getChildList,
      method: 'post',
      data: {
        id: rootState.route.params.id,
        page: rootState.route.params.page
      }
    })
    commit('changeChildList', data.data)
  },
  async deleteItem ({ commit }, data) {
    await axios({
      url: api.deleteChildItem,
      method: 'post',
      data: {
        id: data
      }
    })
    commit('deleteChildItem', data)
  },
  async addSpiderData ({ commit }, data) {
    return await axios({
      url: api.addData,
      method: 'post',
      data: data
    })
  },
  async changeCate ({ commit }, data) {
    commit('changeCateList', data)
  },
  async getDetial ({ commit, rootState }) {
    const detial = await axios({
      url: api.getDetial,
      method: 'post',
      data: {
        id: rootState.route.query.id
      }
    })
    console.log(detial.data.data)
    commit('changeDetial', detial.data.data)
  },
  async delSource ({ commit }, data) {
    await axios({
      url: api.delSource,
      method: 'post',
      data: {
        id: data.id,
        key: data.key
      }
    })
    commit('delSource', data)
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
