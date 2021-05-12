<template>
  <el-row class="tac">
    <el-col :span="24">
      <el-menu
        class="el-menu-vertical-demo"
        @open="handleOpen"
        @close="handleClose"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b"
        unique-opened
        router
      >
        <!-- element-ui使用index来控制路由的跳转,如需要路由跳转的记得在index的值前面加上/ -->
        <el-menu-item index="/home">
          <template slot="title">
            <i class="el-icon-menu"></i>
            <span>首页</span>
          </template>
        </el-menu-item>
        <el-submenu v-for="item in menu" :index="item.id" :key="item.id">
          <template slot="title">
            <i class="el-icon-menu"></i>
            <span v-text="item.name"></span>
          </template>
          <el-menu-item-group
            class="over-hide"
            v-for="sub in item.sub"
            :key="sub.componentName"
          >
            <el-menu-item :index="sub.path" v-text="sub.name"></el-menu-item>
          </el-menu-item-group>
        </el-submenu>
      </el-menu>
    </el-col>
  </el-row>
</template>

<style>
.el-aside {
  height: calc(100vh - 60px);
  background: rgb(84, 92, 100);
}
.el-menu {
  border-right: 0;
}
.over-hide {
  overflow: hidden;
}
a.home {
  text-decoration: none;
  color: #fff;
}
</style>

<script>
import menu from '@/config/menu-config.js'

export default {
  data() {
    return {
      menu: menu
    }
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath)
    }
  }
}
</script>