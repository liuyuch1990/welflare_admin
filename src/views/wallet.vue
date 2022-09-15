<!--
 * @Author: 1vv
 * @Date: 2021-11-08 16:45:32
 * @LastEditTime: 2022-04-08 17:29:21
 * @LastEditors: Please set LastEditors
 * @Description: 额度管理-卡号
 * @FilePath: \online-shop-admin\src\views\wallet.vue
-->

<template>
  <div class="container">
    <div class="content">
      <el-form :model="queryParams" ref="queryForm">
        <el-row :gutter="10">
          <el-col :xs="24" :sm="12" :md="8" :lg="4" :xl="4">
            <el-form-item label="礼品卡号" prop="giftCardNum">
              <el-input
                size="small"
                v-model="queryParams.giftCardNum"
                placeholder="请输入"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="8" :lg="4" :xl="4">
            <el-form-item label="有效期" prop="validDate">
              <el-date-picker
                v-model="queryParams.validDate"
                size="small"
                type="date"
                value-format="yyyy-MM-dd"
                style="width: 100%"
                placeholder="选择日期"
              >
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="8" :lg="4" :xl="4" v-if="this.flag==3">
            <el-form-item label="公司编码" prop="comNum">
              <el-select
                v-model="queryParams.comNum"
                placeholder="请选择"
                size="small"
                style="width: 100%"
              >
                <el-option
                  v-for="item in useComOption"
                  :key="item"
                  :label="item"
                  :value="item"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="8" :lg="4" :xl="4">
            <el-form-item label="额度倍数" prop="quotaMultiple">
              <el-input
                size="small"
                v-model="queryParams.quotaMultiple"
                placeholder="请输入"
              ></el-input> </el-form-item
          ></el-col>
          <el-col :xs="24" :sm="12" :md="8" :lg="4" :xl="4">
            <el-form-item label="礼品卡种类" prop="cardTypeId">
              <el-select
                v-model="queryParams.cardTypeId"
                placeholder="请选择"
                style="width: 100%"
                size="small"
              >
                <el-option
                  v-for="item in kindTYpeOptions"
                  :key="item.id"
                  :label="item.cardTypeName"
                  :value="item.id"
                >
                </el-option>
              </el-select> </el-form-item
          ></el-col>
          <el-col :xs="24" :sm="12" :md="8" :lg="4" :xl="4">
            <el-form-item label="是否有效" prop="isTrue">
              <el-select
                v-model="queryParams.isTrue"
                placeholder="请选择"
                style="width: 100%"
                size="small"
              >
                <el-option
                  v-for="item in isTrueOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select> </el-form-item
          ></el-col>
          <el-col :xs="24" :sm="12" :md="8" :lg="4" :xl="4">
            <el-form-item label="手机号" prop="userPhone">
              <el-input
                size="small"
                v-model="queryParams.userPhone"
                placeholder="请输入"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item class="searchBtn">
          <el-button
            type="primary"
            @click="getList"
            icon="el-icon-search"
            round
            size="mini"
            >筛选</el-button
          >
          <el-button
            icon="el-icon-refresh"
            type="primary"
            @click="reset"
            plain
            round
            size="mini"
            >重置</el-button
          >
        </el-form-item>
      </el-form>
      <div>
        <el-row :gutter="10">
          <el-col :span="1.5">
            <el-button
              type="primary"
              icon="el-icon-upload"
              size="small"
              @click="handleUpload"
              >批量导入礼品卡</el-button
            >
          </el-col>
          <el-col :span="1.5">
            <el-button
              type="primary"
              icon="el-icon-upload"
              size="small"
              @click="jumpKindWallet"
              >礼品卡额度维护</el-button
            >
          </el-col>
        </el-row>
        <!-- 表格 -->
        <el-row :gutter="20" style="margin-top: 2%">
          <el-col :span="4" :xs="24" :sm="24" :lg="24">
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
                    prop="giftCardNum"
                    align="center"
                    label="礼品卡卡号"
                    :show-overflow-tooltip="true"
                  >
                  </el-table-column>
                  <el-table-column
                    prop="cardName"
                    align="center"
                    label="礼品卡种类"
                    :show-overflow-tooltip="true"
                  >
                  </el-table-column>
                  <el-table-column
                    prop="quotaMultiple"
                    align="center"
                    label="额度倍数"
                    :show-overflow-tooltip="true"
                  ></el-table-column>
                  <el-table-column
                    prop="validDate"
                    align="center"
                    label="有效期"
                    :show-overflow-tooltip="true"
                  ></el-table-column>
                  <el-table-column
                    prop="isTrue"
                    align="center"
                    label="是否有效"
                    :formatter="isTrueFormatter"
                    :show-overflow-tooltip="true"
                  ></el-table-column>
                  <el-table-column
                    prop="isUse"
                    align="center"
                    label="兑换状态"
                    :formatter="isUseFormatter"
                    :show-overflow-tooltip="true"
                  ></el-table-column>
                  <el-table-column
                    prop="userPhone"
                    align="center"
                    label="绑定用户"
                    :show-overflow-tooltip="true"
                  ></el-table-column>
                  <el-table-column
                    prop="comNum"
                    align="center"
                    label="公司编码"
                    :show-overflow-tooltip="true"
                  ></el-table-column>
                  <el-table-column align="center" label="操作">
                    <template slot-scope="scope">
                      <el-button
                        size="mini"
                        type="text"
                        icon="el-icon-setting"
                        @click="handleUpdate(scope.row)"
                        >编辑有效期</el-button
                      >
                      &nbsp;
                      <el-popconfirm
                        :title="
                          '确定要清除<' + scope.row.giftCardNum + '>的绑定吗？'
                        "
                        @confirm="handleUnbound(scope.row)"
                      >
                        <el-button
                          slot="reference"
                          size="mini"
                          type="text"
                          icon="el-icon-delete"
                          >清除</el-button
                        >
                      </el-popconfirm>
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

      <!-- 导入礼品卡 -->
      <el-dialog
        width="50rem"
        @close="closeDialog"
        :title="title"
        :visible.sync="visibleUpload"
        :close-on-press-escape="false"
        :close-on-click-modal="false"
      >
        <div class="dialog-content">
          <el-form :model="form" :rules="rulesUpload" ref="uploadForm">
            <!-- <el-form-item label="公司编码" prop="comNum">
              <el-select
                v-if="nextStep == 1"
                v-model="form.comNum"
                placeholder="请选择"
                style="width: 100%"
              >
                <el-option
                  v-for="item in useComOption"
                  :key="item"
                  :label="item"
                  :value="item"
                >
                </el-option>
              </el-select>
              <span v-if="nextStep == 2">
                {{ this.form.comNum }}
              </span>
            </el-form-item> -->
            <el-form-item label="礼品卡种类" prop="cardTypeId">
              <el-select
                v-if="nextStep == 1"
                v-model="form.cardTypeId"
                placeholder="请选择"
                style="width: 100%"
                ref="selection"
                @change="getCardTypeNameChange($event)"
              >
                <el-option
                  v-for="item in kindTYpeOptions"
                  :key="item.id"
                  :label="item.cardTypeName"
                  :value="item.id"
                >
                </el-option>
              </el-select>
              <span v-if="nextStep == 2">
                {{ cardTypeNameChange }}
              </span>
            </el-form-item>

            <div v-if="nextStep == 2" class="relative">
              <el-upload
                ref="uploadExcel"
                action="#"
                :limit="1"
                :http-request="uploadExcel"
              >
                <el-button size="mini" type="success">上传文件</el-button>
                &nbsp;&nbsp;
                <p class="tips">请先下载EXCEL模板，并按模板要求填写:</p>
              </el-upload>
              <el-link
                class="absolute dowmload-template"
                type="warning"
                @click="downloadTemplate"
                >下载模板</el-link
              >
            </div>
          </el-form>
        </div>
        <div slot="footer" class="dialog-footer">
          <el-button @click="closeDialog()">取 消</el-button>
          <el-button
            v-if="nextStep == 1"
            @click="nextUpload('uploadForm')"
            type="primary"
            >下一步</el-button
          >
          <el-button v-if="nextStep == 2" @click="preUpload" type="primary"
            >返回上一步</el-button
          >
          <el-button v-if="nextStep == 2" type="primary" @click="submit"
            >确 定</el-button
          >
        </div>
      </el-dialog>
      <!-- 编辑有效期 -->
      <el-dialog
        width="50rem"
        @close="closeDialog"
        :title="title"
        :visible.sync="visibleWallet"
        :close-on-press-escape="false"
        :close-on-click-modal="false"
      >
        <div class="dialog-content">
          <div class="info-item">
            <span class="info-item-title">礼品卡编号：</span>
            <span class="info-item-content">{{ this.form.giftCardId }}</span>
          </div>
          <div class="info-item">
            <span class="info-item-title">礼品卡种类：</span>
            <span class="info-item-content">{{ this.form.cardName }}</span>
          </div>
          <div class="info-item">
            <span class="info-item-title">兑换状态：</span>
            <span class="info-item-content">{{
              this.form.isUse == 0
                ? "未绑定"
                : this.form.isUse == 1
                ? "未兑换"
                : "已兑换"
            }}</span>
          </div>
          <div class="info-item">
            <span class="info-item-title">绑定用户：</span>
            <span class="info-item-content">{{ this.form.userPhone }}</span>
          </div>
          <div class="info-item">
            <span class="info-item-title">公司编码：</span>
            <span class="info-item-content">{{ this.form.comNum }}</span>
          </div>
          <div class="info-item">
            <span class="info-item-title">额度倍数：</span>
            <span class="info-item-content">{{ this.form.quotaMultiple }}</span>
          </div>
          <div class="info-item">
            <span class="info-item-title">有效期:</span>
            <el-date-picker
              class="info-item-input"
              size="small"
              v-model="form.validDate"
              align="right"
              type="date"
              value-format="yyyy-MM-dd"
              placeholder="选择日期"
            >
            </el-date-picker>
          </div>
          <div class="info-item">
            <span class="info-item-title">是否有效：</span>
            <span class="info-item-content">{{
              this.form.isTrue == 0 ? "无效" : "有效"
            }}</span>
          </div>
        </div>
        <div slot="footer" class="dialog-footer">
          <el-button @click="closeDialog()">取 消</el-button>
          <el-button type="primary" @click="updateSubmit">确 定</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      flag:sessionStorage.getItem('onlineAdmin-flag'),
      form: {},
      nextStep: 1, // 上传时下一步状态
      tableData: [],
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        giftCardNum: undefined,
        validDate: undefined,
        comNum: undefined,
        quotaMultiple: undefined,
        isTrue: undefined,
        // cardName: undefined,
        cardTypeId: undefined,
      },
      cardTypeNameChange: "",
      tableTab: [
        {
          name: "全部",
          label: "全部",
        },
        {
          name: "已兑换",
          label: "已兑换",
        },
        {
          name: "未兑换",
          label: "未兑换",
        },
        {
          name: "未绑定",
          label: "未绑定",
        },
      ],
      kindTYpeOptions: [],
      useComOption: [],
      isTrueOptions: [
        { value: 0, label: "无效" },
        { value: 1, label: "有效" },
      ],
      activeName: "全部",
      total: 0,
      visibleWallet: false,
      visibleUpload: false,
      title: "",
      loading: true,
      multiple: true,
      formData: {},
      uploadFile: "",
      rulesUpload: {
        // comNum: [
        //   { required: true, message: "请选择公司编码", trigger: "blur" },
        // ],
        cardName: [
          { required: true, message: "请选择礼品卡种类", trigger: "blur" },
        ],
      },
    };
  },
  mounted() {
    this.getList();
    this.getKindCardTypeOptions();
    this.getUseComOption();
  },
  methods: {
    getList() {
      this.loading = true;
      this.$request.post(this.api.getWallet, this.queryParams).then((res) => {
        this.tableData = res.data.rows;
        this.total = res.data.total;
        this.loading = false;
      });
    },
    // 编辑有效期
    handleUpdate(row) {
      this.visibleWallet = true;
      this.title = "编辑礼品卡信息";
      this.form = JSON.parse(JSON.stringify(row));
    },
    handleUnbound(row) {
      this.$request
        .get(this.api.unboundCard + row.giftCardId)
        .then(() => {
          this.$message.success("操作成功！");
          this.getList();
        })
        .catch((err) => {
          this.$message.error(err.message);
        });
    },
    updateSubmit() {
      const queryParam = {
        giftCardId: this.form.giftCardId,
        validDate: this.form.validDate,
      };
      this.$request
        .post(this.api.updateCard, queryParam)
        .then(() => {
          this.$message.success("操作成功！");
          this.getList();
          this.closeDialog();
        })
        .carch((err) => {
          this.$message.error(err.message);
        });
    },
    // 导入礼品卡中礼品卡种类字段显示
    getCardTypeNameChange(event) {
      let obj = this.kindTYpeOptions.find((item) => {
        return item.id === event;
      });
      this.cardTypeNameChange=obj.cardTypeName
    },
    // 导入
    submit() {
      this.formData = new FormData();
      this.formData.append("file", this.uploadFile);
      // this.formData.append("comNum", this.form.comNum);
      this.formData.append("cardTypeId", this.form.cardTypeId);
      this.$request
        .post(this.api.importExcelCard, this.formData)
        .then(() => {
          this.$message.success("操作成功！");
          this.$refs["uploadExcel"].clearFiles();
          this.getList();
          this.closeDialog();
        })
        .catch((err) => {
          this.$message.error(err.message);
        });
    },
    uploadExcel(param) {
      this.uploadFile = param.file;
    },
    // 获取礼品卡种类下拉
    getKindCardTypeOptions() {
      this.$request.get(this.api.getKindCardType).then((res) => {
        this.kindTYpeOptions = res.data;
      });
    },
    // 获取公司编码下拉
    getUseComOption() {
      this.$request.get(this.api.useComOption).then((res) => {
        this.useComOption = res.data;
      });
    },
    // 上传时点击下一步
    nextUpload(refName) {
      this.$refs[refName].validate((valid) => {
        if (valid) {
          this.nextStep = 2;
        } else {
          return false;
        }
      });
    },
    // 上传时点击上一步
    preUpload() {
      this.nextStep = 1;
    },
    // 下载模板
    downloadTemplate() {
      this.$request.downloadBlob(this.api.downloadCard, "礼品卡模板");
    },
    jumpKindWallet() {
      this.$router.push("./kindWallet");
    },
    isTrueFormatter(row) {
      if (row.isTrue == 0) {
        return <span style="color:red">无效</span>;
      } else {
        return <span style="color:green">有效</span>;
      }
    },
    isUseFormatter(row) {
      if (row.isUse == 0) {
        return <span style="color:#f17f1d">未绑定</span>;
      } else if (row.isUse == 1) {
        return <span style="color:red">未兑换</span>;
      } else if (row.isUse == 2) {
        return <span style="color:green">已兑换</span>;
      }
    },

    closeDialog() {
      this.visibleWallet = false;
      this.visibleUpload = false;
      this.$refs["uploadForm"].resetFields();
      this.nextStep = 1;
    },
    reset() {
      // this.$nextTick(() => {
      this.$refs["queryForm"].resetFields();
      // });

      this.getList();
    },
    handleUpload() {
      this.visibleUpload = true;
      this.title = "导入礼品卡";
    },
    // 切换tab
    handleClickTab(tab) {
      if (tab.index == 1) {
        this.queryParams.isUse = 2;
        this.queryParams.pageNum = 1;
      } else if (tab.index == 2) {
        this.queryParams.isUse = 1;
        this.queryParams.pageNum = 1;
      } else if (tab.index == 3) {
        this.queryParams.isUse = 0;
        this.queryParams.pageNum = 1;
      } else {
        delete this.queryParams.isUse;
      }
      this.getList();
    },
  },
};
</script>

<style scoped>
.pagination {
  text-align: right;
}
.dialog-content {
  width: 18.75rem;
  margin: 0 auto;
  text-align: center;
}
.info-item {
  margin-bottom: 1.375rem;
}
.info-item-title {
  display: inline-block;
  width: 6.25rem;
  text-align: right;
}
.info-item-content {
  color: #999;
}
.info-item-content {
  display: inline-block;
  width: 7.5rem;
}
.info-item-input {
  width: 10.625rem;
  margin-left: 1.25rem;
}
.tips {
  font-size: 12px;
  font-weight: 700;
}
.stepBtn {
  margin-top: 50px;
}
.dowmload-template {
  top: 5px;
  right: 50px;
}
</style>
