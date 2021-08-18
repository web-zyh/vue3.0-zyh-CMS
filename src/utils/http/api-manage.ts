import { service } from './request';

function httpRequest(method: any, url: string, params: any) {
    return new Promise((resolve, reject) => {
        service({
            method: method,
            url: url,
            data: method === 'POST' || method === 'PUT' ? params : null,
            params: method === 'GET' || method === 'DELETE' ? params : null,
        }).then(function (response) {
            resolve(response)
        }).catch(function (err) {
            reject(err);
        });
    })
}


/**
 * get 请求
 * @param url 请求地址
 * @param param 请求参数
 */
export function getRequest(url: string, params: any) {
    return httpRequest('GET', url, params)
}

/**
 * post 请求
 * @param url 请求地址
 * @param param 请求参数
 */
export function postRequest(url: string, params: any) {
    return httpRequest('POST', url, params)
}

/**
 * put 请求
 * @param url 请求地址
 * @param param 请求参数
 */
export function putRequest(url: string, params: any) {
    return httpRequest('PUT', url, params)
}

/**
 * delete 请求
 * @param url 请求地址
 * @param param 请求参数
 */
export function deleteRequest(url: string, params: any) {
    return httpRequest('DELETE', url, params)
}
