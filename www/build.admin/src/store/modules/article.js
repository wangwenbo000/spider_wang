import axios from 'axios'
import api from '../../api'
const state = {
  childList: [],
  detial: {},
  image: []
}
const mutations = {
  changeArticleChildList (state, payload) {
    state.childList = payload.data
  },
  changeArticleDetial (state, payload) {
    state.detial = payload.data
    state.image = payload.src
  },
  delArticleSource (state, payload) {
    const list = state.image.filter(value => {
      return value.id !== payload
    })
    state.image = list
  },
  delItem (state, payload) {
    const data = state.childList.data.filter((value) => {
      console.log(value, payload)
      return value.id !== payload
    })
    state.childList.data = data
  }
}
const actions = {
  async getArticleChildList ({ commit, rootState }) {
    const data = await axios({
      url: api.getArticleChildList,
      method: 'post',
      data: {
        id: rootState.route.params.id,
        page: rootState.route.params.page
      }
    })
    commit('changeArticleChildList', data.data)
  },
  async addArticle ({ commit }, data) {
    return await axios({
      url: api.addArcitle,
      method: 'post',
      data: data
    })
  },
  async getArticleDetial ({ commit, rootState }) {
    const detial = await axios({
      url: api.getArticleDetial,
      method: 'post',
      data: {
        id: rootState.route.query.id
      }
    })
    commit('changeArticleDetial', detial.data.data)
  },
  async delSourceFromDbAndServer ({ commit }, data) {
    await axios({
      url: api.delArticleSource,
      method: 'post',
      data: {
        id: data.id,
        key: data.key
      }
    })
    commit('delArticleSource', data.id)
  },
  async delArticleItem ({ commit }, data) {
    await axios({
      url: api.delArticleItem,
      method: 'post',
      data: {
        id: data
      }
    })
    commit('delItem', data)
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
