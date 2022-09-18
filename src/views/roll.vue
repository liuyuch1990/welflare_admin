<template>
  <div class="container">
    <div class="condition">
      <el-form :model="queryParams" ref="queryForm">
        <el-row :gutter="10">
          <el-col :xs="24" :sm="12" :md="8" :lg="4" :xl="4">
            <el-form-item label="商品名称" prop="goodsName">
              <el-select
                size="small"
                v-model="queryParams.goodsName"
                placeholder="请选择商品"
                @change="handlegoodsSelected"
                style="width: 100%"
              >
                <el-option
                  v-for="item in goodsList"
                  :key="item"
                  :label="item"
                  :value="item"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="8" :lg="4" :xl="4">
            <el-form-item label="商品类别" prop="goodsType">
              <el-select
                size="small"
                v-model="queryParams.goodsType"
                placeholder="请选择商品类别"
                @change="handleVarySelected"
                style="width: 100%"
              >
                <el-option
                  v-for="item in goodsVary"
                  :key="item.key"
                  :label="item.value"
                  :value="item.key"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="8" :lg="4" :xl="4">
            <el-form-item label="用户手机号" prop="userPhone">
              <el-input
                size="small"
                placeholder="请输入手机号"
                v-model="queryParams.userPhone"
              >
              </el-input> </el-form-item
          ></el-col>
          <el-col :xs="24" :sm="12" :md="8" :lg="4" :xl="4">
            <el-form-item label="收货手机号" prop="orderTel">
              <el-input
                size="small"
                placeholder="请输入收货手机号"
                v-model="queryParams.orderTel"
              >
              </el-input> </el-form-item
          ></el-col>
          <el-col :xs="24" :sm="12" :md="8" :lg="4" :xl="4">
            <el-form-item label="公司编码" prop="cardNum">
              <el-select
                size="small"
                v-model="queryParams.cardNum"
                placeholder="请选择商品类别"
                style="width: 100%"
              >
                <el-option
                  v-for="item in useComOption"
                  :key="item"
                  :label="item"
                  :value="item"
                >
                </el-option>
              </el-select> </el-form-item
          ></el-col>
          <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="4">
            <el-form-item label="下单时间">
              <el-date-picker
                size="small"
                v-model="queryTime"
                type="datetimerange"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                :default-time="['12:00:00']"
                value-format="yyyy-MM-dd HH:mm:ss"
                style="width:100%"
              >
              </el-date-picker> </el-form-item
          ></el-col>
        </el-row>
        <el-form-item class="searchBtn">
          <el-button
            type="primary"
            @click="filterSearch"
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
<!--      <el-popover placement="top" width="160" v-model="visibleDwnload">-->
<!--        <p>确定要导出订单信息吗？</p>-->
<!--        <div style="text-align: right; margin: 0">-->
<!--          <el-button size="mini" type="text" @click="visibleDwnload = false"-->
<!--            >取消</el-button-->
<!--          >-->
<!--          <el-button type="primary" size="mini" @click="handleOut"-->
<!--            >确定</el-button-->
<!--          >-->
<!--        </div>-->
<!--        <el-button-->
<!--          slot="reference"-->
<!--          type="primary"-->
<!--          icon="el-icon-plus"-->
<!--          size="small"-->
<!--          :disabled="!multiple"-->
<!--          >批量导出</el-button-->
<!--        >-->
<!--      </el-popover>-->
      &nbsp;
      <!-- <el-button
        @click="handleImport"
        type="primary"
        size="small"
        icon="el-icon-upload"
        >批量发货</el-button
      > -->
      &nbsp;
