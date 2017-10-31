import { apiBaseUrl } from './config'
const api = {
  zzList: `${apiBaseUrl}category/zList`,
  filterList: `${apiBaseUrl}category/filter`,
  aList: `${apiBaseUrl}category/aList`,
  detial: `${apiBaseUrl}spider/detial`,
  articleList: `${apiBaseUrl}category/articleChild`,
  articleDetial: `${apiBaseUrl}article/detial`,
  search: `${apiBaseUrl}search/search`,
  info: `${apiBaseUrl}info/info`,
  store: `${apiBaseUrl}info/store`
}
export default api
