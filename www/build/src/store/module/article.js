import api from '../../api'
import axios from 'axios'
const state = {
  articleCateList: [],
  articleChildList: [],
  articleDetial: []
}
const mutations = {
  changeArticleList (state, payload) {
    state.articleCateList = payload.data
  },
  changeArticleChildList (state, payload) {
    state.articleChildList = payload.data
  },
  changeArticleDetial (state, payload) {
    state.articleDetial = payload.data
  }
}
const actions = {
  async getCateList ({ commit }) {
    commit('UPDATE_LOADING', true)
    const data = await axios({
      method: 'get',
      url: api.aList
    })
    commit('UPDATE_LOADING', false)
    return data.data
  },
  async getArticleChildList ({ commit, rootState }) {
    commit('UPDATE_LOADING', true)
    const data = await axios({
      method: 'post',
      url: api.articleList,
      data: {
        id: rootState.route.params.title,
        page: rootState.route.params.page
      }
    })
    commit('changeArticleChildList', data.data)
    commit('UPDATE_LOADING', false)
  },
  async getArticleDetial ({ commit, rootState }) {
    commit('UPDATE_LOADING', true)
    const data = await axios({
      method: 'post',
      url: api.articleDetial,
      data: {
        id: rootState.route.params.id
      }
    })
    commit('changeArticleDetial', data.data)
    commit('UPDATE_LOADING', false)
  }
}
const getters = {
  getArticleCateList (state) {
    return state.articleCateList
  },
  getArticleCateChild (state, getters, rootState) {
    const index = state.articleCateList.findIndex(value => {
      return value.name === rootState.route.params.list
    })
    return index === -1 ? [] : state.articleCateList[index].children
  }
}
export default {
  state,
  mutations,
  actions,
  getters
}