<!--      <el-popover placement="top" width="160" v-model="visibleSendNone">-->
<!--        <p>确定空发货吗？</p>-->
<!--        <div style="text-align: right; margin: 0">-->
<!--          <el-button size="mini" type="text" @click="visibleSendNone"-->
<!--            >取消</el-button-->
<!--          >-->
<!--          <el-button type="primary" size="mini" @click="handleSendNone"-->
<!--            >确定</el-button-->
<!--          >-->
<!--        </div>-->
<!--        <el-button-->
<!--          slot="reference"-->
<!--          type="primary"-->
<!--          icon="el-icon-plus"-->
<!--          size="small"-->
<!--          :disabled="multiple"-->
<!--          >空发货</el-button-->
<!--        >-->
<!--      </el-popover>-->
    </div>
    <div class="order">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane
          v-for="cat in catList"
          :label="cat.label"
          :name="cat.id"
          :key="cat.name"
        >
          <el-table
            :data="displayTable"
            ref="multipleTable"
            @selection-change="handleSelectionChange"
          >
            <el-table-column type="selection" width="55"> </el-table-column>
            <el-table-column
              label="商品"
              min-width="350px"
              :show-overflow-tooltip="true"
            >
              <template slot-scope="scope">
                <div
                  v-for="(item, index) in scope.row.orderGoods"
                  :key="index"
                  class="orderprovos"
                >
                  <div class="orderprovos-img">
                    <img :src="$target + item.picSavepath" alt="" />
                  </div>
                  <div class="orderprovos-font">
                    <p class="multi-ellipsis--l1">
                      商品名称：{{ item.goodsName }}
                    </p>
                    <p>单价:--</p>
                  </div>
                  <div>
                    <p>数量：{{ item.goodsNum }}</p>
                  </div>
                </div>
              </template>
            </el-table-column>
            <el-table-column
              prop="userPhone"
              label="用户名"
              align="center"
              min-width="120px"
            >
            </el-table-column>
            <el-table-column
              prop="orderTime"
              label="下单时间"
              align="center"
              min-width="120px"
            >
            </el-table-column>
            <el-table-column prop="status" label="订单状态" align="center">
              <template slot-scope="scope">
                <span v-if="scope.row.status == 0">未发货</span>
                <span v-else-if="scope.row.status == 1">已发货</span>
                <span v-else-if="scope.row.status == 2">已取消</span>
                <span v-else-if="scope.row.status == 3">待退货</span>
                <span v-else-if="scope.row.status == 4">待换货</span>
                <span v-else-if="scope.row.status == 5">已退货</span>
                <span v-else-if="scope.row.status == 6">已换货</span>
                <span v-else>已取消</span>
              </template>
            </el-table-column>
            <el-table-column prop="rollReason" label="退换货原因" align="center">
          </el-table-column>
            <el-table-column prop="appointment" label="预约时间" align="center">
            </el-table-column>
            <el-table-column
                    label="退换货图片"
                    :show-overflow-tooltip="true"
            >
              <template slot-scope="scope">
                  <div class="orderprovos-img">
                    <img :src="$target + scope.row.rollPics" alt="" />
                  </div>
              </template>
            </el-table-column>
            <el-table-column
              prop="orderNumber"
              label="订单编号"
              align="center"
              min-width="120px"
            >
            </el-table-column>
            <el-table-column label="收货信息" min-width="140px">
              <template slot-scope="scope">
                <p>收货人:{{ scope.row.orderName }}</p>
                <p>手机号:{{ scope.row.orderTel }}</p>
                <p>收货地址:{{ scope.row.orderAddress }}</p>
              </template>
            </el-table-column>
            <el-table-column label="快递单号" align="center" min-width="200px">
              <template slot-scope="scope">
                <ul v-if="scope.row.status == 1">
                  <li v-for="item in scope.row.express" :key="item.id">
                    <p>{{ item.logisticsCompany }}</p>
                    <p>
                      <el-button
                        type="text"
                        @click="handleView(item)"
                        v-if="scope.row.status == 1"
                        >{{ item.courierNumber }}</el-button
                      >
                    </p>
                  </li>
                </ul>
                <p v-else>--</p>
              </template>
            </el-table-column>
            <el-table-column label="操作" align="center" min-width="140px">
              <template slot-scope="scope">
