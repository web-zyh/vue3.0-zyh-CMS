import { createApp } from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import i18n from "./lang/i18n";
import 'normalize.css';

// 全局引入antd组件 start
import Antd from "ant-design-vue";
import "ant-design-vue/dist/antd.css";
// 全局引入antd组件 end

import ElementPlus from "element-plus";
import "element-plus/lib/theme-chalk/index.css";

const app = createApp(App);
app.config.globalProperties.$http = "xxxxxxxxs";

app.use(i18n);
app.use(store).use(ElementPlus).use(router).use(Antd).mount("#app");
