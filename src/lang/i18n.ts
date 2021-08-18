import { createI18n } from "vue-i18n"; //引入vue-i18n组件
import messages from "./index";
import { getItem } from "../utils/storage/storage";

// 注册i18n实例并引入语言文件
const i18n = createI18n({
  locale: defaultLanguage(), //默认显示的语言
  // fallbackLocale: 'en',
  messages, //引入语言文件
});
function defaultLanguage() {
  return getItem("locale") || "cn"; //如果未设置语言，默认语言为中文
}
export default i18n; // 将i18n暴露出去，在main.ts中引用挂载
