import { apiBaseUrl } from './config'
import axios from 'axios'
import router from './router/index'
// axios配置
axios.defaults.timeout = 5000
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'

// axios request拦截器
axios.interceptors.request.use(config => {
  return config
}, err => {
  return Promise.reject(err)
})

// axios response拦截器
axios.interceptors.response.use(response => {
  return response
}, error => {
  if (error.response) {
    switch (error.response.status) {
      case 401:
        router.replace({
          name: 'Hello',
          query: { redirect: router.currentRoute.fullPath }
        })
        localStorage.auth = false
        localStorage.login = null
    }
  }
  return Promise.reject(error.response.data)
})

const api = {
  login: `${apiBaseUrl}login/login`,
  getChildList: `${apiBaseUrl}spider/getChildList`,
  deleteChildItem: `${apiBaseUrl}spider/deleteChildListItem`,
  addData: `${apiBaseUrl}spider/addData`,
  getDetial: `${apiBaseUrl}spider/getDetial`,
  delSource: `${apiBaseUrl}upload/delSource`,
  about: `${apiBaseUrl}about/about`,
  saveAbout: `${apiBaseUrl}about/save`,
  scale: `${apiBaseUrl}scale/scale`,
  saveScale: `${apiBaseUrl}scale/save`,
  getArticleChildList: `${apiBaseUrl}article/getChildList`,
  addArcitle: `${apiBaseUrl}article/add`,
  getArticleDetial: `${apiBaseUrl}article/detial`,
  delArticleSource: `${apiBaseUrl}upload/delArticleSrc`,
  delArticleItem: `${apiBaseUrl}article/delArticleItem`,
  addCate: `${apiBaseUrl}category/add`,
  updateCate: `${apiBaseUrl}category/update`,
  deleteCate: `${apiBaseUrl}category/delete`,
  loginOut: `${apiBaseUrl}login/loginOut`,
  changePassWord: `${apiBaseUrl}login/changePassWord`
}
export default api
