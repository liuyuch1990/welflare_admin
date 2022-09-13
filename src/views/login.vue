<template>
  <!-- 登录 -->
  <div class="container relative">
    <!-- <img
      class="container_image absolute"
      src="../assets/background-login.png"
      alt=""
    /> -->
    <!-- <div class="container_image">

    </div> -->
    <div class="content">
      <div class="title">
        <img src="../assets/logo.png" alt="" />
        <span>福利电商管理平台</span>
      </div>
      <div class="flex-between">
        <!-- <div class="content_left">
          <p class="content_left_title">章鱼云</p>
          <p class="content_left_subTitle">构建万物互联 赋能5G时代</p>
          <p class="content_left_info">
            专注可视化开发，让数据栩栩如生
            提供工业物联网平台、智慧工厂、智慧园区、能源动力、定制化开发等专业物联网服务
          </p>
        </div> -->
        <div class="content_right">
          <div class="content_right-bg relative">
            <div class="content_right-form absolute">
              <p class="flex-around">
                <span class="login-title">登录</span>
              </p>
              <p class="login-title-ENG">
                Connect the real world and the internet world!
              </p>
              <div class="login-input-div">
                <el-form
                  :model="form"
                  :rules="rules"
                  status-icon
                  ref="ruleForm"
                  class="demo-ruleForm"
                >
                  <el-form-item prop="userPhone">
                    <el-input
                      class="login-input-username"
                      placeholder="请输入用户名"
                      v-model="form.userPhone"
                    >
                      <i
                        slot="prefix"
                        class="el-input__icon icon-yonghuming"
                      ></i>
                    </el-input>
                  </el-form-item>
                  <el-form-item prop="userPwd">
                    <el-input
                      class="login-input-password"
                      type="password"
                      placeholder="请输入密码"
                      v-model="form.userPwd"
                    >
                      <i slot="prefix" class="el-input__icon icon-mima"></i>
                    </el-input>
                  </el-form-item>
                </el-form>
              </div>
              <el-button class="login-btn" type="primary" @click="login"
                >登录</el-button
              >
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    // 手机号校验方法
    let validateUserPhone = (rule, value, callback) => {
      let reg = /^1[3456789]\d{9}$/;
      if (!value) {
        callback(new Error("请输入手机号"));
      } else {
        if (!reg.test(value)) {
          callback(new Error("手机号格式不正确"));
        } else {
          callback();
        }
      }
    };
    return {
      form: {
        userPhone: "15130348585",
        userPwd: "111111",
      },
      rules: {
        userPhone: [{ validator: validateUserPhone, trigger: "blur" }],
        userPwd: [{ required: true, message: "请输入密码", trigger: "blur" }],
      },
    };
  },
  mounted() {},
  methods: {
    login() {
      this.form.userPwd = this.$md5(this.form.userPwd) + "aab";
      this.$request
        .post(this.api.login, this.form)
        .then((res) => {
          this.$message.success("登录成功");
          sessionStorage.setItem("onlineAdmin-Token", res.data.token);
          this.$router.push("/");
          this.form.userPwd = "";
        })
        .catch((err) => {
          this.$message.error(err.message);
        });
    },
  },
};
</script>

<style scoped>
.container {
  width: 100%;
  height: 100%;
}
.container_image {
  width: 100%;
  height: 100%;
  z-index: -10;
}
.content {
  padding: 24px;
}
.title {
  height: 60px;
  display: flex;
  align-items: center;
  color: #292929;
  margin-left: 20px;
}
.title > img {
  /* width: 32px; */
  height: 32px;
  margin-right: 6px;
}
.title > span {
  font-size: 32px;
}
.content_left {
  width: 35%;
}
.content_right {
  width: 100%;
}
.content_left_title {
  font-size: 28px;
  font-weight: 700;
  text-align: center;
  margin-top: 30%;
  color: #000000;
}
.content_left_subTitle {
  font-size: 28px;
  text-align: center;
  margin-top: 10%;
  color: #383838;
}
.content_left_info {
  width: 80%;
  margin: 0 auto;
  margin-top: 6%;
}
.content_right-bg {
  width: 730px;
  height: 320px;
  background-color: #323232;
  border-radius: 4px;
  box-shadow: #a5a5a5 20px -20px 0 0;
  margin: 0 auto;
  margin-top: 12%;
}
.content_right-form {
  padding: 20px;
  width: 390px;
  height: 510px;
  background: #ffffff;
  border-radius: 4px;
  top: -38%;
  left: 22%;
  box-shadow: #606060 5px 12px 40px 0;
}
.login-title {
  font-size: 20px;
  text-align: center;
  border-bottom: 5px solid #707070;
  border-radius: 5%;
  margin-top: 20px;
}
.login-title-ENG {
  font-size: 12px;
  text-align: center;
  margin-top: 10px;
}
.login-input-div {
  width: 90%;
  margin: 0 auto;
  margin-top: 50px;
}
.login-input-username,
.login-input-password {
  margin-top: 30px;
}
.login-btn {
  display: block;
  margin: 0 auto;
  margin-top: 60px;
  width: 300px;
  background: #707070;
  border: 0;
}
.login-btn:hover {
  background: #0c0c0c;
}
</style>