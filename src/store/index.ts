import { createStore } from "vuex";
import { setItem, getItem } from "../utils/storage/storage";
import { getDevice } from "../utils/device";
import loading from "./modules/loading";
import user from "./modules/user";
import link from "./modules/link";

export default createStore({
  modules: {
    loading,
    user,
    link
  },
  state: {
    device: getDevice(),
  },
  mutations: {
    setDevice(state, payload) {
      state.device = payload;
    },
  },
  actions: {

  }
});
