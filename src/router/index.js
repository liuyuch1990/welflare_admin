/*
 * @Author: your name
 * @Date: 2021-10-30 09:51:57
 * @LastEditTime: 2021-11-17 14:13:33
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \online-shop-admin\src\router\index.js
 */
import Vue from 'vue'
import VueRouter from 'vue-router'
import layoutIndex from '@/components/layout/layoutIndex'
Vue.use(VueRouter)
    //获取原型对象上的push函数
const originalPush = VueRouter.prototype.push
    //修改原型对象中的push方法
VueRouter.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
}
const routes = [{
        path: '/',
        name: '首页',
        mate: { title: 'layoutIndex' },
        component: layoutIndex,
        children: [{
                path: "/",
                mate: { title: 'index' },
                name: '商品管理',
                component: () =>
                    import ('@/views/index')
            },
            // {
            //     path: "/goods",
            //     mate: { title: 'goods' },
            //     name: '商品管理',
            //     component: () =>
            //         import ('@/views/goods')
            // },
            {
                path: "/wallet",
                mate: { title: 'wallet' },
                name: '额度管理',
                component: () =>
                    import ('@/views/wallet')
            },
            {
                path: "/kindWallet",
                mate: { title: 'kindWallet' },
                name: '礼品卡额度维护',
                component: () =>
                    import ('@/views/kindWallet')
            },
            {
                path: "/order",
                mate: { title: 'order' },
                name: '订单管理',
                component: () =>
                    import ('@/views/order')
            },
            {
                path: "/roll",
                mate: { title: 'roll' },
                name: '退换货',
                component: () =>
                    import ('@/views/roll')
            },
            {
                path: "/user",
                mate: { title: 'user' },
                name: '用户管理',
                component: () =>
                    import ('@/views/user')
            },
        ]
    },
    {
        path: '/login',
        component: () =>
            import ('@/views/login'),
        meta: { title: '登录' },
    },
]
const router = new VueRouter({
    mode: 'hash',
    routes
})




export default router
