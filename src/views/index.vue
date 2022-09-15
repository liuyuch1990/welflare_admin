<!--
 * @Author: 1vv
 * @Date: 2021-11-08 15:40:38
 * @LastEditTime: 2022-03-31 15:50:31
 * @LastEditors: Please set LastEditors
 * @Description: 商品管理
 * @FilePath: \online-shop-admin\src\views\goods.vue
-->
<template>
  <div class="container">
    <div class="content">
      <div>
        <el-row :gutter="10" class="rowsBtn">
          <el-col :span="1.5">
            <el-button
              type="primary"
              icon="el-icon-plus"
              size="small"
              @click="handleAdd"
              >发布商品</el-button
            >
            <el-button type="primary" size="small" @click="orderConfig"
              >商品分类配置</el-button
            >
            <el-button plain size="small" @click="clearPic"
              >清理无关图片</el-button
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
                  <!-- <el-table-column type="selection" width="55" align="center" /> -->
                  <el-table-column
                    prop="goodsName"
                    align="center"
                    label="商品"
                    :show-overflow-tooltip="true"
                  >
                    <template slot-scope="scoped">
                      <div class="flex-between">
                        <!-- {{$target + scoped.row.coverPath}} -->
                        <img
                          class="goods-img"
                          :src="$target + scoped.row.coverPath"
                          alt=""
                        />
                        <span>{{ scoped.row.goodsName }}</span>
                      </div>
                    </template>
                  </el-table-column>
                  <el-table-column
                    prop="goodsPrice"
                    align="center"
                    label="价格"
                    :show-overflow-tooltip="true"
                  >
                  </el-table-column>
                  <el-table-column
                    align="center"
                    label="类别"
                    prop="typeName"
                    :show-overflow-tooltip="true"
                  ></el-table-column>
                  <el-table-column
                    prop="goodsSum"
                    align="center"
                    label="库存"
                    :show-overflow-tooltip="true"
                  ></el-table-column>
                  <el-table-column
                    prop="goodsSales"
                    align="center"
                    label="总销量"
                    :show-overflow-tooltip="true"
                  ></el-table-column>
                  <el-table-column
                    prop="createdDate"
                    align="center"
                    label="创建时间"
                    :show-overflow-tooltip="true"
                  ></el-table-column>
                  <el-table-column align="center" label="操作" width="180px">
                    <template slot-scope="scope">
                      <el-button
                        size="mini"
                        type="text"
                        icon="el-icon-setting"
                        @click="handleUpdate(scope.row)"
                        >编辑</el-button
                      >
                      &nbsp;
                      <el-popconfirm
                        :title="'确定要删除<' + scope.row.goodsName + '>吗？'"
                        @confirm="handleDelete(scope.row)"
                      >
                        <el-button
                          slot="reference"
                          size="mini"
                          type="text"
                          icon="el-icon-delete"
                          >删除</el-button
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
      <el-dialog
        width="300"
        :title="title"
        @close="closeDialog"
        :visible.sync="visibleGoods"
        :close-on-press-escape="false"
        :close-on-click-modal="false"
      >
        <el-form :model="form" :rules="rules" ref="goodsForm">
          <el-form-item label="商品分类" prop="goodsType">
            <el-select
              v-model="form.goodsType"
              placeholder="请选择"
              style="width: 100%"
            >
              <el-option
                v-for="item in ownGoodsTypeList"
                :key="item.dictCode"
                :label="item.dictName"
                :value="item.dictCode"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="商品名称" prop="goodsName">
            <el-input v-model="form.goodsName"></el-input>
          </el-form-item>
          <el-form-item label="商品描述" prop="goodsContent">
            <el-input
              v-model="form.goodsContent"
              type="textarea"
              placeholder="长度在100个字符以内"
            ></el-input>
          </el-form-item>
          <el-form-item label="商品图(最多上传5张)" v-if="showPic">
            <br />
            <div class="flex flex-wrap">
              <!-- 封面 -->
              <el-upload
                :class="noneAddImgCover ? '' : 'disUoloadSty'"
                style="margin-right: 10px"
                ref="uploadFileCover"
                action="aaaa"
                accept="image/jpeg,image/gif,image/png"
                list-type="picture-card"
                :http-request="uploadGoodsImgCover"
                :before-upload="beforeAvatarUpload"
                :on-remove="handleRemoveCover"
                :on-change="dealImgChangeCover"
              >
                <i class="el-icon-plus">商品封面</i>
              </el-upload>
              <!-- 详情图 -->
              <el-upload
                :class="noneAddImg ? '' : 'disUoloadSty'"
                ref="uploadFile"
                action
                accept="image/jpeg,image/gif,image/png"
                list-type="picture-card"
                :http-request="uploadGoodsImg"
                :before-upload="beforeAvatarUpload"
                :on-change="dealImgChange"
                :on-remove="handleRemove"
              >
                <i class="el-icon-plus"></i>
              </el-upload>
            </div>
          </el-form-item>
          <el-form-item label="价格" prop="goodsPrice">
            <el-input v-model="form.goodsPrice"></el-input>
          </el-form-item>
          <el-form-item label="库存" prop="goodsSum">
            <el-input v-model="form.goodsSum"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="closeDialog()">取 消</el-button>
          <el-button type="primary" @click="handlleSubmit('goodsForm')"
            >确 定</el-button
          >
        </div>
      </el-dialog>

      <!-- 商品分类 -->
      <el-dialog
        width="200"
        :title="title"
        @close="closeDialogConfig"
        :visible.sync="visibleGoodsConfig"
        :close-on-press-escape="false"
        :close-on-click-modal="false"
      >
        <el-button
          type="primary"
          @click="showGoodsTypeAdd = !showGoodsTypeAdd"
          style="margin-bottom: 10px"
          >{{ showGoodsTypeAdd ? "去添加" : "管理类别" }}</el-button
        >
        <div v-if="showGoodsTypeAdd">
          <el-table :data="ownGoodsTypeList" row-key="id">
            <el-table-column
              prop="dictName"
              align="center"
              label="商品名称"
              :show-overflow-tooltip="true"
            >
            </el-table-column>
            <el-table-column
              prop="dictCode"
              align="center"
              label="商品编码"
              :show-overflow-tooltip="true"
            >
            </el-table-column>
            <el-table-column align="center" label="操作" width="180px">
              <template slot-scope="scope">
                <el-popconfirm
                  :title="'确定要删除<' + scope.row.dictName + '>吗？'"
                  @confirm="handleDeleteGoodsType(scope.row)"
                >
                  <el-button
                    slot="reference"
                    size="mini"
                    type="text"
                    icon="el-icon-delete"
                    >删除</el-button
                  >
                </el-popconfirm>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <div v-if="!showGoodsTypeAdd">
          <el-button
            type="primary"
            plain
            size="small"
            @click="chooseOther = !chooseOther"
            >{{
              chooseOther ? "本公司录入" : "查看/选择所有公司分类"
            }}</el-button
          >
          <el-form
            :model="form"
            :rules="rules"
            class="config-form"
            ref="goodsConfig"
          >
            <!-- 选择所有公司 -->
            <div v-if="!chooseOther">
              <el-form-item label="商品分类" prop="dictName">
                <el-input
                  size="small"
                  v-model="goodsTypeForm.dictName"
                  placeholder="请输入分类"
                ></el-input>
              </el-form-item>
              <el-form-item prop="dictCode" label="商品编码">
                <el-input
                  size="small"
                  v-model="goodsTypeForm.dictCode"
                  maxlength="3"
                  placeholder="输入code(3位以内的数字或字符)"
                ></el-input>
              </el-form-item>
            </div>
            <!-- 本公司录入 -->
            <div v-if="chooseOther">
              <el-form-item label="商品分类" prop="dictName">
                <el-select
                  v-model="goodsTypeForm.dictName"
                  size="small"
                  placeholder="请选择分类"
                  style="width: 100%"
                  @change="changeConfigForm"
                >
                  <el-option
                    v-for="i in allGoodsTypeList"
                    :key="i.dictCode"
                    :label="i.dictName"
                    :value="i.dictCode"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item prop="dictCode" label="商品编码">
                <el-input
                  :disabled="true"
                  size="small"
                  v-model="goodsTypeForm.dictCode"
                  placeholder="输入code(数字字符)"
                ></el-input>
              </el-form-item>
            </div>
          </el-form>
        </div>
        <div slot="footer" class="dialog-footer">
          <el-button @click="closeDialogConfig()">取 消</el-button>
          <el-button type="primary" @click="handlleGoodsTypeSub('goodsConfig')"
            >确 定</el-button
          >
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
// import { GoodsTypeVariable } from "@/utils/Variable";
export default {
  data() {
    return {
      form: { pics: [] },
      showImgList: 4, //默认4张图片
      showPic: true, //新增显示图片，修改不显示图片
      imgSort: 1, //图片排序
      removeImg: [], // 商品图列表-删除时用
      removeImgCover: [], // 商品图列表-删除时用
      noneAddImgCover: true,
      noneAddImg: true,
      tableData: [],
      chooseOther: false, //选择/添加本公司的商品编码
      showGoodsTypeAdd: true, // 添加/查看本公司商品类别
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        sellOut: "",
      },
      ownGoodsTypeList: [], //本公司的商品分类
      allGoodsTypeList: [], //所有公司的商品分类
      tableTab: [
        {
          name: "2",
          label: "全部",
        },
        {
          name: "0",
          label: "出售中",
        },
        {
          name: "1",
          label: "已售罄",
        },
      ],
      // configList: [{ dictName: "", dictCode: "" }],
      goodsTypeForm: {},
      activeName: "2",
      total: 0,
      visibleGoods: false,
      visibleGoodsConfig: false,
      title: "",
      loading: true,
      rules: {
        goodsType: [
          { required: true, message: "请输入商品分类", trigger: "blur" },
        ],
        goodsName: [
          { required: true, message: "请输入商品名称", trigger: "blur" },
        ],
        goodsContent: [
          { required: true, message: "请输入商品描述", trigger: "blur" },
          {
            min: 1,
            max: 100,
            message: "长度在 100 个字符以内",
            trigger: "blur",
          },
        ],
        goodsPrice: [
          { required: true, message: "请输入价格", trigger: "blur" },
        ],
        goodsSum: [
          { required: true, message: "请输入库存量", trigger: "blur" },
        ],
      },
    };
  },
  mounted() {
    this.getList();
    this.goodsOwnType();
    this.goodsAllType();
  },
  methods: {
    getList() {
      this.loading = true;
      this.$request.post(this.api.goodsList, this.queryParams).then((res) => {
        this.tableData = res.data.rows;
        this.total = res.data.total;
        this.loading = false;
      });
    },
    //   上传图片地址-封面
    uploadGoodsImgCover(param) {
      var formData = new FormData();
      formData.append("file", param.file);
      this.$request.post(this.api.uploadGoods, formData).then((res) => {
        const temp = {
          id: param.file.uid,
          picId: res.data,
          isCover: 1,
          picSort: 0,
        };
        this.removeImgCover.push(temp);
        console.log(this.removeImgCover);
      });
    },
    // 上传商品图片
    uploadGoodsImg(param) {
      var formData = new FormData();
      formData.append("file", param.file);
      this.$request.post(this.api.uploadGoods, formData).then((res) => {
        if (res.resultCode === this.RequestCode.SUCCESS) {
          this.showImgList -= 1;
          const temp = {
            id: param.file.uid,
            picId: res.data,
            isCover: 0,
            picSort: this.imgSort++,
          };
          this.removeImg.push(temp);
          console.log(this.removeImg);
        }
      });
    },
    // 上传前回调
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg" || file.type === "image/png";
      const isLt2M = file.size / 1024 / 1024 < 1;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 1MB!");
      }
      return isJPG && isLt2M;
    },

    // 删除本地(封面)图片的回调
    handleRemoveCover(file, fileList) {
      this.removeImgCover.forEach((v, iv) => {
        if (v.isCover == 1) {
          this.removeImgCover.splice(iv, 1);
        }
      });
      this.noneAddImgCover = fileList.length < 1;
      console.log(this.form.pics, fileList);
    },
    // 删除本地图片的回调
    handleRemove(file, fileList) {
      this.removeImg.forEach((v, iv) => {
        fileList.forEach((k) => {
          if (v.id == k.raw.uid) {
            this.removeImg.splice(iv, 1);
          }
        });
      });
      this.noneAddImg = fileList.length < 4;
      console.log(this.form.pics, fileList);
    },
    // 上传图片（封面）变化事件
    dealImgChangeCover(file, fileList) {
      // 多余4张详情图后 隐藏新增控件
      this.noneAddImgCover = fileList.length < 1;
    },

    // 上传图片变化事件
    dealImgChange(file, fileList) {
      // 多余4张详情图后 隐藏新增控件
      this.noneAddImg = fileList.length < 4;
    },
    // 新增按钮
    handleAdd() {
      this.visibleGoods = true;
      this.title = "新增商品";
      this.showPic = true;
    },
    // 编辑
    handleUpdate(row) {
      console.log(row);
      this.visibleGoods = true;
      this.form = JSON.parse(JSON.stringify(row));
      this.title = "编辑商品";
      this.showPic = false;
    },
    // // 修改
    // 提交按钮
    handlleSubmit(refName) {
      //id为空，新建
      this.$refs[refName].validate((valid) => {
        if (valid) {
          if (this.form.goodsId) {
            console.log("编辑");
            this.$request.post(this.api.updateGoods, this.form).then(() => {
              this.closeDialog();
              this.$message.success("操作成功！");
              this.getList();
            });
          } else {
            console.log("新增");
            if (this.removeImgCover.length > 0) {
              this.form.pics.push(...this.removeImgCover);
            }
            if (this.removeImg.length > 0) {
              this.form.pics.push(...this.removeImg);
            }

            if (this.form.pics.length <= 0) {
              this.$message.info("请上传图片");
            } else {
              this.$request.post(this.api.addGoods, this.form).then(() => {
                this.closeDialog();
                this.$message.success("操作成功！");
                this.getList();
              });
            }
          }
        } else {
          return false;
        }
      });
    },
    // 删除商品列表
    handleDelete(row) {
      this.$request.get(this.api.deleteGoods + row.goodsId).then(() => {
        this.$message.success("操作成功！");
        this.getList();
      });
    },

    // 删除商品类别
    handleDeleteGoodsType(row) {
      this.$request.get(this.api.deleteGoodsType + row.dictCode).then(() => {
        this.$message.success("操作成功！");
        this.goodsOwnType();
      });
    },
    closeDialog() {
      this.visibleGoods = false;
      this.noneAddImgCover = true;

      this.noneAddImg = true;
      if (this.showPic) {
        // showPic为true是上传
        this.$refs["uploadFileCover"].clearFiles();
        this.$refs["uploadFile"].clearFiles();
      }
      this.form = {};
      this.form.pics = [];
      this.removeImgCover = [];
      this.removeImg = [];
      this.imgSort = 1;
    },
    // 切换tab
    handleClickTab(tab) {
      console.log(tab);
      if (tab.index == 1) {
        this.queryParams.sellOut = 0;
      } else if (tab.index == 2) {
        this.queryParams.sellOut = 1;
      } else {
        this.queryParams.sellOut = "";
      }
      this.getList();
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },

    orderConfig() {
      this.visibleGoodsConfig = true;
      this.title = "编辑商品分类信息";
    },
    // 获取本公司商品类别
    goodsOwnType() {
      this.$request.get(this.api.goodsOwnTypeList).then((res) => {
        this.ownGoodsTypeList = res.data;
      });
    },
    // 获取全部公司的商品类别
    goodsAllType() {
      this.$request.get(this.api.goodsAllTypeList).then((res) => {
        this.allGoodsTypeList = res.data;
      });
    },
    // 选择其他公司商品分类，自动带出编号
    changeConfigForm(e) {
      this.goodsTypeForm.dictCode = e;
    },
    addConfigList() {
      this.configList.push({
        label: "",
        code: "",
      });
    },
    deleteConfigList(item) {
      var index = this.configList.indexOf(item);
      if (item !== -1) {
        this.configList.splice(index, 1);
      }
    },
    handlleGoodsTypeSub(refName) {
      //id为空，新建
      this.$refs[refName].validate((valid) => {
        if (valid) {
          // const URL=''
          if (this.chooseOther) {
            // 选其他公司
            this.$request
              .get(this.api.addGoodsTypeGet + this.goodsTypeForm.dictName)
              .then(() => {
                this.closeDialogConfig();
                this.$message.success("操作成功！");
                this.goodsOwnType();
              });
          } else {
            //本公司录入
            this.$request
              .post(this.api.addGoodsType, this.goodsTypeForm)
              .then(() => {
                this.closeDialogConfig();
                this.$message.success("操作成功！");
                this.goodsOwnType();
              });
          }
        } else {
          return false;
        }
      });
    },
    closeDialogConfig() {
      this.visibleGoodsConfig = false;
      this.$refs["goodsConfig"].resetFields();
      this.goodsTypeForm = {};
    },
    // 清理无关图片
    clearPic() {
      this.$request.get(this.api.clearPic).then(() => {
        this.$message.success("操作成功！");
      });
    },
  },
};
</script>

<style>
.uoloadSty .el-upload--picture-card {
  width: 110px;
  height: 110px;
  line-height: 110px;
}
.disUoloadSty .el-upload--picture-card {
  display: none; /* 上传按钮隐藏 */
}
</style>
<style scoped>
.pagination {
  text-align: right;
}
.goods-img {
  width: 100px;
  height: 100px;
  margin-right: 10px;
}

.config-form /deep/ .el-form-item__content {
  display: flex;
  align-items: center;
}

.delete_icon {
  margin-left: 2%;
}
.add_icon {
  width: 24px;
  height: 24px;
}
</style>
