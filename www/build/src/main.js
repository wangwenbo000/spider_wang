// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import zPageNav from '@/components/vue-pagenav'
import store from './store/'
import { sync } from 'vuex-router-sync'
sync(store, router)
import VueScrollTo from 'vue-scrollto'
Vue.use(VueScrollTo)

Vue.use(zPageNav)
import VueI18n from 'vue-i18n'
Vue.use(VueI18n)
Vue.prototype.$axios = axios

import VueAnimateNumber from 'vue-animate-number'
Vue.use(VueAnimateNumber)

require('swiper/dist/css/swiper.css')
import VueAwesomeSwiper from 'vue-awesome-swiper'
Vue.use(VueAwesomeSwiper)

Vue.config.productionTip = false

import api from './api'
import config from './config'
Vue.prototype.$api = api
Vue.prototype.$conf = config
import messages from './locale'
const i18n = new VueI18n({
  // 读取用户习惯语言
  locale: localStorage.locale || 'en',
  messages
})
new Vue({
  el: '#app',
  i18n,
  router,
  store,
  template: '<App/>',
  components: { App }
})
