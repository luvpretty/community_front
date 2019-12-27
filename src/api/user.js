import axios from '@/util/request'

// 用户签到
const userSign = () => axios.get('/user/fav')

// 更新用户基本资料
const updateUserInfo = (data) => axios.post('/user/basic', data)
export {
  userSign,
  updateUserInfo
}
