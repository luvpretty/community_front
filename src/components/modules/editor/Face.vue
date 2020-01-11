<template>
  <transition name="fade">
    <div class="layui-layer layui-layer-tips
     layui-edit-face edit-content" v-show="isShow">
      <div class="layui-layer-content">
        <ul class="layui-clear">
          <li v-for="(value, key) in lists"
           :key="key" @click="handleFaceClick(key)">
            <img :src="value" alt="">
          </li>
        </ul>
      </div>
    </div>
  </transition>
</template>

<script>
import faces from '@/assets/js/face'
export default {
  name: 'Face',
  props: ['isShow', 'ctrl'],
  data () {
    return {
      lists: faces
    }
  },
  methods: {
    handleFaceClick (item) {
      this.$emit('addEvent', item)
    },
    handleBodyClick (e) {
      e.stopPropagation()
      if (typeof this.ctrl === 'undefined') { return }
      // 触发隐藏本组件的关闭事件,改变isShow
      // 判断是否点击到了非控制ICON以外的地方,没有点击控制ICON才触发关闭事件
      if (!this.ctrl.contains(e.target)) {
        this.$emit('closeEvent')
      }
    }
  },
  mounted () {
    this.$nextTick(() => {
      document.querySelector('body').addEventListener('click',
        this.handleBodyClick)
    })
  },
  beforeDestroy () {
    document.querySelector('body').addEventListener('click',
      this.handleBodyClick)
  }
}
</script>

<style lang="scss" scoped>
.edit-content {
  position: absolute;
  top: 45px;
  left: 0;
}
</style>
