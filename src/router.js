import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/Home'
import store from '@/store'
import jwt from 'jsonwebtoken'
import moment from 'dayjs'

const Login = () => import(/* webpackChunkName: 'login' */ './views/Login.vue')
const Reg = () => import(/* webpackChunkName: 'reg' */ './views/Reg.vue')
const Forget = () =>
  import(/* webpackChunkName: 'forget' */ './views/Forget.vue')
const Index = () =>
  import(/* webpackChunkName: 'index' */ './views/channels/Index.vue')
const Template1 = () =>
  import(/* webpackChunkName: 'template1' */ './views/channels/Template1.vue')
const Center = () =>
  import(/* webpackChunkName: 'center' */ './views/Center.vue')
const UserCenter = () =>
  import(/* webpackChunkName: 'user-center' */ './components/user/Center.vue')
const Settings = () =>
  import(/* webpackChunkName: 'settings' */ './components/user/Settings.vue')
const Posts = () =>
  import(/* webpackChunkName: 'user-post' */ './components/user/Posts.vue')
const Msg = () =>
  import(/* webpackChunkName: 'user-msg' */ './components/user/Msg.vue')
const Others = () =>
  import(/* webpackChunkName: 'user-others' */ './components/user/Others.vue')
const User = () =>
  import(/* webpackChunkName: 'user' */ './views/User.vue')
const MyInfo = () =>
  import(/* webpackChunkName: 'info' */ './components/user/common/MyInfo.vue')
const PicUpload = () =>
  import(/* webpackChunkName: 'uploadpic' */ './components/user/common/PicUpload.vue')
const Passwd = () =>
  import(/* webpackChunkName: 'password' */ './components/user/common/Passwd.vue')
const Accounts = () =>
  import(/* webpackChunkName: 'accounts' */ './components/user/common/Accounts.vue')
const MyPost = () =>
  import(/* webpackChunkName: 'mypost' */ './components/user/common/MyPost.vue')
const MyCollection = () =>
  import(/* webpackChunkName: 'mycollection' */ './components/user/common/MyCollection.vue')
const NoFound = () =>
  import(/* webpackChunkName: 'notfound' */ './views/NoFound.vue')
const Confirm = () =>
  import(/* webpackChunkName: 'confirm' */ './views/Confirm.vue')
const Reset = () =>
  import(/* webpackChunkName: 'reset' */ './views/Reset.vue')
Vue.use(Router)

const router = new Router({
  linkExactActiveClass: 'layui-this',
  routes: [
    {
      path: '/',
      component: Home,
      children: [
        {
          path: '',
          name: 'index',
          component: Index
        },
        {
          path: '/index/:catalog',
          name: 'catalog',
          component: Template1
        }
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/confirm',
      name: 'confirm',
      component: Confirm
    },
    {
      path: '/reset',
      name: 'reset',
      component: Reset
    },
    {
      path: '/reg',
      name: 'reg',
      component: Reg,
      // 禁止用户直接访问注册页面
      beforeEnter: (to, from, next) => {
        if (from.name === 'login') {
          next()
        } else {
          next('/login')
        }
      }
    },
    {
      path: '/forget',
      name: 'forget',
      component: Forget
    },
    {
      path: '/user/:uid',
      name: 'home',
      props: true,
      component: User
    },
    {
      path: '/center',
      component: Center,
      meta: { requiresAuth: true },
      linkActiveClass: 'layui-this',
      children: [
        {
          path: '',
          name: 'center',
          component: UserCenter
        },
        {
          path: 'set',
          component: Settings,
          children: [
            {
              path: '',
              name: 'info',
              component: MyInfo
            },
            {
              path: 'pic',
              name: 'pic',
              component: PicUpload
            },
            {
              path: 'passwd',
              name: 'passwd',
              component: Passwd
            },
            {
              path: 'account',
              name: 'account',
              component: Accounts
            }
          ]
        },
        {
          path: 'posts',
          component: Posts,
          children: [
            {
              path: '',
              name: 'mypost',
              component: MyPost
            },
            {
              path: 'mycollection',
              name: 'mycollection',
              component: MyCollection
            }
          ]
        },
        {
          path: 'msg',
          name: 'msg',
          component: Msg
        },
        {
          path: 'others',
          name: 'others',
          component: Others
        }
      ]
    },
    // 404页面
    {
      path: '/404',
      component: NoFound
    },
    // 访问不存在页面返回404页面
    {
      path: '*',
      redirect: '/404'
    }
  ]
})

// 全局路由守卫
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token')
  const userInfo = JSON.parse(localStorage.getItem('userInfo'))
  if (token !== '' && token !== null) {
    const payload = jwt.decode(token)
    // 判断iwt有没有过期,过期则清楚本地缓存信息
    if (moment().isBefore(moment(payload.exp * 1000))) {
      store.commit('setToken', token)
      store.commit('setUserInfo', userInfo)
      store.commit('setIsLogin', true)
    } else {
      localStorage.clear()
    }
  }
  // 判断有无meta状态量，有则需要登录状态才能跳转，没有直接跳转
  if (to.matched.some(record => record.meta.requiresAuth)) {
    const isLogin = store.state.isLogin
    // 需要用户登录的页面
    if (isLogin) {
      // 已经登录状态
      // 权限判断meta元数据
      next()
    } else {
      // 未登录状态
      next('/login')
    }
  } else {
    // 公共页面，不需要用户登录
    next()
  }
})

export default router
