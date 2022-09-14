/*
 * @Author: 时少丹
 * @Date: 2021-11-05 15:02:03
 * @LastEditTime: 2022-02-22 15:42:00
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \online-shop-admin\src\api\base.js
 */
export const BASED = {
    orderList: "/order/page", //获取订单列表
    getOrderInport: "/order/importInfo", //批量发货
    getOrderOut: "/order/exportExcel", //批量导出
    editOrder: "/order/edit", //修改订单
    changeOrderAdmin: "/order/edit", //修改订单
    getOrderLogistic: "/order/queryLogistics", //掉物流的接口
    sendNone: "/order/setBatchOrderStatusList", // 空发货
    editLogistics: "/order/editLogistics", // 修改物流信息（物流单号和物流公司）
    sendOff: "/order/sendOff", // 单点发货
}
