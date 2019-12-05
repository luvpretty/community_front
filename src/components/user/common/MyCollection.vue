<template>
  <div>
    <table class="layui-table">
      <thead>
        <tr>
          <th class="title">
            <div class="layui-table-cell pl0">
              <span>帖子标题</span>
            </div>
          </th>
          <th>
            <div class="layui-table-cell text-right pr0">
              <span>收藏时间</span>
            </div>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>收藏的帖子标题123</td>
          <td class="text-right">2019-01-01</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: 'myCollection'
}
</script>

<style lang="scss" scoped>
.title {
  width: 70%;
}
</style>
