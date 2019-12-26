<template>
      <div class="fly-panel fly-signin">
        <div class="fly-panel-title">
          签到
          <i class="fly-mid"></i>
          <a href="javascript:;" class="fly-link"
           id="LAY_signinHelp" @click="showInfo()">说明</a>
          <i class="fly-mid"></i>
          <a href="javascript:;" class="fly-link"
           id="LAY_signinTop" @click="showTop()">
           活跃榜<span class="layui-badge-dot"></span></a>
          <span class="fly-signin-days" v-show="isSign || isLogin">
            已连续签到
            <cite>{{count}}</cite>天
          </span>
        </div>
        <div class="fly-panel-main fly-signin-main">
          <template v-if="!isSign">
            <button class="layui-btn layui-btn-danger"
             id="LAY_signin" @click="sign()">今日签到</button>
            <span>可获得
              <cite>{{favs}}</cite>飞吻
            </span>
          </template>
          <!-- 已签到状态 -->
          <template v-else>
            <button class="layui-btn layui-btn-disabled">今日已签到</button>
            <span>获得了<cite>20</cite>飞吻</span>
          </template>
        </div>
        <sign-info :isShow="isShow" @closeModal="close()"></sign-info>
        <sign-list :isShow="showList" @closeModal="close()"></sign-list>
      </div>
</template>

<script>
import SignInfo from './SignInfo'
import SignList from './SignList'
import moment from 'dayjs'
import { userSign } from '@/api/user'
export default {
  name: 'sign',
  components: {
    SignInfo,
    SignList
  },
  data () {
    return {
      isShow: false,
      showList: false,
      current: 0,
      isSign: false,
      msg: '',
      ctrl: ''
    }
  },
  mounted () {
    // 判断用户的上一次签到时间与签到状态
    // 如果用户上一次签到时间与当天的签到日期相差一天，允许用户进行签到
    const isSign = this.$store.state.userInfo.isSign
    const lastSign = this.$store.state.userInfo.lastSign
    const nowDate = moment().format('YYYY-MM-DD')
    const lastDate = moment(lastSign).format('YYYY-MM-DD')
    const diff = moment(nowDate).diff(moment(lastDate), 'day')
    if (diff > 0 && isSign) {
      this.isSign = false
    } else {
      this.isSign = isSign
    }
  },
  computed: {
    isLogin () {
      return this.$store.state.isLogin
    },
    favs () {
      let count = parseInt(this.count)
      let result = 0
      if (count < 5) {
        result = 5
      } else if (count >= 5 && count < 15) {
        result = 10
      } else if (count >= 15 && count < 30) {
        result = 20
      } else if (count >= 30 && count < 100) {
        result = 30
      } else if (count >= 365) {
        result = 50
      }
      return result
    },
    // 取用户签到的天数
    count () {
      if (this.$store.state.userInfo !== {}) {
        if (typeof this.$store.state.userInfo.count !== 'undefined') {
          return this.$store.state.userInfo.count
        } else {
          return 0
        }
      } else {
        return 0
      }
    }
  },
  methods: {
    showInfo () {
      this.isShow = true
    },
    showTop () {
      this.showList = true
    },
    close () {
      this.isShow = false
      this.showList = false
    },
    choose (val) {
      this.current = val
    },
    sign () {
      if (!this.isLogin) {
        this.$pop('shake', '请先登录')
        return
      }
      userSign().then((res) => {
        let user = this.$store.state.userInfo
        if (res.code === 200) {
          user.favs = res.favs
          user.count = res.count
          this.$pop('', '签到成功!')
        } else {
          // 用户已经签到
          this.$pop('', '您已经签到!')
        }
        user.isSign = true
        user.lastSign = res.lastSign
        this.isSign = true
        this.$store.commit('setUserInfo', user)
      })
    }
  }
}
</script>

<style lang="scss">
@keyframes bounceIn {
  0% {
    opacity: 0;
    transform: scale(0.5);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }

}
.mask {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.8);
  z-index: 20000;
}

.layui-layer {
  position: fixed;
  width: 300px;
  height: 480px;
  top:50%;
  left: 50%;
  margin-top: -240px;
  margin-left: -150px;
  background: #fff;
  z-index: 21000;
  &.active {
    animation-fill-mode: both;
    animation-duration: 0.3s;
    animation-name: bounceIn;
  }
  .layui-layer-title {
    height: 42px;
    line-height: 42px;
    padding:0 20px;
    color: #333;
    background-color: #f8f8f8;
  }
  .layui-layer-content {
    padding:20px;
  }
  .layui-tab-content {
    padding: 0 10px;
  }
  .layui-tab-item {
    line-height: 45px;
    li {
      border-bottom: 1px dotted #dcdcdc;
      &:last-child {
        border-bottom: none;
      }
    }
    img {
      width: 30px;
      height: 30px;
      border-radius: 2px;
      margin-right: 1px;
    }
  }
}
</style>
