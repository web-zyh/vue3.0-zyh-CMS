import {
  createRouter,
  createWebHistory,
  createWebHashHistory,
  RouteRecordRaw,
} from "vue-router";
import store from "../store/index";
import { removeItem, clearItem } from "../utils/storage/storage";
import { notification } from "ant-design-vue";

const state = store.state as any;

const routes: Array<RouteRecordRaw> = [
  {
    path: "/login",
    meta: { title: "登陆" },
    component: () => import("@/pages/login/login.vue")
  },
  {
    path: "/",
    redirect: "/index",
    component: () => import("@/layout/index.vue"),
    children: [
      {
        path: '/index',
        component: () => import('@/pages/index/index.vue'),
        meta: { title: '首页', icon: 'SwapOutlined', affix: true }
      },
      {
        path: '/account',
        component: () => import('@/pages/account/index.vue'),
        meta: { title: '个人页', icon: 'StepBackwardOutlined', affix: true },
        children: [
          {
            path: "/account/center",
            meta: { title: "个人中心", icon: 'GlobalOutlined' },
            component: () => import("@/pages/account/center/index.vue"),
          },
          {
            path: "/account/setting",
            meta: { title: "个人设置", icon: 'StepBackwardOutlined' },
            component: () => import("@/pages/account/setting/index.vue"),
          },
        ]
      },
      {
        path: '/exception',
        component: () => import('@/pages/exception/index.vue'),
        meta: { title: '异常页', icon: 'DownSquareOutlined', affix: true },
        children: [
          {
            path: "/exception/403",
            meta: { title: "403", icon: 'GlobalOutlined' },
            component: () => import("@/pages/exception/403/index.vue"),
          },
          {
            path: "/exception/404",
            meta: { title: "404", icon: 'GlobalOutlined' },
            component: () => import("@/pages/exception/404/index.vue"),
          },
          {
            path: "/exception/500",
            meta: { title: "500",icon: 'PicRightOutlined' },
            component: () => import("@/pages/exception/500/index.vue"),
          },
        ]
      },
      {
        path: "/table",
        meta: { title: '表格', icon: 'GlobalOutlined', affix: true },
        component: () => import("@/pages/table/index.vue"),
      },
    ]
  }
];

const router = createRouter({
  // createWebHashHistory hash 路由
  // createWebHistory history 路由
  // createMemoryHistory 带缓存 history 路由
  history: createWebHashHistory(),
  routes,
});

// to:router即将进入的路由对象
// from:当前导航即将离开的路由
// next:Function,进行管道中的一个钩子，如果执行完了，则导航的状态就是 confirmed （确认的）；否则为false，终止导航。
router.beforeEach((to, from, next) => {
  if (to.path == "/login") {
    removeItem("token");
    next();
  } else {
    if (state.user.token) {
      next();
      // 路由发生变化修改页面title
      if (to.meta.title) {
        document.title = to.meta.title as string;
      }
    } else {
      next();
      // // 否则路由初始到登录页
      // notification.open({
      //   type: "warning",
      //   message: "登录失败",
      //   description: "请您输入有效的用户名及密码进行登录",
      //   duration: 5
      // });
      // next({
      //   path: "/login",
      // });
    }
  }
});
router.afterEach((_to, _from) => {
});
export default router;
