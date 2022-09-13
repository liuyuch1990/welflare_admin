<template>
  <div class="menu">
    <el-menu
      background-color="#3d3d3d"
      text-color="#fff"
      active-text-color="#ff8c56"
      :default-active="this.$route.path"
      :router="true"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
      :collapse="isCollapse"
    >
      <div class="logo">
        <img class="logo-image" src="@/assets/logo.png" alt="" />
        <span v-show="!isCollapse" class="logo-title">管理系统</span>
      </div>
      <template v-for="(menu, index) in this.menuList">
        <el-menu-item
          :key="index"
          :index="menu.keyPath"
          v-if="menu.children == undefined"
        >
          <i :class="menu.icon"></i>

          <span>{{ menu.title }}</span>
        </el-menu-item>

        <el-submenu
          :key="index"
          :index="menu.keyPath"
          v-if="menu.children != undefined"
        >
          <template slot="title">
            <i :class="menu.icon"></i>
            <span>{{ menu.title }}</span>
          </template>
          <template v-for="(item, index) in menu.children">
            <el-menu-item :key="index" :index="item.keyPath">
              <i :class="menu.icon"></i>
              <span>{{ item.title }}</span>
            </el-menu-item>
          </template>
        </el-submenu>
      </template>
    </el-menu>
  </div>
</template>

<script>
export default {
  data() {
    return {
      menuList: [
        // {
        //   index: 1,
        //   keyPath: "/",
        //   title: "首页",
        //   icon: "el-icon-s-home",
        // },
        {
          index: 2,
          keyPath: "/",
          title: "商品管理",
          icon: "el-icon-s-home",
        },
        {
          index: 3,
          keyPath: "/wallet",
          title: "额度管理",
          icon: "el-icon-s-home",
        },
         {
          index: 4,
          keyPath: "/order",
          title: "订单管理",
          icon: "el-icon-s-home",
        },
        {
          index: 5,
          keyPath: "/user",
          title: "用户管理",
          icon: "el-icon-s-home",
        },
      ],
      isCollapse: false,
      activeIndex: "/",
    };
  },
  watch: {
  },
  mounted() {
    this.wsFunc();
    /** 手动折叠从菜单 */
    this.$bus.$on("foleMenu", (res) => {
      this.isCollapse = res;
    });
  },
  methods: {
    wsFunc() {
      window.addEventListener("setItemEvent", (e) => {
        if (e.key == "path") {
          //  默认显示首页
          this.path = e.newValue || "/";
        }
      });
    },
    watchStorage(e) {
      if (e.key == "path") {
        //  默认显示首页
        this.path = e.newValue || "/";
      }
    },
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },

  },
  beforeDestroy() {
    window.removeEventListener("setItemEvent", this.wsFunc);
  },
};
</script>

<style>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  height: 100%;
}
.menu {
  height: 100%;
}
.el-menu-vertical-demo {
  height: 100%;
}

.logo {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px 0 20px 0;
}
.logo-image {
  width: 30px;
  margin-right: 5px;
}
.logo-title {
  color: #fff;
  font-weight: 700;
  font-size: 24px;
}
</style>
