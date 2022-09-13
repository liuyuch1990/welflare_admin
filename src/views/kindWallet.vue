<!--
 * @Author: 1vv
 * @Date: 2021-11-08 18:20:15
 * @LastEditTime: 2022-02-23 16:56:50
 * @LastEditors: Please set LastEditors
 * @Description: 额度管理-礼品卡种类
 * @FilePath: \online-shop-admin\src\views\giftWallet.vue
-->

<template>
  <div class="container">
    <div class="content">
      <el-form label-position="top" :model="queryParams" ref="queryForm">
        <el-row :gutter="24">
          <el-col :span="4">
            <el-form-item label="礼品卡种类" prop="cardName">
              <el-input size="small" v-model="queryParams.cardName"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="-">
              <el-button
                @click="getList"
                type="primary"
                icon="el-icon-search"
                round
                size="mini"
                >筛选</el-button
              >
              <el-button
                icon="el-icon-refresh"
                type="primary"
                plain
                round
                size="mini"
                @click="reset"
                >重置</el-button
              >
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div>
        <el-row :gutter="10" class="rowsBtn">
          <el-col :span="1.5">
            <el-button
              type="primary"
              icon="el-icon-plus"
              size="small"
              @click="handleAdd"
              >新建</el-button
            >
          </el-col>
        </el-row>
        <!-- 表格 -->
        <el-row :gutter="20" style="margin-top: 2%">
          <el-col :span="4" :xs="24" :sm="24" :lg="24">
            <!-- 表格 -->
            <el-table v-loading="loading" :data="tableData">
              <el-table-column
                prop="quotaId"
                align="center"
                label="编号"
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
              <el-table-column align="center" label="额度" prop="typeName">
                <template slot-scope="scope">
                  <span v-html="scope.row.typeName"> </span>
                </template>
              </el-table-column>

              <el-table-column align="center" label="操作">
                <template slot-scope="scope">
                  <el-button
                    size="mini"
                    type="text"
                    icon="el-icon-setting"
                    @click="handleUpdate(scope.row)"
                    >编辑额度</el-button
                  >
                </template>
              </el-table-column>
            </el-table>
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
      <el-dialog
        width="50rem"
        :title="title"
        :visible.sync="visibleKindWallet"
        @close="closeDialog"
        :close-on-press-escape="false"
        :close-on-click-modal="false"
      >
        <el-form :model="form" ref="kindWalletForm" :rules="rules">
          <el-form-item label="礼品卡种类" prop="cardName">
            <el-input v-model="form.cardName"></el-input>
          </el-form-item>
          <span class="card-tips"
            >礼品卡额度设置，即礼品卡可兑换的商品类别及数量</span
          >
          <el-form-item
            v-for="item in typeNameList"
            :key="item.goodaType"
            :label="item.typeName"
            :prop="item.key"
          >
            <el-input-number
              v-model="form[item.key]"
              controls-position="right"
              size="small"
              style="width: 100%"
              placeholder="请输入数量"
              :min="0"
            ></el-input-number>
          </el-form-item>
          <!-- <el-form-item label="A类商品数量" prop="quotaA">
            <el-input-number
              v-model="form.quotaA"
              controls-position="right"
              size="small"
              style="width: 100%"
              placeholder="请输入数量"
              :min="0"
            ></el-input-number>
          </el-form-item>
          <el-form-item label="B类商品数量" prop="quotaB">
            <el-input-number
              v-model="form.quotaB"
              controls-position="right"
              size="small"
              style="width: 100%"
              placeholder="请输入数量"
              :min="0"
            ></el-input-number>
          </el-form-item>
          <el-form-item label="C类商品数量" prop="quotaC">
            <el-input-number
              v-model="form.quotaC"
              controls-position="right"
              size="small"
              style="width: 100%"
              :min="0"
              placeholder="请输入数量"
            ></el-input-number>
          </el-form-item>
          <el-form-item label="D类商品数量" prop="quotaD">
            <el-input-number
              v-model="form.quotaD"
              controls-position="right"
              size="small"
              style="width: 100%"
              :min="0"
              placeholder="请输入数量"
            ></el-input-number>
          </el-form-item>
          <el-form-item label="E类商品数量" prop="quotaE">
            <el-input-number
              v-model="form.quotaE"
              controls-position="right"
              size="small"
              style="width: 100%"
              :min="0"
              placeholder="请输入数量"
            ></el-input-number>
          </el-form-item> -->
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="closeDialog">取 消</el-button>
          <el-button type="primary" @click="submit('kindWalletForm')"
            >确 定</el-button
          >
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import { GoodsTypeVariable } from "@/utils/Variable";
export default {
  data() {
    return {
      tableData: [],
      form: {
        cardName: undefined,
        quotaA: undefined,
        quotaB: undefined,
        quotaC: undefined,
        quotaD: undefined,
        quotaE: undefined,
      },
      queryParams: {
        pageNum: 1,
        pageSize: 10,
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
      ],
      rules: {
        cardName: [
          { required: true, message: "请输入礼品卡种类", trigger: "blur" },
        ],
        quotaA: [{ required: true, message: "请输入商品", trigger: "blur" }],
      },
      activeName: "全部",
      total: 0,
      visibleKindWallet: false,
      title: "",
      loading: true,
      multiple: true,
      typeNameList: [],
    };
  },
  mounted() {
    this.typeNameList = GoodsTypeVariable;
    this.getList();
    console.log("回显", this.form);
  },
  methods: {
    getList() {
      this.loading = true;
      this.$request.post(this.api.getKindList, this.queryParams).then((res) => {
        this.tableData = res.data.rows;
        this.tableData.forEach((row) => {
          this.quotaFormatter(row);
        });
        this.total = res.data.total;
        this.loading = false;
      });
    },
    // 额度分类
    quotaFormatter(row) {
      console.log(row);
      let quataType = "";
      GoodsTypeVariable.forEach((k) => {
        Object.keys(row).forEach((j) => {
          if (k.key == j && row[k.key]) {
            // quataType += k.typeName+':' + row[k.key] +"份"
            quataType += `<p>${k.typeName}:${row[k.key]}份;</p>`;
          }
        });
      });
      row.typeName = quataType;
      console.log("ff", row.typeName);
      return row.typeName;
    },
    // 新增
    handleAdd() {
      this.visibleKindWallet = true;
      this.title = "新增礼品卡种类";
    },
    addSubmit() {
      this.$request
        .post(this.api.createKindCard, this.form)
        .then(() => {
          this.$message.success("操作成功！");
          this.getList();
          this.closeDialog();
        })
        .catch((err) => {
          this.$message.error(err.message);
        });
    },
    // 编辑额度
    handleUpdate(row) {
      this.title = "编辑礼品卡种类";
      this.visibleKindWallet = true;
      this.form = JSON.parse(JSON.stringify(row));
      console.log("编辑", this.form);
    },
    updateSubmit() {
      this.$request
        .post(this.api.updateKindCard, this.form)
        .then(() => {
          this.$message.success("操作成功！");
          this.closeDialog();
          this.getList();
        })
        .catch((err) => {
          this.$message.error(err.message);
        });
    },
    submit(refName) {
      this.$refs[refName].validate((valid) => {
        if (!this.form.quotaId) {
          //id为空，新建
          if (valid) {
            this.addSubmit();
          }
        } else {
          //id不为空，更新
          if (valid) {
            this.updateSubmit();
            this.getList();
          }
        }
      });
    },
    // 重置查询条件
    reset() {
      this.$refs["queryForm"].resetFields();
      this.getList();
    },
    // 取消时reset表单
    closeDialog() {
      this.visibleKindWallet = false;
      // this.$refs["kindWalletForm"].resetFields();
      this.form = {
        cardName: undefined,
        quotaA: undefined,
        quotaB: undefined,
        quotaC: undefined,
        quotaD: undefined,
        quotaE: undefined,
      };
    },
  },
};
</script>

<style scoped>
.pagination {
  text-align: right;
}
.card-tips {
  font-size: 0.75rem;
  color: red;
}
</style>
