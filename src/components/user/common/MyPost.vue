<template>
  <div>
    <table class="layui-table" border="0">
      <thead>
        <tr>
          <th>
            <div class="layui-table-cell pl0" >
              <span class="r">帖子标题</span>
            </div>
          </th>
          <th>
            <div class="layui-table-cell text-center">
              <span>状态</span>
            </div>
          </th>
          <th>
            <div class="layui-table-cell text-center">
              <span>结贴</span>
            </div>
          </th>
          <th>
            <div class="layui-table-cell text-center">
              <span>发表时间</span>
            </div>
          </th>
          <th>
            <div class="layui-table-cell text-center">
              <span>数据</span>
            </div>
          </th>
          <th>
            <div class="layui-table-cell text-center">
              <span>操作</span>
            </div>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr class="text-center">
          <td class="text-left">文章测试标题</td>
          <td>打开</td>
          <td>未结</td>
          <td>2019-01-01</td>
          <td>10阅/2答</td>
          <td>
            <div class="layui-btn layui-btn-xs">编辑</div>
            <div class="layui-btn layui-btn-xs layui-btn-danger">删除</div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: 'myPost'
}
</script>

<style lang="scss" scoped>

</style>
