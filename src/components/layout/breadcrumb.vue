<!--
 * @Author: your name
 * @Date: 2021-09-11 17:20:37
 * @LastEditTime: 2021-11-11 17:28:42
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \deviceManagementPlatform\src\components\layout\breadcrumb.vue
-->
<template>
  <div>
    <div class="breadcrumb">
      <div class="breadcrumb-left">
        <i
          class="transition-box"
          :class="{
            rotate360: this.showAnimate,
            'el-icon-s-unfold': this.isCollapse,
            'el-icon-s-fold': !this.isCollapse,
          }"
          @click="showMenu(isCollapse)"
          @animationend="reset()"
        ></i>
        <el-breadcrumb>
          <!-- <el-breadcrumb-item @click="jumpIndex()" :to="{ path: '/' }">首页</el-breadcrumb-item> -->
          <el-breadcrumb-item
            ><a @click="jumpIndex()">首页</a></el-breadcrumb-item
          >
          <el-breadcrumb-item>{{ this.$route.name }}</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div class="breadcrumb-right">
        <el-popover placement="top" width="160" v-model="logoutVisible">
          <p>确定要退出登录吗？</p>
          <div style="text-align: right; margin: 0">
            <el-button size="mini" type="text" @click="logoutVisible = false"
              >取消</el-button
            >
            <el-button type="primary" size="mini" @click="logout"
              >确定</el-button
            >
          </div>
          <el-button slot="reference" type="text">退出登录</el-button>
        </el-popover>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isCollapse: false,
      showAnimate: false,
      logoutVisible:false,
    };
  },
  mounted() {
  },
  methods: {
    // 退出登录
    logout(){
      localStorage.clear();
      this.logoutVisible=false
      setTimeout(() => {
        this.$router.push('/login')
      }, 500);
    },
    jumpIndex() {
      this.$router.push("/");
      localStorage.setItem("path", "/");
    },
    showMenu(e) {
      if (e) {
        this.$bus.$emit("foleMenu", (this.isCollapse = false));
      } else {
        this.$bus.$emit("foleMenu", (this.isCollapse = true));
      }
      this.showAnimate = true;
    },
    reset() {
      this.showAnimate = false;
    },
  },
};
</script>

<style scoped>
.breadcrumb {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #ffffff;
  height: 40px;
  padding: 0 20px 0 10px;
}
.breadcrumb-left {
  display: flex;
  align-items: center;
}
.el-icon-s-fold,
.el-icon-s-unfold {
  font-size: 24px;
  margin-left: 10px;
  margin-right: 20px;
}

@keyframes rorate360 {
  100% {
    transform: rotate(360deg);
  }
}
.rotate360 {
  animation: rorate360 1s;
}
</style>