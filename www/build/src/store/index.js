import Vue from 'vue'
import Vuex from 'vuex'

import spider from './module/spider'
import article from './module/article'
import video from './module/video'
import search from './module/search'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  modules: {
    spider,
    article,
    video,
    search
  },
  state: {
    isLoading: false
  },
  mutations: {
    UPDATE_LOADING (state, status) {
      state.isLoading = status
    }
  },
  strict: debug
})
