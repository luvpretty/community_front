import axios from '@/util/request'
import qs from 'qs'

/**
 * 读取文章列表
 * @param {Object} options 读取文章列表接口参数
 */
const getList = (options) => {
  return axios.get('/public/list?' + qs.stringify(options))
}

/**
 * 温馨提醒
 */
const getTips = () => {
  return axios.get('/public/tips')
}

/**
 * 本周热议
 */
const getTop = () => {
  return axios.get('/public/topWeek')
}

/**
 * 友情链接
 */
const getLinks = () => {
  return axios.get('/public/links')
}
export {
  getList,
  getTips,
  getLinks,
  getTop
}
