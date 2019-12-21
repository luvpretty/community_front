import axios from '@/util/request'
import store from '@/store'

// 用户签到
const userSign = () => {
  const headers = {
    Authorization: 'Bearer ' + store.state.token
  }
  return axios.get('/user/fav', {
    headers
  })
}

export {
  userSign
}
