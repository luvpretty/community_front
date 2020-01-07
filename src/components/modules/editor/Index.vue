<template>
  <div class="edit-wrap">
    <div class="layui-form-item layui-form-text">
      <div class="layui-input-block">
        <div class="layui-unselect fly-edit">
          <!-- 表情 -->
          <span><i class="layui-icon">&#xe650;</i></span>
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
  </div>
</template>

<script>
export default {
  name: 'Editor'
}
</script>

<style lang="scss" scoped>
.fly-editor {
  height: 260px;
}
.quote {
  font-size: 22px;
  vertical-align: middle;
  position: relative;
  top: 4px;
}
</style>
