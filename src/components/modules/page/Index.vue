<template>
<div :class="{'text-center': align === 'center'
,'text-left': align === 'left', 'text-right': align === 'right'}">
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
</div>

</template>

<script>
export default {
  props: {
    align: {
      type: String,
      default: 'center'
    },
    showType: {
      type: String,
      default: 'text'
    },
    showEnd: {
      type: Boolean,
      default: false
    },
    theme: {
      type: String,
      default: 'layui-bg-green'
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
</style>
