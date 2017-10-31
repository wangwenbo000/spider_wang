import Vue from 'vue'
import Vuex from 'vuex'

import Spider from './modules/spider'
import Article from './modules/article'
import Category from './modules/Category'
import Login from './modules/login'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  modules: {
    Spider,
    Article,
    Category,
    Login
  },
  strict: debug
})
