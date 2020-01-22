<template>
<div class="d-flex" :class="{'flex-center': align === 'center'
,'flex-start': align === 'left', 'flex-end': align === 'right'}">
<div class="layui-box layui-laypage layui-laypage-default">
 <a href="javascript:;" class="layui-laypage-prev
  layui-disabled" data-page="0" v-show="showEnd">
   <i class="layui-icon layui-icon-prev" v-if="showType === 'icon'"></i>
   <template v-else>首页</template>
 </a>
 <a href="javascript:;" data-page="2">
   <i class="layui-icon layui-icon-left" v-if="showType === 'icon'"></i>
   <template v-else>上一页</template>
 </a>
 <a href="javascript:;" :class="[true ? theme: '', true ? 'active': '']">1</a>
 <a href="javascript:;">2</a>
 <a href="javascript:;">3</a>
 <a href="javascript:;">4</a>
 <a href="javascript:;">5</a>
 <a href="javascript:;">
   <i class="layui-icon layui-icon-right" v-if="showType === 'icon'"></i>
   <template v-else>下一页</template>
 </a>
 <a href="javascript:;" class="layui-laypage-next" data-page="2" v-show="showEnd">
   <i class="layui-icon layui-icon-next" v-if="showType === 'icon'"></i>
   <template v-else>尾页</template>
 </a>
 </div>
 <div class="total" v-if="hasTotal">
   到第<input type="text" class="imooc-input">页 共 total 页
 </div>
 <div v-if="hasSelect">
   <div class="layui-unselect layui-form-select"
    :class="{'layui-form-selected': isSelect}"
    @click="changeFav">
    <div class="layui-select-title">
      <input
        type="text"
        placeholder="请选择"
        readonly
        v-model="options[optIndex]"
        class="layui-input layui-unselect"
      >
        <i class="layui-edge"></i>
    </div>
    <dl class="layui-anim layui-anim-upbit">
        <dd v-for="(item,index) in options"
         @click="chooseFav(item, index)"
         :key="'catalog' + index"
         :class="{'layui-this': index === optIndex}">
          {{item}}
        </dd>
    </dl>
</div>
 </div>
</div>

</template>

<script>
import _ from 'lodash'
export default {
  props: {
    align: {
      type: String,
      default: 'center'
    },
    showType: {
      type: String,
      default: 'icon'
    },
    showEnd: {
      type: Boolean,
      default: false
    },
    theme: {
      type: String,
      default: 'layui-bg-green'
    },
    hasTotal: {
      type: Boolean,
      default: false
    },
    hasSelect: {
      type: Boolean,
      default: false
    },
    // 总页数
    total: {
      type: Number,
      default: 0
    },
    // 当前页数
    current: {
      type: Number,
      default: 0
    },
    // 与options重叠,
    size: {
      type: Number,
      default: 10
    }
  },
  data () {
    return {
      isSelect: false,
      optIndex: 0,
      options: [10, 20, 30, 50, 100],
      pages: [],
      limit: 10
    }
  },
  mounted () {
    // 初始化分页的长度
    this.initPages()
    // 设置下拉选择分页框的内容
    this.limit = this.size
    // 将分页数推入options
    this.options = _.uniq(_.sortBy(_.concat(this.options, this.size)))
    // 取得size在数组中的位置
    this.optIndex = this.options.indexOf(this.size)
  },
  methods: {
    initPages () {
      const len = Math.ceil(this.total / this.size)
      // 5 -> [1,2,3,4,5]
      this.pages = _.range(1, len + 1)
    },
    chooseFav (item, index) {
      this.optIndex = index
    },
    changeFav () {
      this.isSelect = !this.isSelect
    }
  }
}
</script>

<style lang="scss" scoped>
.layui-laypage {
  a {
    margin-left: -1px;
    &.active {
      border-radius: 2px;
      position: relative;
      z-index: 100;
    }
  }
.layui-bg-green {
    border-color: #009688;
  }
}
.total {
    color: rgba(51, 51, 51, 1);
    margin-left: 10px;
    position: relative;
    top: -2px;
  }

.imooc-input {
    width: 30px;
    padding: 0 10px;
    height: 28px;
    line-height: 28px;
}

.layui-input {
  height: 30px;
  line-height: 30px;
}

.layui-form-select {
  width: 80px;
  position: relative;
  top: -2.5px;
  margin-left: 10px;
}
</style>
