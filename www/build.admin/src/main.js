// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import api from './api'
import store from './store/'
import zPageNav from '@/components/vue-pagenav'
import config from './config'
Vue.use(zPageNav)
// import zhCN from 'vee-validate/dist/locale/zh_CN'
import VeeValidate from 'vee-validate'
Vue.use(VeeValidate, {
  locale: 'zhCN'
})
import VueLazyload from 'vue-lazyload'
Vue.use(VueLazyload, {
  preLoad: 1.3,
  error: 'http://oux1h5x17.bkt.clouddn.com/error.jpg?imageView2/5/w/50/h/50',
  loading: 'http://oux1h5x17.bkt.clouddn.com/loading.jpg',
  attempt: 1,
  // the default is ['scroll', 'wheel', 'mousewheel', 'resize', 'animationend', 'transitionend']
  listenEvents: ['scroll']
})
import { sync } from 'vuex-router-sync'
sync(store, router)
Vue.filter('formatSize', function (size) {
  if (size > 1024 * 1024 * 1024 * 1024) {
    return (size / 1024 / 1024 / 1024 / 1024).toFixed(2) + ' TB'
  } else if (size > 1024 * 1024 * 1024) {
    return (size / 1024 / 1024 / 1024).toFixed(2) + ' GB'
  } else if (size > 1024 * 1024) {
    return (size / 1024 / 1024).toFixed(2) + ' MB'
  } else if (size > 1024) {
    return (size / 1024).toFixed(2) + ' KB'
  }
  return size.toString() + ' B'
})
Vue.prototype.$api = api
Vue.prototype.$conf = config

Vue.prototype.$axios = axios
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  template: '<App/>',
  components: { App }
})
