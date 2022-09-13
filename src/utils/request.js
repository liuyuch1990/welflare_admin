/*
 * @Author: your name
 * @Date: 2021-10-31 10:58:52
 * @LastEditTime: 2022-02-22 18:12:43
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \headquarters-oil-frontend\src\utils\request.js
 */
import axios from 'axios'
import {
    MessageBox,
    Message
} from 'element-ui'
import router from '@/router'
// 创建axios实例
export const service = axios.create({
    // axios中请求配置有baseURL选项，表示请求URL公共部分
    baseURL: '/wsp-boot',
    // 超时
    timeout: 10000,
})

service.interceptors.request.use(config => {
    config.headers['token'] = sessionStorage.getItem('onlineAdmin-Token') // 让每个请求携带自定义token
    if (config.method === 'get') {
        //  给data赋值以绕过if判断
        config.data = true
    }

    config.headers['Content-Type'] = 'application/json;charset=UTF-8'
    return config
}, error => {
    Promise.reject(error)
})

// 响应拦截器
service.interceptors.response.use(response => {
    const isToken = response.headers.token
    console.log(response.headers.token);
    if (!isToken) {
        Message.error("服务器异常，请稍后再试!")
    } else {
        sessionStorage.setItem('onlineAdmin-Token', response.headers.token)
    }

    const code = response.data.resultCode;
    if (code == 30000) {
        MessageBox.confirm(
            '登录状态已过期，您可以继续留在该页面，或者重新登录',
            '系统提示', {
                distinguishCancelAndClose: true,
                confirmButtonText: '重新登录',
                cancelButtonText: '取消',
                type: 'warning'
            }
        ).then(() => {
            setTimeout(() => {
                router.push('/login')
            }, 1500);
        }).catch(() => {
            Message({
                message: "登录失效，请重新登录！",
                type: 'error'
            })
        })
        return Promise.reject(response.data)
    } else if (code == 40000) {
        Message({
            message: "参数不正确 ",
            type: 'error'
        })
        return Promise.reject(response.data)
    } else if (code == 50000) {
        Message({
            message: "系统异常，请稍后再试",
            type: 'error'
        })
        return Promise.reject(response.data)
    } else if (code == 50001) {
        Message({
            message: "系统后台异常，请稍后再试",
            type: 'error'
        })
        return Promise.reject(response.data)
    } else {
        // return Promise.reject(response.data)
        return response.data
    }
}, () => {
    Message({
            message: "系统异常 ",
            type: 'error'
        })
        // return Promise.reject(error)
})

// export default service