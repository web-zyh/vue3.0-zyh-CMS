import { notification } from "ant-design-vue";
import { removeItem } from "../storage/storage";

export function checkStatus(status: number, error: string): any {
  switch (status) {
    case 400: {
      console.log("请求出错");
      break;
    }
    case 401: {
      console.log("未授权,请重新登录");
      notification.open({
        type: "warning",
        message: "登录超时,请重新登录",
        description: "",
        duration: 5
      });
      removeItem("token");
      window.setTimeout(() => {
        window.location.href = "/login";
      }, 1000);
      break;
    }
    case 403: {
      console.log("拒绝访问");
      break;
    }
    case 404: {
      console.log("请求地址出错");
      break;
    }
    case 408: {
      console.log("请求超时");
      break;
    }
    case 500: {
      console.log("服务器内部错误");
      break;
    }
    case 501: {
      console.log("服务未实现");
      break;
    }
    case 502: {
      console.log("网关错误");
      break;
    }
    case 503: {
      console.log("服务不可用");
      break;
    }
    case 504: {
      console.log("网关超时");
      break;
    }
    case 505: {
      console.log("HTTP版本不受支持");
      break;
    }
    default:
      return Promise.reject(error);
  }
}
