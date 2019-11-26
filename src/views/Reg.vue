<template>
  <div class="layui-container fly-marginTop">
    <div class="fly-panel fly-panel-user" pad20>
      <div class="layui-tab layui-tab-brief" lay-filter="user">
        <ul class="layui-tab-title">
          <li>
            <router-link :to="{name: 'login'}">登入</router-link>
          </li>
          <li class="layui-this">注册</li>
        </ul>
        <div class="layui-form layui-tab-content" id="LAY_ucm" style="padding: 20px 0;">
          <div class="layui-tab-item layui-show">
            <div class="layui-form layui-form-pane">
              <form method="post">
                <div class="layui-form-item">
                  <label for="L_email" class="layui-form-label">邮箱</label>
                  <validation-provider rules="required|min:6" name="email" v-slot="{ errors }">
                  <div class="layui-input-inline">
                    <input
                      type="email"
                      name="email"
                      v-model="email"
                      placeholder="请输入邮箱"
                      autocomplete="off"
                      class="layui-input"
                    />
                  </div>
                  <div class="layui-form-mid">
                    <span style="color: #c00;">{{errors[0]}}</span>
                  </div>
                  </validation-provider>
                </div>
                <div class="layui-form-item">
                  <label for="L_username" class="layui-form-label">昵称</label>
                  <validation-provider rules="required|min:4" name="nickname" v-slot="{ errors }">
                  <div class="layui-input-inline">
                    <input
                      type="text"
                      name="nickname"
                      v-model="nickname"
                      placeholder="请输入昵称"
                      class="layui-input"
                      autocomplete="off"
                    />
                  </div>
                  <div class="layui-form-mid">
                    <span style="color: #c00;">{{errors[0]}}</span>
                  </div>
                  </validation-provider>
                </div>
                <div class="layui-form-item">
                  <label for="L_pass" class="layui-form-label">密码</label>
                  <validation-provider rules="required|min:6" name="password" v-slot="{ errors }">
                  <div class="layui-input-inline">
                    <input
                      type="password"
                      name="password"
                      v-model="password"
                      placeholder="请输入密码"
                      autocomplete="off"
                      class="layui-input"
                    />
                  </div>
                  <div class="layui-form-mid">
                    <span style="color: #c00;">{{errors[0]}}</span>
                  </div>
                  </validation-provider>
                </div>
                <div class="layui-form-item">
                  <label for="L_repass" class="layui-form-label">确认密码</label>
                  <validation-provider :rules="{required: true,is: password}" name="repass" v-slot="{ errors }">
                  <div class="layui-input-inline">
                    <input
                      type="password"
                      name="repass"
                      v-model="repass"
                      placeholder="请确认密码"
                      autocomplete="off"
                      class="layui-input"
                    />
                  </div>
                  <div class="layui-form-mid">
                    <span style="color: #c00;">{{errors[0]}}</span>
                  </div>
                  </validation-provider>
                </div>
                <div class="layui-form-item">
                  <validation-provider rules="required|length:4" name="vercode" v-slot="{ errors }">
                  <div class="layui-row">
                  <label for="L_vercode" class="layui-form-label">验证码</label>
                  <div class="layui-input-inline">
                    <input
                      type="text"
                      name="vercode"
                      v-model="vercode"
                      placeholder="请输入验证码"
                      autocomplete="off"
                      class="layui-input"
                    />
                  </div>
                    <div>
                      <span class="svg" style="color: #c00;" @click="_getCode()" v-html="svg1"></span>
                    </div>
                  </div>
                    <div class="layui-form-mid">
                      <span style="color: #c00;">{{errors[0]}}</span>
                    </div>
                  </validation-provider>
                  </div>
                <div class="layui-form-item">
                  <button class="layui-btn" lay-filter="*" lay-submit>立即注册</button>
                </div>
                <div class="layui-form-item fly-form-app">
                  <span>或者直接使用社交账号快捷注册</span>
                  <a
                    href
                    onclick="layer.msg('正在通过QQ登入', {icon:16, shade: 0.1, time:0})"
                    class="iconfont icon-qq"
                    title="QQ登入"
                  ></a>
                  <a
                    href
                    onclick="layer.msg('正在通过微博登入', {icon:16, shade: 0.1, time:0})"
                    class="iconfont icon-weibo"
                    title="微博登入"
                  ></a>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ValidationProvider } from 'vee-validate'
import { getCode } from '@/api/login'
export default {
  name: 'reg',
  components: {
    ValidationProvider
  },
  data () {
    return {
      email: '',
      password: '',
      nickname: '',
      repass: '',
      vercode: '',
      svg1: ''
    }
  },
  mounted () {
    this._getCode()
  },
  methods: {
    // 接受后端图形验证码内容
    _getCode () {
      getCode().then((res) => {
        console.log(res)
        if (res.code === 200) {
          this.svg1 = res.data
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
