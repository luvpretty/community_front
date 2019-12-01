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
        <list-item :lists="lists" @nextpage="nextPage"></list-item>
      </div>
</template>

<script>
import { getList } from '@/api/content'
import ListItem from './ListItem'
export default {
  name: 'list',
  data () {
    return {
      status: '',
      tag: '',
      sort: 'created',
      page: 0,
      limit: 20,
      catalog: '',
      lists: [{
        uid: {
          name: 'luvpretty',
          isVip: 1
        },
        title: '大前端',
        content: '',
        created: '2019-10-01 01:00:00',
        catalog: 'ask',
        fav: 10,
        isEnd: 0,
        reads: 10,
        answer: 0,
        status: 0,
        isTop: 0,
        tags: [
          {
            name: '精华',
            class: 'layui-bg-red'
          },
          {
            name: '热门',
            class: 'layui-bg-blue'
          }
        ]
      }]
    }
  },
  components: {
    ListItem
  },
  mounted () {
    this._getLists()
  },
  methods: {
    _getLists () {
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
        console.log(res)
      })
    },
    nextPage () {
      this.page++
      this._getLists()
    },
    search (val) {
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
      }
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
