import axios from '@/util/request'
/**
 * 获取验证码接口
 * @param {*} sid 唯一标识
 */
const getCode = async (sid) => {
  return axios.get('/public/getCaptcha', {
    params: {
      sid
    }
  })
}
/**
 * 找回密码接口
 * @param {*} option 用户信息(邮箱，验证码)
 */
const forget = async (option) => {
  let result = ''
  try {
    result = await axios.post('/forget', {
      ...option
    })
    if (result.status === 200) {
      return result.data
    }
  } catch (e) {
    console.log(e)
  }
  return result
}
/**
 * 用户登录接口
 * @param {*} loginInfo 用户登录信息
 */
const login = (loginInfo) => {
  return axios.post('/login', {
    ...loginInfo
  })
}

export { getCode, forget, login }
