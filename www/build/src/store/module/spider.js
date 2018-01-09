import api from '../../api'
import axios from 'axios'
const state = {
  list: [],
  filterList: [],
  image: [],
  detialData: {
    Accessibility: 0,
    Urticating: 1,
    body: {
      min: 0,
      max: 0
    },
    toxic: 0,
    category: 0,
    chart: [],
    cnName: '',
    contentCn: '',
    contentEn: '',
    cover: '',
    date: '',
    describeCn: '',
    describeEn: ' ',
    enName: '',
    females: {
      min: 0,
      max: 0
    },
    growth: 1,
    habit: [],
    humidity: {
      'day': { 'min': 0, 'max': 0 },
      'night': { 'min': 0, 'max': 0 }
    },
    id: 0,
    isScale: 1,
    local: {
      'name': '',
      'zoom': 6,
      'lon': 0,
      'lat': 0
    },
    males: {
      'min': 0,
      'max': 0
    },
    scalePlatform: 1,
    scaleUrl: '',
    span: {
      'min': 0,
      'max': 0
    },
    status: 1,
    temperature: {
      'day': { 'min': 0, 'max': 0 },
      'night': { 'min': 0, 'max': 0 }
    }
  }
}
const mutations = {
  changeList (state, payload) {
    state.list = payload.data
  },
  changeImage (state, payload) {
    const removeCover = payload.filter(src => {
      return src.key !== state.detialData.cover
    })
    state.image = removeCover
  },
  changeFilter (state, payload) {
    state.filterList = payload.data.data
  },
  changeDetial (state, payload) {
    const data = payload.data.data
    data.males = JSON.parse(data.males)
    data.females = JSON.parse(data.females)
    data.body = JSON.parse(data.body)
    data.span = JSON.parse(data.span)
    data.temperature = JSON.parse(data.temperature)
    data.humidity = JSON.parse(data.humidity)
    data.local = JSON.parse(data.local)
    data.chart = data.chart.split(',')
    data.toxic = parseInt(data.chart[1])
    data.habit = data.habit.split(',')
    state.detialData = data
  }
}
const actions = {
  // 获取所有数据
  async getList ({ commit }) {
    commit('UPDATE_LOADING', true)
    const data = await axios({
      method: 'get',
      url: api.zzList
    })
    commit('UPDATE_LOADING', false)
    return data.data
  },
  // 获取分类下的数据
  async getFilterList ({ commit, rootState }) {
    commit('UPDATE_LOADING', true)
    const list = await axios({
      method: 'post',
      url: api.filterList,
      data: {
        id: rootState.route.params.title,
        page: rootState.route.params.page
      }
    })
    commit('UPDATE_LOADING', false)
    return list
  },
  // 获取详情页数据
  async getDetialData ({ commit, rootState }) {
    commit('UPDATE_LOADING', true)
    const detial = await axios({
      method: 'post',
      url: api.detial,
      data: {
        id: rootState.route.params.id
      }
    })
    commit('changeDetial', detial.data)
    commit('changeImage', detial.data.data.image)
    commit('UPDATE_LOADING', false)
  }
}
const getters = {
  // 筛选二级分类
  filterCate (state, getters, rootState) {
    const index = state.list.findIndex(value => {
      return value.name === rootState.route.params.list
    })
    return index === -1 ? [] : state.list[index].children
  },
  detialInfo (state) {
    return state.detialData
  }
}
export default {
  state,
  mutations,
  actions,
  getters
}
