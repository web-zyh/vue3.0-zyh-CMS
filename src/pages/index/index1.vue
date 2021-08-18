<template>
  <a-layout>
    <!-- silder -->
    <CustomSider
      title="后台管理系统"
      theme="dark"
      :data="silderData"
      :collapsed="collapsed"
      :selectedKeys="selectedKeys"
      @click="handleClick"
    ></CustomSider>
    <a-layout>
      <!-- header -->
      <a-layout-header class="layout-header">
        <section class="header">
          <div class="header-left-icon">
            <menu-unfold-outlined
              v-if="collapsed"
              class="trigger"
              @click="() => (collapsed = !collapsed)"
            />
            <menu-fold-outlined
              v-else
              class="trigger"
              @click="() => (collapsed = !collapsed)"
            />
          </div>
          <div style="flex: 1 1 0%"></div>
          <div style="cursor: pointer">
            <a-dropdown
              :placement="dropdown_placement[1]"
              :trigger="dropdown_trigger"
            >
              <span
                style="padding: 0 12px; height: 48px; display: inline-block"
              >
                <a-avatar
                  style="
                    margin: 8px 5px 10px 0;
                    color: #1890ff;
                    vertical-align: top;
                  "
                  :src="logo"
                />
                <span>admin</span></span
              >
              <template #overlay>
                <a-menu>
                  <a-menu-item key="0" @click="$router.push('/index')"><UserOutlined />首页</a-menu-item>
                  <a-menu-item key="1"><UserOutlined />个人中心</a-menu-item>
                  <a-menu-item key="2"><SettingOutlined />个人设置</a-menu-item>
                  <a-menu-divider />
                  <a-menu-item key="3" @click="logoutOut"><LogoutOutlined />退出登录</a-menu-item>
                </a-menu>
              </template>
            </a-dropdown>
            <a-dropdown
              :placement="dropdown_placement[0]"
              :trigger="dropdown_trigger"
            >
              <span style="padding: 0 12px; height: 48px; display: inline-block">
                <GlobalOutlined />
              </span>
              <template #overlay>
                <a-menu>
                  <a-menu-item key="0" @click="checkLanguage('cn')">简体中文</a-menu-item>
                  <a-menu-divider />
                  <a-menu-item key="1" @click="checkLanguage('en')">English</a-menu-item>
                </a-menu>
              </template>
            </a-dropdown>
          </div>
        </section>
      </a-layout-header>

      <!-- main -->
      <a-layout-content
        :style="{
          background: '#000'
        }"
      >
        <div class="lycontainer" :style="{
            width:'100%',
            height:'100%',
            background: '#fff',
          }">
          <router-view></router-view>
        </div>
      </a-layout-content>

      <!-- footer -->
      <a-layout-footer :style="{
            padding: '0',
            background: '#333',
          }">
        <CustomFooter />
      </a-layout-footer>
    </a-layout>
  </a-layout>
</template>

<script lang="ts">
import {
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  GlobalOutlined,
  LogoutOutlined,
  SettingOutlined,
  ExclamationCircleOutlined
} from "@ant-design/icons-vue";
import { defineComponent, reactive, ref, toRefs, onMounted, createVNode } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import { useI18n } from "vue-i18n";
import { Modal, notification } from "ant-design-vue";

import { setItem } from "@/utils/storage/storage";
import CustomSider from "@/components/Sidebar/main.vue";
import CustomFooter from "@/components/Footer/main.vue";

export default defineComponent({
  components: {
    UserOutlined,
    VideoCameraOutlined,
    UploadOutlined,
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    GlobalOutlined,
    LogoutOutlined,
    SettingOutlined,
    CustomSider,
    CustomFooter,
    ExclamationCircleOutlined
  },
  setup() {
    const i18n = useI18n();
    const router = useRouter();
    const store = useStore();

    const logo = require("@/assets/cnrhVkzwxjPwAaCfPbdc.png");

    const state = reactive({
      selectedKeys: ref<string[]>(["/index"]),
      collapsed: ref<boolean>(false),
      dropdown_placement: [
        "bottomLeft",
        "bottomCenter",
        "bottomRight",
        "topLeft",
        "topCenter",
        "topRight",
      ],
      dropdown_trigger: ["hover"],
      language: i18n.locale.value,
      silderData: Array<any>(),
    });

    onMounted(() => {
      createSilder();

      const { isLogin } = store.state.user;
      const { toSidler } = store.state.link;

      if (toSidler) {
        state.selectedKeys = [];
        state.selectedKeys.push(toSidler);
      }
      if (isLogin) {
        notification.open({
          type: "success",
          message: "欢迎",
          description: "欢迎回来",
          duration: 3.5,
        });
        store.commit("user/saveIsLogin", false);
      }
    });
    /**
     * 创建左侧侧边栏
     * */
    const createSilder = () => {
      let dataRouter = router.options.routes;

      if (dataRouter.length > 0) {
        let getChildren: Array<any> = [];
        dataRouter.filter((item) => {
          if (item.path == "/index") {
            let children = item.children as any;
            // 把 /index 手动存进去
            children.push({
              path: item.path,
              name: item.name,
              meta: item.meta,
            });
            getChildren = item.children as any;
          }
        });
        console.log(getChildren, "getChildren");
        let afg: Array<any> = [];
        let over: Array<any> = [];
        let getChildrens: Array<any> = [];
        if (getChildren.length > 0) {
          let obj: any = {};
          getChildren.map((item: any) => {
            let getChild = item.path.split("/");
            afg.push(getChild[1]);

            if (item.meta.parent) {
              // console.log(item.path.split("/"), "parent");
              let getChild = item.path.split("/")[1];
              if (getChild == item.meta.parentPath) {
                // console.log(item, "item");
                over.push({
                  name: item.meta.parentTitle,
                  path: item.meta.parentPath,
                });
              }
              // getChildrens.push({
              //   name: item.name,
              //   path: item.path,
              //   icon: item.meta.icon,
              // });
              // obj.name = item.meta.parentTitle;
              // obj.children = [
              //   {
              //     name: item.name,
              //     path: item.path,
              //     icon: item.meta.icon
              //   }
              // ];
              // console.log(getChildrens, "getChildrens");
              // over.push({
              //   name: item.meta.parentTitle,
              //   // children: getChildrens,
              // });
            } else {
              over.push({
                name: item.name,
                path: item.path,
                meta: item.meta,
              });
              console.log(item, "w无parent");
            }
          });
          console.log(afg, "afg");
          console.log(over, "over");
          let set = Array.from([...new Set(afg)]);
          console.log(set, "set");
        }
      }
    };
    const logoutOut = () => {
       Modal.confirm({
        title: '提示',
        icon: createVNode(ExclamationCircleOutlined),
        content: '退出登录 ...',
        okText: '确认',
        cancelText: '取消',
        closable:true, // 是否显示右上角的关闭按钮
        onOk() {
          router.push("/login");
        },
        onCancel() {},
      });
    };

    const handleClick = (value: any) => {
      console.log(value);
      if (!value.type) {
        state.selectedKeys = [];
        state.selectedKeys.push(value);
        router.push(value);
      }
    };

    const checkLanguage = (value: string) => {
      i18n.locale.value = value;
      setItem("locale", value);
      state.language = value;
    };

    return {
      logo,
      logoutOut,
      handleClick,
      checkLanguage,
      createSilder,
      ...toRefs(state),
    };
  },
});
</script>
<style lang="scss" src="./style.scss"></style>
<style lang="scss">
@import "@/assets/scss/index.scss"; /* 全局通用样式 */
@import "@/assets/scss/reset.scss"; /* 现代CSS重置  */
</style>