<!--                <p v-if="scope.row.status == 0">-->
<!--                  <el-button-->
<!--                    type="text"-->
<!--                    @click="handleSendLogistic(scope.row)"-->
<!--                    style="margin-left: 0"-->
<!--                    >发货|</el-button-->
<!--                  >-->
<!--                  <el-popconfirm-->
<!--                    :title="'确定要取消该订单吗？'"-->
<!--                    @confirm="handleCancel(scope)"-->
<!--                  >-->
<!--                    <el-button slot="reference" type="text"-->
<!--                      >取消订单|</el-button-->
<!--                    >-->
<!--                  </el-popconfirm>-->
<!--                  <el-button-->
<!--                    type="text"-->
<!--                    @click="handleEdit(scope)"-->
<!--                    style="margin-left: 0"-->
<!--                    >修改地址</el-button-->
<!--                  >-->
<!--                </p>-->
                <p v-if="scope.row.status == 3">
                  <el-popconfirm
                          :title="'确定要收到该订单吗？'"
                          @confirm="changeOrderAdmin(scope)"
                  >
                    <el-button slot="reference" type="text"
                    >确认退货</el-button
                    >
                  </el-popconfirm>
                </p>
                <p v-if="scope.row.status == 4">
                  <el-popconfirm
                          :title="'确定对该订单换货吗？'"
                          @confirm="changeOrderAdmin(scope)"
                  >
                    <el-button slot="reference" type="text"
                    >确认换货</el-button
                    >
                  </el-popconfirm>
                </p>
                <p v-else-if="scope.row.status == 1">
                  <el-button type="text" @click="handleViewLogistic(scope.row)"
                    >查看物流</el-button
                  >
                </p>
                <p v-else>--</p>
              </template>
            </el-table-column>
          </el-table>
          <pagination
            v-show="total > 0"
            class="pagination"
            :total="total"
            :page.sync="queryParams.pageNum"
            :limit.sync="queryParams.pageSize"
            @pagination="getList"
          ></pagination>
        </el-tab-pane>
      </el-tabs>
      <!-- 分页 -->
      <!-- 修改地址的dialog -->
      <el-dialog
        title="编辑地址"
        :visible.sync="dialogVisible"
        width="50%"
        @close="handleClose"
        append-to-body
        :close-on-press-escape="false"
        :close-on-click-modal="false"
      >
        <el-row :span="10">
          <el-col :span="10">原收货地址：</el-col>
        </el-row>
        <el-row :span="20">
          <el-col :span="20"
            ><span
              >{{ this.oldAddress.orderName }}&nbsp;&nbsp;{{
                this.oldAddress.orderTel
              }}&nbsp;&nbsp;{{ this.oldAddress.orderAddress }}</span
            ></el-col
          >
        </el-row>
        <el-row :span="10">
          <el-col :span="10">新收货地址:</el-col>
        </el-row>
        <el-row :span="10">
          <!-- :rules="addressRules" -->
          <el-form
            ref="addressFormRef"
            :rules="addressFormRules"
            :model="addressForm"
            label-position="left"
            label-width="100px"
          >
            <el-form-item label="收货人" prop="addrName">
              <el-input
                size="mini"
                v-model="addressForm.addrName"
                placeholder="请输入收货人"
              ></el-input>
            </el-form-item>
            <el-form-item label="收货手机号" prop="phone">
              <el-input
                size="mini"
                v-model="addressForm.phone"
                placeholder="请输入手机号"
              ></el-input>
            </el-form-item>
            <el-form-item label="收货地址" prop="address">
              <el-input
                size="mini"
                v-model="addressForm.address"
                placeholder="请输入收货地址"
              ></el-input>
            </el-form-item>
          </el-form>
        </el-row>
        <span slot="footer" class="dialog-footer">
          <el-button @click="handleClose()">取 消</el-button>
          <el-button type="primary" @click="handleConfirm">确 定</el-button>
        </span>
      </el-dialog>
      <!-- 批量发货的dialog -->
      <el-dialog
        title="批量发货"
        :visible.sync="dialogVisibleGoods"
        width="35%"
        @close="handleGoodClose"
        append-to-body
        :close-on-press-escape="false"
        :close-on-click-modal="false"
      >
        <el-upload
          class="upload-demo"
          drag
          action="#"
          multiple
          ref="upload"
          width="60%"
          :on-change="handleChange"
          :http-request="httpRequest"
          :auto-upload="false"
          :before-upload="beforeUpload"
        >
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
          <div class="el-upload__tip" slot="tip">
            只能上传excel文件，且不超过500kb
          </div>
        </el-upload>
        <span slot="footer" class="dialog-footer">
          <el-button @click="handleGoodClose">取 消</el-button>
          <el-button type="primary" @click="onsubmit">确 定</el-button>
        </span>
      </el-dialog>
      <!-- 查看物流的弹框 -->
      <el-dialog
        title="查看物流"
        :visible.sync="dialogVisiblelogistics"
        width="60%"
        :close-on-press-escape="false"
        :close-on-click-modal="false"
      >
        <div class="dialogDiv">
          <el-timeline>
            <el-timeline-item
              v-for="(activity, index) in activities"
              :key="index"
              :timestamp="activity.time"
              :color="activity.color"
            >
              {{ activity.context }}
            </el-timeline-item>
          </el-timeline>
        </div>
      </el-dialog>
      <!-- 查看多个物流的弹框 -->
      <el-dialog
        title="查看物流"
        :visible.sync="dialogVisiblelogisticsMany"
        width="60%"
        height="700px"
        @close="claseLogistics"
        :close-on-press-escape="false"
        :close-on-click-modal="false"
      >
        <div v-for="(item, index) in logisticsInformation" :key="index">
          <div v-if="!showEditLogistics">
            <p>
              <span>公司名称：</span>
              <span>{{ item.logisticsCompany }}</span>
            </p>
            <p>
              <span>物流单号：</span>
              <el-button type="primary" @click="handleView(item)">{{
                item.courierNumber
              }}</el-button>
            </p>
          </div>
          <div v-else>
            <p>
              <span>公司名称：</span>
              <el-input
                size="mini"
                v-model="item.logisticsCompany"
                placeholder="请输入快递公司"
              ></el-input>
            </p>
            <p>
              <span>物流单号：</span>
              <el-input
                size="mini"
                v-model="item.courierNumber"
                placeholder="请输入物流单号"
              ></el-input>
            </p>
          </div>
        </div>

        <el-button
          v-if="logisticsInformation.length <= 0"
          type="primary"
          plain
          @click="handleAddLogistics()"
          >新增</el-button
        >
        <el-button v-else type="primary" plain @click="handleLogistics()">{{
          showEditLogistics ? "确定" : "修改"
        }}</el-button>
        <div class="dialogDiv" v-if="showTime">
          <el-timeline>
            <el-timeline-item
              v-for="(activity, index) in activities"
              :key="index"
              :timestamp="activity.time"
              :color="activity.color"
            >
              {{ activity.context }}
            </el-timeline-item>
          </el-timeline>
        </div>
      </el-dialog>

      <el-dialog
        title="发货"
        :visible.sync="dialogSendLogistic"
        width="60%"
        height="700px"
        @close="claseSendLogistics"
        :close-on-press-escape="false"
        :close-on-click-modal="false"
      >
        <div v-for="(item, index) in sendLogisticsList" :key="index">
          <p>
            <span>公司名称：</span>
            <el-input
              size="mini"
              v-model="item.logisticsCompany"
              placeholder="请输入快递公司"
            ></el-input>
          </p>
          <p>
            <span>物流单号：</span>
            <el-input
              size="mini"
              v-model="item.courierNumber"
              placeholder="请输入物流单号"
            ></el-input>
          </p>
        </div>
        <el-button size="mini" type="primary" @click="addSendLogisticsList"
          >添加一条</el-button
        >
        <el-button size="mini" @click="deleSendLogisticsList"
          >删除最后一条</el-button
        >
        <span slot="footer" class="dialog-footer">
          <el-button @click="claseSendLogistics">取 消</el-button>
          <el-button type="primary" @click="submitSend">确 定</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>
