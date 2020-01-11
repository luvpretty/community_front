<template>
  <div class="edit-wrap">
    <div class="layui-form-item layui-form-text">
      <div class="layui-input-block">
        <div class="layui-unselect fly-edit" ref="icons">
          <!-- 表情 -->
          <span @click="()=> {this.faceStatus =!this.faceStatus}"
             ref="face" >
            <i class="layui-icon">&#xe650;</i>
          </span>
          <!-- 图片 -->
          <span @click="()=> {this.imgStatus =!this.imgStatus}"
             ref="img">
            <i class="layui-icon">&#xe64a;</i>
          </span>
          <!-- 链接 -->
          <span @click="()=> {this.linkStatus =!this.linkStatus}"
            ref="link">
            <i class="layui-icon">&#xe64c;</i>
          </span>
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

    <div ref="modal">
      <face
       :isShow="faceStatus"
       :ctrl="this.$refs.face"
       @closeEvent="()=> {this.faceStatus = false}">
      </face>
      <img-upload
       :isShow="imgStatus"
       :ctrl="this.$refs.img"
       @closeEvent="()=> {this.imgStatus = false}">
      </img-upload>
      <link-add
       :isShow="linkStatus"
       :ctrl="this.$refs.link"
       @closeEvent="()=> {this.linkStatus = false}">
      </link-add>
    </div>
  </div>
</template>

<script>
import Face from './Face'
import ImgUpload from './ImgUpload'
import LinkAdd from './LinkAdd'
export default {
  name: 'Editor',
  components: {
    Face,
    ImgUpload,
    LinkAdd

  },
  data () {
    return {
      faceStatus: false,
      imgStatus: false,
      linkStatus: false
    }
  },
  methods: {
    handleBodyClick (e) {
      e.stopPropagation()
      // 触发隐藏本组件的关闭事件,改变isShow
      // 判断是否点击到了非控制ICON以外+本组件的地方,没有点击控制ICON才触发关闭事件
      if (!(this.$refs.icons.contains(e.target) ||
      this.$refs.modal.contains(e.target))) {
        this.linkStatus = false
        this.faceStatus = false
        this.imgStatus = false
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
.edit-content {
  position: absolute;
  top: 45px;
  left: 0;
}
</style>
