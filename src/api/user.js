import axios from '@/util/request'
import qs from 'qs'
// 用户签到
const userSign = () => axios.get('/user/fav')

// 更新用户基本资料
const updateUserInfo = (data) => axios.post('/user/basic', data)

// 确认修改用户名
const updateUsername = (data) => axios.get('/public/reset-email?' + qs.stringify(data))
export {
  userSign,
  updateUserInfo,
  updateUsername
}
