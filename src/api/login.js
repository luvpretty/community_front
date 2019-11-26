import axios from '@/util/request'
// 图形验证码接口
const getCode = async () => {
  return axios.get('/getCaptcha')
}

// 忘记密码
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
export { getCode, forget }
