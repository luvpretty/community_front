import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/Home'

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

Vue.use(Router)

export default new Router({
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
      linkActiveClass: 'layui-this',
      children: [
        {
          path: '',
          name: 'center',
          component: UserCenter
        },
        {
          path: 'set',
          name: 'set',
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
          name: 'posts',
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
    }
  ]
})
