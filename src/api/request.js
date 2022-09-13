/*
 * @Author: your name
 * @Date: 2021-11-03 18:08:48
 * @LastEditTime: 2021-11-16 10:31:04
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \online-shop-admin\src\api\request.js
 */
import {
    service,
    Message
} from '@/utils/request'
import {
    APIV,

} from '@/api/1vv'
import { BASED } from '@/api/base'

export const api = APIV
export const base = BASED

// export default api;

// 请求方法
export const $request = {
    //post
    post(url, parameter) {
        return service({
            url: url,
            method: 'post',
            data: parameter,
        })
    },

    //get
    get(url, parameter) {
        return service({
            url: url,
            method: 'get',
            params: parameter,
        })
    },

    //put
    put(url, parameter) {
        return service({
            url: url,
            method: 'put',
            data: parameter
        })
    },

    // delete
    delete(url, parameter) {
        return service({
            url: url,
            method: 'delete',
            params: parameter
        })
    },

    download(fileName) {
        window.location.href = this.$axios.defaults.baseURL + "/equipment-management/equipment/download?name=" + encodeURI(fileName);
    },

    downloadBlob(url, fileName) {
        return service({
            url: url,
            method: 'get',
            responseType: 'blob'
        }).then(res => {
            if (res) {
                let url = window.URL.createObjectURL(new Blob([res]));
                let link = document.createElement("a");
                link.style.display = "none";
                link.href = url;
                link.setAttribute("download", fileName + '.xlsx');
                document.body.appendChild(link);
                link.click();
            } else {
                Message.error("导出失败")
            }
        })
    },
    downloadBlobPost(url, params, fileName) {
        return service({
            url: url,
            method: 'post',
            responseType: 'blob',
            data: params,
        }).then(res => {
            if (res) {
                let url = window.URL.createObjectURL(new Blob([res]));
                let link = document.createElement("a");
                link.style.display = "none";
                link.href = url;
                link.setAttribute("download", fileName + '.xlsx');
                document.body.appendChild(link);
                link.click();
            } else {
                Message.error("导出失败")
            }
        })
    }



    // /**
    //  * 下载文件 用于excel导出
    //  * @param url
    //  * @param parameter
    //  * @returns {*}
    //  */
    // export function downFile(url,parameter){
    //   return axios({
    //     url: url,
    //     params: parameter,
    //     method:'get' ,
    //     responseType: 'blob'
    //   })
    // }


}