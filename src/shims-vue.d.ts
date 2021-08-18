declare module "*.vue" {
  import type { DefineComponent } from "vue";
  const component: DefineComponent<{}, {}, any>;
  export default component;
}

// 因为ts无法识别mockjs，所以在shim.d.ts末尾添加
declare module "mockjs";
declare module "jquery";
