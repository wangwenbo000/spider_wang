// import axios from 'axios'
import jsonp from 'jsonp'
const state = {
  realUrl: ''
}
const mutations = {
  changeRealUrl (state, payload) {
    const data = payload.vd.vi[0]
    state.realUrl = data.url
  }
}
const actions = {
  async getQQVideoRealUrl ({ commit, rootState }) {
    commit('UPDATE_LOADING', true)
    const resUri = `http://vv.video.qq.com/geturl?vid=${rootState.route.params.vid}&otype=json&platform=1&ran=${Math.random().toString(36).substring(2)}`
    jsonp(resUri, null, (err, data) => {
      if (err) {}
      commit('changeRealUrl', data)
      commit('UPDATE_LOADING', false)
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
