<!--
 * @Author: your name
 * @Date: 2021-09-11 17:20:37
 * @LastEditTime: 2021-11-04 15:34:43
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: \online-shop-admin\src\components\layout\layoutIndex.vue
-->
<template>
  <div>
    <el-container  class="layout-container">
      <!-- <el-header height="48px"><navigation></navigation></el-header> -->
      <el-container>
        <el-aside width="auto">
           <menu-list></menu-list>
           </el-aside>
        <el-main>
          <breadcrumb></breadcrumb>
          <!-- <keep-alive> -->
            <router-view class="el-main-content"></router-view>
          <!-- </keep-alive> -->
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import Breadcrumb from './breadcrumb.vue';
import MenuList from "./menuList.vue";
// import navigation from "./navigation.vue";
export default {
  data() {
    return {
      menuWidth: "200",
    };
  },
  mounted(){

  },
  components: {  MenuList, Breadcrumb },
};
</script>   

<style scoped>
.layout-container {
  background: #f2f3f5;
  height: 100vh;
}
body > .el-container {
  width: 100%;
}
.el-header {
  text-align: center;
  padding: 0;
}
.el-main{
  padding:0;
}
.el-main-content {
   background: #ffffff;
  margin: 0 auto;
  margin: 32px;
  padding: 32px 32px 32px 32px;
    max-width:calc(100% - 64px);
  min-height: calc(100vh - 168px);
}
</style>