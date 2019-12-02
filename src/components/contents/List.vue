<template>
      <div class="fly-panel" style="margin-bottom: 0;">
        <div class="fly-panel-title fly-filter">
          <a :class="{'layui-this': status ==='' && tag=== ''}"
          @click.prevent="search()">综合</a>
          <span class="fly-mid"></span>
          <a :class="{'layui-this': status ==='0'}"
          @click.prevent="search(0)">未结</a>
          <span class="fly-mid"></span>
          <a :class="{'layui-this': status ==='1'}"
          @click.prevent="search(1)">已结</a>
          <span class="fly-mid"></span>
          <a :class="{'layui-this': status ==='' && tag=== '精华'}"
          @click.prevent="search(2)">精华</a>
          <span class="fly-filter-right layui-hide-xs">
            <a :class="{'layui-this': sort === 'created'}"
          @click.prevent="search(3)">按最新</a>
            <span class="fly-mid"></span>
            <a :class="{'layui-this': sort === 'answer'}"
          @click.prevent="search(4)">按热议</a>
          </span>
        </div>
        <list-item :lists="lists" @nextpage="nextPage" :isEnd="isEnd"></list-item>
      </div>
</template>

<script>
import { getList } from '@/api/content'
import ListItem from './ListItem'
export default {
  name: 'list',
  data () {
    return {
      isEnd: false,
      isRepeat: false,
      status: '',
      tag: '',
      sort: 'created',
      page: 0,
      limit: 10,
      catalog: '',
      current: '',
      lists: []
    }
  },
  components: {
    ListItem
  },
  watch: {
    current (newval, oldval) {
      this.init()
    },
    '$route' (newval, oldval) {
      let catalog = this.$route.params['catalog']
      if (catalog !== '' && typeof catalog !== 'undefined') {
        this.catalog = catalog
      }
      this.init()
    }
  },
  mounted () {
    let catalog = this.$route.params['catalog']
    if (catalog !== '' && typeof catalog !== 'undefined') {
      this.catalog = catalog
    }
    this._getLists()
  },
  methods: {
    init () {
      this.page = 0
      this.isEnd = false
      this.lists = []
      this._getLists()
    },
    _getLists () {
      // if (this.isRepeat) return
      console.log(this.isEnd)
      if (this.isEnd) return
      this.isRepeat = true
      let options = {
        catalog: this.catalog,
        isTop: 0,
        page: this.page,
        limit: this.limit,
        sort: this.sort,
        tag: this.tag,
        status: this.status
      }
      getList(options).then((res) => {
        // 加入一个请求锁，防止多次点击，等待数据返回再打开
        // this.isRepeat = false
        console.log(res)
        // 判断lists长度是否为0，为0可以直接赋值
        // 当lists长度不为0，后面请求的数据加入到lists中
        // 非200错误处理
        if (res.code === 200) {
          // 判断res.data的长度，如果小于20条则为最后一页
          if (res.data.length < this.limit) {
            this.isEnd = true
          }
          if (this.lists.length === 0) {
            this.lists = res.data
          } else {
            this.lists = this.lists.concat(res.data)
          }
        }
      }).catch((err) => {
        console.log(err)
        if (err) {
          // this.isRepeat = false
          this.$alert(err.message)
        }
      })
    },
    nextPage () {
      this.page++
      this._getLists()
    },
    search (val) {
      if (typeof val === 'undefined' && this.current === '') {
        return
      }
      this.current = val
      console.log(val)
      switch (val) {
        // 未结贴
        case 0:
          this.status = '0'
          this.tag = ''
          break
        // 已结贴
        case 1:
          this.status = '1'
          this.tag = ''
          break
        // 查询精华
        case 2:
          this.status = ''
          this.tag = '精华'
          break
        // 按照时间查询
        case 3:
          this.sort = 'created'
          break
        // 按照评论数查询
        case 4:
          this.sort = 'answer'
          break
        default:
          this.status = ''
          this.tag = ''
          this.current = ''
      }
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
