<!--
 * @Author: 1vv
 * @Date: 2021-11-08 15:40:38
 * @LastEditTime: 2022-02-23 16:56:41
 * @LastEditors: Please set LastEditors
 * @Description: 商品管理
 * @FilePath: \online-shop-admin\src\views\goods.vue
-->
<template>
  <div class="container">
    <div class="content">
      <el-form :model="form"  ref="goodsForm">
        <el-form-item label="公司名称">
          <el-input v-model="form.comNum"></el-input>
        </el-form-item>
        <el-form-item label="滚动通知" prop="goodsContent">
          <el-input
                  v-model="form.indexText"
                  type="textarea"
                  placeholder="长度在100个字符以内"
          ></el-input>
        </el-form-item>
        <el-form-item label="轮播图(最多上传5张)">
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
                    :file-list="images"
                    :http-request="uploadGoodsImgCover"
                    :before-upload="beforeAvatarUpload"
                    :on-remove="handleRemoveCover"
                    :on-change="dealImgChangeCover"
            >
              <i class="el-icon-plus">轮播图</i>
            </el-upload>
            <!-- 详情图 -->
<!--            <el-upload-->
<!--                    :class="noneAddImg ? '' : 'disUoloadSty'"-->
<!--                    ref="uploadFile"-->
<!--                    action-->
<!--                    accept="image/jpeg,image/gif,image/png"-->
<!--                    list-type="picture-card"-->
<!--                    :http-request="uploadGoodsImg"-->
<!--                    :before-upload="beforeAvatarUpload"-->
<!--                    :on-change="dealImgChange"-->
<!--                    :on-remove="handleRemove"-->
<!--            >-->
<!--              <i class="el-icon-plus"></i>-->
<!--            </el-upload>-->
          </div>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="handlleSubmit()"
        >确 定</el-button
        >
      </div>
    </div>
  </div>
</template>

<script>
import { GoodsTypeVariable } from "@/utils/Variable";
export default {
  data() {
    return {
      form: {},
      showImgList: 4, //默认4张图片
      showPic: true, //新增显示图片，修改不显示图片
      imgSort: 1, //图片排序
      removeImg: [], // 商品图列表-删除时用
      removeImgCover: [], // 商品图列表-删除时用
      noneAddImgCover: true,
      noneAddImg: true,
      tableData: [],
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        sellOut: "",
      },
      typeOptions: [],
      tableTab: [
        {
          name: "2",
          label: "全部",
        }
      ],
      images: [],
      activeName: "2",
      total: 0,
      visibleGoods: false,
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
    this.getForm();
  },
  methods: {
    typeNameOptions() {
      this.typeOptions = GoodsTypeVariable;
    },
    // 商品种类分类
    goodsFormatter(row) {
      let typeName = "";
      GoodsTypeVariable.forEach((v) => {
        if (row.goodsType == v.goodsType) {
          typeName = v.typeName;
        }
      });
      return typeName;
    },
    getForm() {
      this.loading = true;
      this.$request.get(this.api.queryIndexPics, this.form).then((res) => {
        this.form = res.data
        var i = 0;
        for (i=0;i<5;) {
          i = i + 1;
          if (res.data["indexPic" + i]) {
            this.images.push({
              url: res.data["indexPic" + i],
              name: i,
            });
          }
        }
      });
    },
    //   上传图片地址-封面
    uploadGoodsImgCover(param) {
      var formData = new FormData();
      formData.append("file", param.file);
      this.$request.post(this.api.uploadPics, formData).then((res) => {
        const temp = {
          id: param.file.uid,
          picId: res.data,
          isCover: 1,
          picSort: 0,
        };
        this.images.push({
          url: this.$target + res.data,
          name: this.images.length + 1,
        });
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
      // this.selectGoods(row.goodsId)
    },
    // selectGoods(id){
    //   this.$request.get(this.api.selectGoods+id).then(res=>{
    //     console.log(res);
    //     this.form=res.data
    //   })
    // },
    // // 修改
    // 提交按钮
    handlleSubmit() {
      var i = 0;
      for (i=0;i< this.images.length; i++) {
        var index = i + 1
        this.form["indexPic" + index] = this.images[i].url
      }
      this.$request.post(this.api.saveIndex, this.form).then(() => {
        this.$message.success("操作成功！");
      });
    },
    // 删除
    handleDelete(row) {
      this.$request.get(this.api.deleteGoods + row.goodsId).then(() => {
        this.$message.success("操作成功！");
        // this.getList();
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
      this.form={};
      this.form.pics = [];
      this.removeImgCover = [];
      this.removeImg = [];
      this.imgSort = 1;
      console.log(
        "this.form:",
        this.form.pics,
        this.removeImgCover,
        this.removeImg
      );
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
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    // 清理无关图片
    clearPic(){
      this.$request.get(this.api.clearPic).then(()=>{
        this.$message.success("操作成功！")
      })
    }
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
</style>
