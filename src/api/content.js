import axios from '@/util/request'
import qs from 'qs'
import store from '@/store'
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

// 发帖接口
const addPost = (data) => axios.post('/content/add', { ...data })

// 获取文章详情
const getDetail = (tid) => {
  const token = store.state.token
  let headers = {}
  if (token !== '') {
    headers = {
      headers: {
        'Authorization': 'Bearer ' + store.state.token
      }
    }
  }
  return axios.get('/public/content/detail?tid=' + tid, headers)
}

// 获取评论详情
const getComments = (data) => axios.get('/content/comments', { ...data })
export {
  getList,
  getTips,
  getLinks,
  getTop,
  uploadImg,
  addPost,
  getDetail,
  getComments
}
