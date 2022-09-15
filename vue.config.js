/*
 * @Author: your name
 * @Date: 2021-10-22 10:38:26
 * @LastEditTime: 2022-04-08 17:23:41
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \deviceManagementPlatform\vue.config.js
 */
module.exports = {
    productionSourceMap: false, //关闭线上源代码
    runtimeCompiler: true,
    // publicPath: process.env.VUE_APP_BUILD_PATH, //设置打包路径
    outputDir: process.env.VUE_APP_FILE_Name,
    publicPath: './', //设置打包路径
    devServer: {
        port: 8080,
        host: 'localhost',
        // host: '192.168.1.111',
        open: false,
        https: false,
        proxy: {
            '/wsp-boot': {
                target: process.env.VUE_APP_LINK, // 线上后端地址
                changeOrigin: true, //允许跨域
                ws: true,
                pathRewrite: {
                    '^/wsp-boot': '/wsp-boot'
                },
            }
        }
    }
    // configureWebpack: (config) => { //build时取消线上console.log----目前有问题，serve时也会取消console
    //     if (process.env.VUE_APP_TITLE === 'production') {
    //         config.optimization.minimizer[0].options.terserOptions.compress.drop_console = true
    //     }
    // }
}