<script>
import { GoodsTypeVariable } from "@/utils/Variable";
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
      dialogVisiblelogisticsMany: false,
      //批量导出
      visibleDwnload: false,
      visibleSendNone: false, // 空发货
      //查询的总页数
      total: 10,
      //查看物流的弹框
      dialogVisiblelogistics: false,
      //批量发货的弹框
      dialogVisibleGoods: false,
      //查询的时间
      queryTime: "",
      //修改页面
      addressForm: {
        addrName: "",
        phone: "",
        address: "",
      },
      //编辑地址的修改
      dialogVisible: false,
      //切换分类展示的数据
      displayTable: [],
      //输入的手机号
      phone: "",
      //选择的是那几个tab
      activeName: "3",
      goodsList: [], //取出订单中的去重的商品名称
      goodsVary: [], //商品类别列表
      useComOption: [], // 公司编码
      //选择的商品
      valueGoods: "",
      //开始时间
      valueDate: "",
      //选择的商品类别
      valueVary: "",
      varySelected: "",
      valueStatus: "",
      ordersList: [], //转换中的list
      catList: [
        {
          name: "1",
          label: "待退货",
          id: "3",
        },
        {
          name: "2",
          label: "待换货",
          id: "4",
        },
        {
          name: "3",
          label: "已退货",
          id: "5",
        },
        {
          name: "4",
          label: "已换货",
          id: "6",
        },
      ],
      //查询商品的列表
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        status: 3,
        userPhone: "",
        goodsType: "",
        goodsName: "",
      },
      ids: [], // 多选数组
      multiple: true,
      orderId: "",
      showEditLogistics: false, // 修改物流单号
      logisticsForm: {}, // 物流信息
      //物流信息
      logisitic_List: [],
      logisiticListTrue: [],
      spanArr: [], //转换的数组
      pos: "", //转换用到的变量
      oldAddress: {}, //原收货地址
      oldOrderId: "", //原收获地址的id
      file: "", //定义上传的文件夹
      activities: [], //物流的数据
      param: {
        status: "",
      }, //导出请求的参数
      statusSelected: "", //选择的订单状态
      addressFormRules: {
        phone: [{ validator: validateUserPhone, trigger: "blur" }],
        address: [
          { required: true, message: "请输入收货地址", trigger: "blur" },
        ],
      },
      //点击每一个获取的物流信息
      logisticsInformation: [],
      //底下那个显示物流的信息是否存在
      showTime: false,

      dialogSendLogistic: false, // 单点发货弹窗
      sendLogisticsList: [{ courierNumber: "", logisticsCompany: "" }],
    };
  },
  methods: {
    // 获取公司编码下拉
    getUseComOption() {
      this.$request.get(this.api.useComOption).then((res) => {
        this.useComOption = res.data;
      });
    },
    filterSearch() {
      // console.log(this.queryTime);
      this.queryParams.pageNum = 1;
      this.getList();
    },
    // 新增物流
    handleAddLogistics() {
      this.logisticsInformation.push({
        logisticsCompany: "",
        courierNumber: "",
      });
      this.showEditLogistics = true;
    },
    // 修改物流单号
    handleLogistics() {
      if (this.showEditLogistics) {
        var queryParams = {
          logisticList: this.logisticsInformation,
          orderId: this.orderId,
        };
        this.$request
          .post(this.base.editLogistics, queryParams)
          .then(() => {
            this.$message.success("操作成功！");
            this.getList();
            this.showEditLogistics = false;
          })
          .catch((err) => {
            this.$message.error(err.message);
          });
      } else {
        this.showEditLogistics = true;
      }
    },
    //查看物流的事件
    handleViewLogistic(e) {
      this.dialogVisiblelogisticsMany = true;
      if (JSON.parse(JSON.stringify(e.express))) {
        this.logisticsInformation = JSON.parse(JSON.stringify(e.express));
      } else {
        this.logisticsInformation = [];
      }
      this.activities = []; //查看物流前，将物流信息置为空
      // console.log(this.logisticsInformation);
      this.orderId = e.orderId;
    },
    //查看物流的事件
    handleView(item) {
      // console.log(item.courierNumber);
      this.showTime = true;
      //调请求物流信息的接口
      this.$request
        .get(this.base.getOrderLogistic, { orderId: item.courierNumber })
        .then((res) => {
          this.activities = JSON.parse(res.data);
          this.activities[0].color = "#ff6700";
          // console.log(this.activities);
        })
        .catch((err) => {
          this.$message.error(err.message);
        });
    },
    //自定义上传之前事件文件的判断
    beforeUpload(file) {
      const isXsl = file.type === "application/vnd.ms-excel";
      const isXsls =
        file.type ===
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
      const isExcel = isXsl || isXsls;
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isExcel) {
        this.$message.error("上传文件只能是 Excel 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传文件大小不能超过 2MB!");
      }
      return isExcel && isLt2M;
    },
    //限制只能上传一份文件夹
    handleChange(file, fileList) {
      if (fileList.length > 1) {
        fileList.shift();
      }
    },
    //自定义上传的方法
    httpRequest(params) {
      this.file = params.file;
    },
    onsubmit() {
      this.$refs.upload.submit(); //提交调用httpRequest方法
      let data = new FormData();
      data.append("file", this.file);
      this.$request
        .post(this.base.getOrderInport, data)
        .then(() => {
          this.$message.success("物流信息更新成功");
          this.dialogVisibleGoods = false;
          this.getOrders();
        })
        .catch((err) => {
          this.$message.error(err.message);
        });
      this.$refs.upload.clearFiles();
    },
    //取消上传文件夹
    handleGoodClose() {
      this.$refs.upload.clearFiles();
      this.dialogVisibleGoods = false;
    },
    //取消修改地址
    handleClose() {
      this.dialogVisible = false;
      this.$refs["addressFormRef"].resetFields();
    },
    //确认修改地址
    handleConfirm() {
      this.$request
        .post(this.base.editOrder, {
          orderId: this.oldOrderId,
          orderTel: this.addressForm.phone,
          orderAddress: this.addressForm.address,
          orderName: this.addressForm.addrName,
        })
        .then(() => {
          // console.log(res);
          this.$message.success("操作成功！");
          this.dialogVisible = false;
          this.$refs["addressFormRef"].resetFields();
          this.$request
            .post(this.base.orderList, {
              pageNum: 1,
              pageSize: 20,
              status: 0,
            })
            .then((res) => {
              this.ordersList = res.data.list;
              // console.log(11, this.ordersList);
              //最后把变化的值赋给数组
              this.getList();
            });
        })
        .catch((err) => {
          this.$message.error(err.message);
        });
    },
    //合并表格
    objectSpanMethod({ rowIndex, columnIndex }) {
      if (
        columnIndex == 0 ||
        columnIndex == 1 ||
        columnIndex == 2 ||
        columnIndex == 3 ||
        columnIndex == 9 ||
        columnIndex == 10
      ) {
        //columnIndex表示合并第几列
        const _row = this.spanArr[rowIndex]; //遍历spanArr这个数组，spanArr数组和要合并的数组ordersTrueList,行数相同。
        const _col = _row > 0 ? 1 : 0;
        return {
          // _row = 0，_col = 0 表示这一次不合并，不显示，
          // _row = 2，_col = 1 表示这一次合并两行为一行数据
          rowspan: _row,
          colspan: _col,
        };
      }
    },
    //选择的商品
    handlegoodsSelected(row) {
      console.log(row);
    },
    //获得商品列表
    getList() {
      // console.log(this.queryTime);
      if (this.queryTime) {
        this.queryParams.startTime = this.queryTime[0];
        this.queryParams.endTime = this.queryTime[1];
      }
      this.$request.post(this.base.orderList, this.queryParams).then((res) => {
        this.ordersList = res.data.orderQueryVoList;
        res.data.orderQueryVoList.forEach((order) => {
          var goodsList = order.orderGoods;
          goodsList.forEach((goods) => {
            //取出商品的种类
            if (!this.goodsList.includes(goods.goodsName)) {
              this.goodsList.push(goods.goodsName);
            }
            //转换商品类别的名称
            GoodsTypeVariable.forEach((k) => {
              if (goods.goodsType == k.goodsType) {
                goods.typeName = k.typeName;
                const check = this.goodsVary.every((j) => {
                  if (j.key !== k.goodsType) {
                    return true;
                  } else {
                    return false;
                  }
                });
                if (check) {
                  this.goodsVary.push({
                    key: k.goodsType,
                    value: k.typeName,
                  });
                }
              }
            });
          });
        });
        this.total = res.data.total; //将查询到的总共赋值
        //最后把变化的值赋给数组
        this.displayTable = this.ordersList;
        //获取商品的物流信息
        res.data.orderQueryVoList.forEach((log) => {
          this.logisitic_List.push(log.express);
        });
      });
    },
    //选择的商品列表
    handleVarySelected(row) {
      GoodsTypeVariable.forEach((k) => {
        if (k.goodsName == row) {
          this.queryParams.goodsType = k.goodsType;
        }
      });
    },
    //批量发货
    handleImport() {
      this.dialogVisibleGoods = true;
    },
    //批量导出
    handleOut() {
      // this.param.status = this.statusSelected;
      // 根据参数，返回文档流
      if (this.queryTime) {
        this.queryParams.startTime = this.queryTime[0];
        this.queryParams.endTime = this.queryTime[1];
      }
      this.$request
        .downloadBlobPost(this.base.getOrderOut, this.queryParams, "订单导出")
        .then(() => {
          console.log("操作成功！");
          // console.log(res);
        });
    },
    // 空发货
    handleSendNone() {
      this.$request
        .post(this.base.sendNone, this.ids)
        .then(() => {
          this.visibleSendNone = false;
          this.$message.success("操作成功！");
          this.getList();
        })
        .catch((err) => {
          this.$message.error(err.message);
        });
    },
    // 多选
    handleSelectionChange(selection) {
      this.ids = selection.map((item) => item.orderId);
      // console.log(this.ids);
      this.multiple = this.ids.length > 0 ? false : true;
    },
    //筛选后的重置
    reset() {
      this.$refs["queryForm"].resetFields();
      this.queryTime = "";
      this.queryParams.startTime = "";
      this.queryParams.endTime = "";
      this.activeName = "3";
      this.getList();
    },
    //切换tab
    handleClick(row) {
      if (row.name == 3) {
        this.queryParams.status = 3;
        this.queryParams.pageNum = 1;
      } else if (row.name == 4) {
        this.queryParams.status = 4;
        this.queryParams.pageNum = 1;
      } else if (row.name == 5) {
        this.queryParams.status = 5;
        this.queryParams.pageNum = 1;
      } else if (row.name == 6) {
        this.queryParams.status = 6;
        this.queryParams.pageNum = 1;
      }else {
        delete this.queryParams.status;
        this.queryParams.pageNum = 1;
      }
      this.getList();
    },

    // 发货
    handleSendLogistic(row) {
      this.dialogSendLogistic = true;
      this.orderId = row.orderId;
      // console.log(row);
    },
    claseSendLogistics() {
      this.dialogSendLogistic = false;
      this.sendLogisticsList = [{ courierNumber: "", logisticsCompany: "" }];
    },
    addSendLogisticsList() {
      this.sendLogisticsList.push({ courierNumber: "", logisticsCompany: "" });
    },
    deleSendLogisticsList() {
      this.sendLogisticsList.pop({ courierNumber: "", logisticsCompany: "" });
    },
    // 提交发货
    submitSend() {
      var queryParams = {
        orderId: this.orderId,
        logisticList: this.sendLogisticsList,
      };
      // console.log(this.sendLogisticsList);
      // console.log(queryParams);
      // console.log(isTrue);
      var isTrue = false;
      this.sendLogisticsList.forEach((item) => {
        // console.log(item.courierNumber != "");
        // console.log(item.logisticsCompany != "");
        if (item.courierNumber != "" && item.logisticsCompany != "") {
          isTrue = true;
        }
      });
      if (isTrue) {
        this.$request
          .post(this.base.sendOff, queryParams)
          .then(() => {
            this.$message.success("操作成功！");
            this.dialogSendLogistic = false;
            this.getList();
            this.sendLogisticsList = [
              { courierNumber: "", logisticsCompany: "" },
            ];
          })
          .catch((err) => {
            this.$message.error(err.message);
          });
      } else {
        this.$message.error("输入内容不能为空");
      }
    },
    //取消订单
    changeOrderAdmin(row) {
      this.$request
        .post(this.base.changeOrderAdmin, { orderId: row.row.orderId, status: row.row.status })
        .then(() => {
          // console.log(res);
          this.$message.success("操作成功！");
          this.getList();
        });
    },
    //取消订单
    handleCancel(row) {
      this.$request
              .post(this.base.editOrder, { orderId: row.row.orderId, status: 2 })
              .then(() => {
                // console.log(res);
                this.$message.success("操作成功！");
                this.getList();
              });
    },
    //修改地址
    handleEdit(row) {
      this.oldAddress = row.row;
      this.oldOrderId = row.row.orderId;
      this.dialogVisible = true;
    },

    claseLogistics() {
      console.log("罐弹窗", this.showEditLogistics);
      this.showEditLogistics = false;
    },
  },
  created() {
    this.getList();
    this.getUseComOption();
  },
};
</script>
<style scoped>
.container {
  background-color: white;
}
.condition {
  background-color: white;
}
.order {
  background-color: white;
}
.el-row {
  padding: 5px;
  font-size: 14px;
}
/* 订单样式
 */
.orderprovos {
  display: flex;
  justify-content: space-between;
}
.orderprovos-img {
  width: 100px;
  /* padding:20px; */
}
.orderprovos-img img {
  width: 100%;
}
.orderprovos-font {
  width: 180px;
  /* padding: 20px; */
  margin-left: 50px;
}
ul {
  list-style-type: none;
}
.pagination {
  float: right;
}
.dialogDiv {
  height: 400px;
  overflow-y: auto;
}
.multi-ellipsis--l1 {
  -webkit-box-orient: vertical;
  display: -webkit-box;
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-line-clamp: 1;
}
.orderprovos-img {
  width: 100px;
  height: 100px;
  /* padding:20px; */
}
.orderprovos-img img {
  width: 100%;
}
.orderprovos-font {
  width: 200px;
  height: 100px;
  /* padding: 20px; */
}
</style>
