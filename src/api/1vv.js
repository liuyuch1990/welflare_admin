/*
 * @Author: 1vv
 * @Date: 2021-11-01 15:20:10
 * @LastEditTime: 2022-02-22 16:17:24
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \online-shop\src\api\1vv.js
 */

export const APIV = {
    login: '/user/admin/login', //管理员登录
    goodsList: '/goods/list', //商品-列表
    swiperList: '/swiper/page', //商品-列表
    addGoods: '/goods/addGoods', // 商品-新增
    selectGoods: '/goods/queryById/', // 商品-查看详情
    updateGoods: '/goods/editGoods', // 商品-编辑
    deleteGoods: '/goods/delete/', // 商品-删除
    uploadGoods: '/goods/upload', // 商品-上传图片
    getWallet: '/gift/card/queryCardList', // 礼品卡-列表
    updateCard: '/gift/card/editDate', // 礼品卡-编辑
    importExcelCard: '/gift/card/importExcel', // 礼品卡-导入
    unboundCard: "/gift/card/unbound/", // 礼品卡-解绑
    getKindList: '/card/quota/queryList', // 礼品卡种类-列表
    createKindCard: "/card/quota/createCard", // 礼品卡种类-新增
    updateKindCard: "/card/quota/updateQuota", // 礼品卡种类-编辑
    getKindCardType: "/card/quota/querycardType", // 礼品卡种类-下拉
    useComOption: "/com/queryComNum", // 公司编码-下拉
    downloadCard: "/gift/card/templateDownload", // 下载礼品卡模板
    getUserList: "/user/queryList", // 获取用户列表
    updateUserInfo: "/user/update", //用户信息-修改
    downloadUser: "/user/exportExcel", //用户信息-导出
    clearPic: "/goods/clearPic", // 清理无用图片
}