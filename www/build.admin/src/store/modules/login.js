const state = {
  userInfo: {}
}
const mutations = {
  changeUserInfo (state, payload) {
    state.userInfo = payload
  }
}
const actions = {
  async userInfo ({ commit }, data) {
    commit('changeUserInfo', data)
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
