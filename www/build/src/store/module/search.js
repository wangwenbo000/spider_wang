import axios from 'axios'
import api from '../../api'
const state = {
  SearchRes: {
    obj: {},
    type: ''
  }
}
const mutations = {
  changeSearchRes (state, payload) {
    state.SearchRes = payload.data
  }
}
const actions = {
  async search ({ commit, rootState }) {
    commit('UPDATE_LOADING', true)
    const data = await axios({
      method: 'post',
      url: api.search,
      data: {
        key: rootState.route.params.key,
        type: rootState.route.params.type,
        page: rootState.route.params.page
      }
    })
    commit('changeSearchRes', data.data)
    commit('UPDATE_LOADING', false)
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
