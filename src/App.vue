<!--
 * @Author: your name
 * @Date: 2021-10-30 09:51:57
 * @LastEditTime: 2021-11-04 14:53:26
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \deviceManagementPlatform\src\App.vue
-->
<template>
  <div id="app">
    <transition name="moveL">
      <router-view />
    </transition>
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
    };
  },
  mounted() {
    console.log(process.env.VUE_APP_LINK)
    // setInterval(() => {
    //    this.$notify({
    //       title: '报警',
    //       dangerouslyUseHTMLString: true,
    //       message: `<strong>一号油罐故障</strong>`,
    //       type: 'error'
    //     });
    // }, 10000);
  },
};
</script>

<style>
html,
body,
#app {
  height: 100%;
}
body {
  margin: 0;
  padding: 0;
  font-family: "SiYuanHeiTi";
}
.moveL-enter-active,
.moveL-leave-active {
  /* transition: all 1s; */
}
.moveL-enter,
.moveL-leave-to {
  opacity: 0;
}
.moveL-enter-to,
.moveL-leave {
  opacity: 1;
  transition: all 1s;
}
</style>