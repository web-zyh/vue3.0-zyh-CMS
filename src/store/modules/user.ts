import { setItem, getItem } from "../../utils/storage/storage";

export default {
  namespaced: true, // 开启命名空间，操作时要加上文件名称 store.dispatch("user/setLinkAsync", "???");
  state: {
    token: getItem("token") ? getItem("token") : "",
    isLogin: false,
  },
  mutations: {
    saveToken(state: any, payload: string): void {
      state.token = payload;
      setItem("token", payload);
    },
    saveIsLogin(state: any, payload: string): void {
      state.isLogin = payload;
    }
  },
  actions: {
    saveTokenAsync(context: any, data: string): void {
      context.commit("saveToken", data);
    }
  },
};
