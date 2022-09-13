/*
 * @Author: your name
 * @Date: 2021-11-03 18:08:48
 * @LastEditTime: 2022-02-21 10:20:10
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \online-shop-admin\src\main.js
 */
import Vue from 'vue'
import App from './App'
import router from './router'

axios.defaults.baseURL = process.env.VUE_APP_LINK + '/page/icons/'

import axios from 'axios'
Vue.prototype.$axios = axios
Vue.prototype.$target = process.env.VUE_APP_LINK + "/wsp-boot";

import ElementUI from 'element-ui'
import '../theme/index.css'
Vue.use(ElementUI)


import '@/assets/iconfont/iconfont.css'
// import '@/assets/css/font.css';
import '@/assets/css/style.css'

const bus = new Vue()
Vue.prototype.$bus = bus

import Pagination from "@/components/Pagination";
Vue.config.productionTip = false
Vue.component('Pagination', Pagination)

import { resetForm, addDateRange } from "@/utils/util";
Vue.prototype.resetForm = resetForm
Vue.prototype.addDateRange = addDateRange

// import echarts from 'echarts'
// Vue.prototype.$echarts = echarts

import { RequestCode } from '@/utils/globalVariable'
Vue.prototype.RequestCode = RequestCode

import md5 from 'js-md5';
Vue.prototype.$md5 = md5;

import { $request, api, base } from './api/request'
Vue.prototype.api = api
Vue.prototype.base = base
Vue.prototype.$request = $request






let orignalSetItem = window.localStorage.setItem; // 原生localStorage.setItem方法
localStorage.setItem = function(key, newValue) {
    let setItemEvent = new Event("setItemEvent"); // 重写注册setItem
    setItemEvent.key = key;
    setItemEvent.newValue = newValue;
    window.dispatchEvent(setItemEvent); // 派发setItem
    orignalSetItem.apply(this, arguments); // 设置值
}
new Vue({
    el: '#app',
    router,
    // store,
    components: { App },
    template: '<App/>'
})