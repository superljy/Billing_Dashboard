<template>
  <div id="app">
    <el-container>
      <el-header class="header">
        <vheader></vheader>
      </el-header>
      <el-container>
        <el-aside width="200px">
          <navmenu></navmenu>
        </el-aside>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import NavMenu from '@/components/NavMenu'
import Header from '@/components/Header'
export default {
  name: 'App',
  components: {
    'navmenu': NavMenu,
    'vheader': Header
  },
  //页面加载时判断当前路径是否在首页,不是就自动跳转回首页
  mounted() {
    window.addEventListener('load', () => {
      if (this.$route.path !== '/home') {
        this.$router.replace('/home')
      }
    })
  }
}
</script>

<style>
body {
  margin: 0;
  padding: 0;
}
.header {
  background-color: #409eff;
  color: #fff;
  line-height: 60px;
}
</style>
