<template>
<div class="fly-panel fly-panel-user" pad20>
<div class="layui-tab layui-tab-brief" lay-filter="user" id="LAY_msg" style="margin-top: 15px;">
   <button class="layui-btn layui-btn-danger" id="LAY_delallmsg">清空全部消息</button>
    <div  id="LAY_minemsg" style="margin-top: 10px;">
        <!--<div class="fly-none">您暂时没有最新消息</div>-->
        <ul class="mine-msg">
          <li data-id="123">
            <blockquote class="layui-elem-quote">
              <a href="/jump?username=Absolutely" target="_blank"><cite>Absolutely</cite></a>回答了您的求解<a target="_blank" href="/jie/8153.html/page/0/#item-1489505778669"><cite>layui后台框架</cite></a>
            </blockquote>
            <p><span>1小时前</span><a href="javascript:;" class="layui-btn layui-btn-small layui-btn-danger fly-delete">删除</a></p>
          </li>
          <li data-id="123">
            <blockquote class="layui-elem-quote">
              系统消息：欢迎使用 layui
            </blockquote>
            <p><span>1小时前</span><a href="javascript:;" class="layui-btn layui-btn-small layui-btn-danger fly-delete">删除</a></p>
          </li>
        </ul>
        <Pagination
          v-show="total > 0"
          :total="total"
          :current="page"
          :align="'left'"
          :hasTotal="true"
          :hasSelect="true"
          @changeCurrent="handleChange">
        </Pagination>
      </div>
</div>
</div>
</template>

<script>
import Pagination from '@/components/modules/page/Index'
import { getMsg } from '@/api/user'
export default {
  name: 'user-msg',
  components: {
    Pagination
  },
  data () {
    return {
      lists: [],
      page: 0,
      limit: 10,
      total: 0,
      ws: {}
    }
  },
  mounted () {
    this.getMsgAll()
    this.init()
  },
  methods: {
    onOpen: function () {
      this.ws.send(JSON.stringify({
        event: 'auth',
        message: 'Bearer ' + this.$store.state.token
      }))
      console.log('open:' + this.ws.readyState)
    },
    // 服务端发送回来消息之后
    onMessage: function (event) {
      // 当用户未进入聊天室，则不接收消息
      if (this.isShow) {
        return
      }
      var obj = JSON.parse(event.data)
      switch (obj.event) {
        case 'noauth':
        // 鉴权失败
        // 路由跳转到/login 重新获取token
          this.$router.push({ name: 'login' })
          break
        case 'heartbeat':
          this.ws.send(JSON.stringify({
            event: 'heartbeat',
            message: 'pong'
          }))
          break
        default:
          if (obj.name !== this.name) {
            // 接收正常的聊天消息,除去给自身发送的消息
            this.lists.push(obj.name + ':' + obj.message)
          }
      }
    },
    // 当链接主动断开的时候触发close事件
    onClose: function () {
      console.log('close:' + this.ws.readyState)
      console.log('已经关闭websocket')
      this.ws.close()
    },
    // 当连接失败，触发error事件
    onError: function () {
      console.log('error:' + this.ws.readyState)
      console.log('websocket连接失败')
      // 连接失败后，1s进行断线重连!
      var _this = this
      setTimeout(function () {
        _this.init()
      }, 1000)
    },
    init () {
      this.ws = new WebSocket('ws://127.0.0.1:3001')
      this.ws.onopen = this.onOpen
      this.ws.onmessage = this.onMessage
      this.ws.onclose = this.onClose
      this.ws.onerror = this.onError
    },
    getMsgAll () {
      getMsg({
        page: this.page,
        limit: this.limit
      }).then((res) => {
        console.log(res)
        if (res.code === 200) {
          this.lists = res.data
        }
      })
    },
    handleChange (val) {
      this.page = val
      this.getMsgAll()
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
