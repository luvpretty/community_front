<template>
  <div class="edit-wrap">
    <div class="layui-form-item layui-form-text">
      <div class="layui-input-block">
        <div class="layui-unselect fly-edit">
          <!-- 表情 -->
          <span @click="()=> {this.faceStatus =!this.faceStatus}
            " ref="face" >
            <i class="layui-icon">&#xe650;</i>
          </span>
          <!-- 图片 -->
          <span><i class="layui-icon">&#xe64a;</i></span>
          <!-- 链接 -->
          <span><i class="layui-icon">&#xe64c;</i></span>
          <!-- 引用 -->
          <span class="quote">"</span>
          <!-- 代码 -->
          <span><i class="layui-icon">&#xe64e;</i></span>
          <!-- 水平线 -->
          <span>hr</span>
          <!-- 预览 -->
          <span ><i class="layui-icon">&#xe705;</i></span>
        </div>
        <textarea class="layui-textarea fly-editor" name="content">
        </textarea>
      </div>
    </div>
    <face :isShow="faceStatus" :ctrl="this.$refs.face" @closeEvent="()=> {
      this.faceStatus = false}"></face>
  </div>
</template>

<script>
import Face from './Face'
export default {
  name: 'Editor',
  components: {
    Face
  },
  data () {
    return {
      faceStatus: false
    }
  }
}
</script>

<style lang="scss">
@keyframes bounceIn {
  0% {
    opacity: 0;
    transform: scale(0.5)
  }
  100% {
    opacity: 1;
    transform: scale(1)
  }
}

@keyframes bounceOut {
  0% {
    transform: scale(1)
  }
  30% {
    transform: scale(1.05)
  }
  100% {
    transform: scale(0.7)
  }
}

.fade-leave-active {
  animation: bounceOut 0.3s;
}

.fade-enter-active
.fade-enter-to {
  animation: bounceIn 0.3s;
}

.fly-editor {
  height: 260px;
}
.quote {
  font-size: 22px;
  vertical-align: middle;
  position: relative;
  top: 4px;
}
.edit-wrap {
  position: relative;
}
</style>
