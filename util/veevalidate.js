import { extend, localize } from 'vee-validate'
import { required, email, min, length, confirmed } from 'vee-validate/dist/rules'
import zh from 'vee-validate/dist/locale/zh_CN'

extend('email', email)
extend('min', min)
extend('required', required)
extend('length', length)
extend('confirmed', confirmed)

localize('zh_CN', {
  messages: {
    ...zh.messages,
    required: '请输入{_field_}'
  },
  names: {
    email: '邮箱',
    password: '密码',
    repass: '密码',
    name: '账号',
    username: '账号',
    code: '验证码',
    vercode: '验证码',
    nickname: '昵称'
  },
  fields: {
    email: {
      email: '请输入正确的{_field_}',
      // 覆盖前面的required
      required: '请输入{_field_}!!!'
    }
  }
})
