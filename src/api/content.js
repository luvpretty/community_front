import axios from '@/util/request'
import qs from 'qs'

/**
 * 读取文章列表
 * @param {Object} options 读取文章列表接口参数
 */
const getList = (options) => axios.get('/public/list?' + qs.stringify(options))

// 温馨提醒
const getTips = () => axios.get('/public/tips')

// 本周热议
const getTop = () => axios.get('/public/topWeek')

// 友情链接
const getLinks = () => axios.get('/public/links')

// 图片上传
const uploadImg = (formData) => axios.post('/content/upload', formData)
export {
  getList,
  getTips,
  getLinks,
  getTop,
  uploadImg
}
