<!--
 * @Author: 1vv
 * @Date: 2021-11-09 13:37:04
 * @LastEditTime: 2022-02-23 16:57:06
 * @LastEditors: Please set LastEditors
 * @Description: 用户管理
 * @FilePath: \online-shop-admin\src\views\user.vue
-->
<template>
  <div class="container">
    <div class="content">
      <el-form :model="queryParams" ref="queryForm">
        <el-row :gutter="10">
          <el-col  :xs="24" :sm="12" :md="8" :lg="4" :xl="4">
            <el-form-item label="手机号" prop="userPhone">
              <el-input
                v-model="queryParams.userPhone"
                size="small"
                placeholder="请输入"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col  :xs="24" :sm="12" :md="8" :lg="4" :xl="4">
            <el-form-item label="工号" prop="userNo">
              <el-input
                v-model="queryParams.userNo"
                size="small"
                placeholder="请输入"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col  :xs="24" :sm="12" :md="8" :lg="4" :xl="4">
            <el-form-item label="公司编码" prop="userCom">
              <el-input
                v-model="queryParams.userCom"
                size="small"
                placeholder="请输入"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item class="searchBtn">
          <el-button
            type="primary"
            icon="el-icon-search"
            round
            size="mini"
            @click="filetrSearch"
            >筛选</el-button
          >
          <el-button
            @click="reset"
            icon="el-icon-refresh"
            type="primary"
            plain
            round
            size="mini"
            >重置</el-button
          >
        </el-form-item>
      </el-form>
      <div>
        <el-row :gutter="10" class="rowsBtn">
          <el-col :span="1.5">
            <el-popover placement="top" width="160" v-model="visibleDwnload">
              <p>确定要导出用户信息吗？</p>
              <div style="text-align: right; margin: 0">
                <el-button
                  size="mini"
                  type="text"
                  @click="visibleDwnload = false"
                  >取消</el-button
                >
                <el-button type="primary" size="mini" @click="handleDownload"
                  >确定</el-button
                >
              </div>
              <el-button
                slot="reference"
                type="primary"
                icon="el-icon-plus"
                size="small"
                >批量导出</el-button
              >
            </el-popover>
          </el-col>
        </el-row>
        <!-- 表格 -->
        <el-row :gutter="20" style="margin-top: 2%">
          <el-col :span="4"  :xs="24" :sm="24" :lg="24">
            <el-tabs v-model="activeName" @tab-click="handleClickTab">
              <el-tab-pane
                :label="item.label"
                :name="item.name"
                v-for="(item, index) in tableTab"
                :key="index"
              >
                <!-- 表格 -->
                <el-table v-loading="loading" :data="tableData" row-key="id">
                  <el-table-column
                    prop="userPhone"
                    align="center"
                    label="手机号"
                    :show-overflow-tooltip="true"
                  >
                  </el-table-column>
                  <el-table-column
                    prop="isDisable"
                    align="center"
                    label="状态"
                    :formatter="disableFormatter"
                    :show-overflow-tooltip="true"
                  >
                  </el-table-column>
                  <el-table-column
                    prop="userName"
                    align="center"
                    label="姓名"
                    :show-overflow-tooltip="true"
                  ></el-table-column>
                  <el-table-column
                    prop="userNo"
                    align="center"
                    label="工号"
                    :show-overflow-tooltip="true"
                  ></el-table-column>
                  <el-table-column
                    prop="userCom"
                    align="center"
                    label="公司编码"
                    :show-overflow-tooltip="true"
                  ></el-table-column>
                  <!-- <el-table-column
                    prop="processingContent"
                    align="center"
                    label="公司名称"
                    :show-overflow-tooltip="true"
                  ></el-table-column> -->
                  <el-table-column align="center" label="操作" width="180px">
                    <template slot-scope="scope">
                      <el-button
                        size="mini"
                        type="text"
                        icon="el-icon-setting"
                        @click="handleUpdatePwd(scope.row)"
                        >重置密码</el-button
                      >
                      &nbsp;
                      <!-- <el-popconfirm
                        :title="
                          '确定要禁用<' + scope.row.templateName + '>吗？'
                        "
                        @confirm="handleDelete(scope.row)"
                        <el-button
                          slot="reference"
                          size="mini"
                          type="text"
                          icon="el-icon-delete"
                          >禁用</el-button
                        >
                      </el-popconfirm> -->
                    </template>
                  </el-table-column>
                </el-table>
              </el-tab-pane>
            </el-tabs>
          </el-col>
        </el-row>
        <pagination
          v-show="total > 0"
          class="pagination"
          :total="total"
          :page.sync="queryParams.pageNum"
          :limit.sync="queryParams.pageSize"
          @pagination="getList"
        />
      </div>

      <!-- 重置密码 -->
      <el-dialog
        width="300"
        :title="title"
        @close="closeDialog"
        :visible.sync="visibleUpdatePwd"
        :close-on-press-escape="false"
        :close-on-click-modal="false"
      >
        <div class="dialog-content">
          <el-form :model="form" :rules="rules" status-icon ref="ruleForm">
            <div class="info-item">
              <span class="info-item-title">用户名：</span>
              <span class="info-item-content">{{ form.userPhone }}</span>
            </div>
            <div class="info-item">
              <span class="info-item-title">姓名：</span>
              <span class="info-item-content">{{ form.userName }}</span>
            </div>
            <div class="info-item">
              <span class="info-item-title">工号：</span>
              <span class="info-item-content">{{ form.userNo }}</span>
            </div>
            <div class="info-item">
              <span class="info-item-title">公司编码：</span>
              <span class="info-item-content">{{ form.userCom }}</span>
            </div>
            <!-- <div class="info-item">
              <span class="info-item-title">公司名称：</span>
              <span class="info-item-content">121323</span>
            </div> -->
            <div class="info-item">
              <span class="info-item-title">账户状态：</span>
              <span v-if="form.isDisable == 0" class="info-item-content green">
                未禁用
              </span>
              <span v-if="form.isDisable == 1" class="info-item-content red">
                已禁用
              </span>
            </div>
            <el-form-item prop="userPwd" width="100" label="新密码:">
              <el-input
                class="info-item-input"
                v-model="form.userPwd"
                type="password"
                size="small"
                placeholder="6-16位密码"
              >
              </el-input>
            </el-form-item>
            <el-form-item prop="checkUserPwd" width="100" label="再次确认密码:">
              <el-input
                class="info-item-input"
                v-model="form.checkUserPwd"
                type="password"
                size="small"
                placeholder="确保两次输入的密码一致"
              >
              </el-input>
            </el-form-item>
          </el-form>
        </div>
        <div slot="footer" class="dialog-footer">
          <el-button @click="closeDialog()">取 消</el-button>
          <el-button type="primary" @click="submit('ruleForm')"
            >确 定</el-button
          >
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    // 密码校验方法
    let validateUserPwd = (rule, value, callback) => {
      let reg = /^(\d|\w|.){6,16}$/;
      if (value === "") {
        callback(new Error("请输入密码"));
      } else if (!reg.test(value)) {
        callback(new Error("密码在6-16位之间"));
      } else {
        callback();
      }
    };
    // 密码二次验证校验方法
    let validateCheckUserPwd = (rule, value, callback) => {
      console.log(value);
      if (value === "" || !value) {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.form.userPwd) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };

    return {
      form: {},
      tableData: [],
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        userPhone:undefined,
        userNo:undefined,
        userCom:undefined

      },
      typeOptions: [
        { value: "A", label: "A" },
        { value: "B", label: "B" },
        { value: "C", label: "C" },
        { value: "D", label: "D" },
        { value: "E", label: "E" },
      ],
      tableTab: [
        {
          name: "全部用户",
          label: "全部用户",
        },
      ],
      activeName: "全部用户",
      total: 0,
      visibleUpdatePwd: false,
      visibleDwnload: false,
      title: "",
      loading: true,
      multiple: true,
      rules: {
        userPwd: [{ validator: validateUserPwd, trigger: "blur" }],
        checkUserPwd: [{ validator: validateCheckUserPwd, trigger: "blur" }],
      },
    };
  },
  mounted() {
    this.getList();
  },
  methods: {
    filetrSearch(){
      this.queryParams.pageNum=1;
      this.getList();
    },
    getList() {
      this.loading = true;
      this.$request.post(this.api.getUserList, this.queryParams).then((res) => {
          this.tableData = res.data.rows;
          this.total = res.data.total;
          this.loading = false;
      });
    },
    //   重置密码
    handleUpdatePwd(row) {
      this.visibleUpdatePwd = true;
      this.title = "重置密码";
      this.form = row;
      delete this.form.userPwd;
    },
    updatePwdSubmit() {
      delete this.form.checkUserPwd;
      const queryForm = this.form;
      queryForm.userPwd = this.$md5(queryForm.userPwd) + "aab";
      console.log(queryForm);
      this.$request.post(this.api.updateUserInfo, queryForm).then(() => {
          this.$message.success("操作成功！");
          this.closeDialog();
      });
    },
    submit(refName) {
      // 更新密码
      this.$refs[refName].validate((valid) => {
        if (valid) {
          this.updatePwdSubmit();
        } else {
          return false;
        }
      });
    },
    // 用户状态formatter
    disableFormatter(row) {
      if (row.isDisable == 0) {
        return <span style="color:green">未禁用</span>;
      } else {
        return <span style="color:red">已禁用</span>;
      }
    },
    closeDialog() {
      this.visibleUpdatePwd = false;
      this.$refs["ruleForm"].resetFields();
    },
    // 重置
    reset() {
      this.$refs["queryForm"].resetFields();
    },
    handleDownload() {
      this.$request.downloadBlob(this.api.downloadUser, "用户导出");
    },
    // 切换tab
    handleClickTab(tab, event) {
      console.log(tab, event);
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
  },
};
</script>

<style scoped>
.pagination {
  text-align: right;
}
.dialog-content {
  width: 300px;
  margin: 0 auto;
  text-align: center;
}
.info-item {
  margin-bottom: 22px;
}
.info-item-title {
  display: inline-block;
  width: 100px;
  text-align: right;
}
.info-item-content {
  color: #999;
}
.info-item-error {
  color: red;
}
.info-item-content {
  display: inline-block;
  width: 120px;
}
.info-item-input {
  width: 170px;
  margin-left: 20px;
}
.red {
  color: red;
}
.green {
  color: green;
}
</style>
