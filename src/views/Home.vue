<template>
  <div>
    <panel></panel>
    <div class="layui-container">
      <div class="layui-row layui-col-space15">
        <div class="layui-col-md8">
          <list></list>
        </div>
        <div class="layui-col-md4">
          <tips></tips>
          <sign></sign>
          <hot-list></hot-list>
          <ads></ads>
          <links></links>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Panel from '@/components/Panel'
import List from '@/components/contents/List'
import Tips from '@/components/sidebar/Tips'
import Sign from '@/components/sidebar/Sign'
import HotList from '@/components/sidebar/HotList'
import Links from '@/components/sidebar/Links'
import Ads from '@/components/sidebar/Ads'
export default {
  name: 'home',
  components: {
    Panel,
    List,
    Tips,
    Sign,
    HotList,
    Links,
    Ads
  }
}
</script>

<style lang="scss" scoped>
</style>
