import Axios, { AxiosInstance } from "axios";
import { checkStatus } from "./checkStatus";
import { getToken } from "../auth/getToken";
import Qs from "qs";
import { showFullScreenLoading, hideFullScreenLoading } from '../../components/Loading/config';

// create axios
console.log(process.env);
export const service: AxiosInstance = Axios.create({
  // process.env.NODE_ENV 会自动区分是开发环境还是生产环境，会自动切换对应的BASE_URL
  baseURL: process.env.VUE_APP_URL,
  timeout: 10000, // 请求超时时间
  headers: {
    // 'Content-Type': 'application/json',
    // 默认不填Content-Type，axios会自动处理格式
    // 'Content-Type': ContentTypeEnum.JSON, //get请求格式
    // 'Content-Type': ContentTypeEnum.FORM_URLENCODED, //post请求格式
    /**
     * 避免接口缓存：IE get 请求会有缓存
     * https://support.microsoft.com/en-us/help/234067/how-to-prevent-caching-in-internet-explorer
     */
    "Cache-Control": "no-cache",
    Pragma: "no-cache",
  },
  transformRequest: [
    function (data, headers) {
      // 执行想要转换数据的任何操作
      return Qs.stringify(data);
    },
  ],
});

service.defaults.withCredentials = false; // 跨域安全策略

/* request拦截器 */
service.interceptors.request.use(
  (config) => {
    // 在发送请求之前做某事
    const token = getToken();
    if (token) {
      config.headers.Authorization = token;
    }
    showFullScreenLoading();
    return config;
  },
  (error) => {
    // 请求错误时做些事
    hideFullScreenLoading();
    return Promise.reject(error);
  }
);

/* response 拦截器 */
service.interceptors.response.use(
  (response) => {
    // 对响应数据做些事
    hideFullScreenLoading();
    return response.data;
  },
  (error) => {
    // 服务器响应出错时
    // 也可以在此设置直接跳转到出错页面，如error页面，404页面...
    hideFullScreenLoading();
    const code: number = error.response.status;
    checkStatus(code, error);
  }
);
