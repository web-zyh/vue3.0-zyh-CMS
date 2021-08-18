<template>
    <Hamburger
      :is-active="opened"
      @toggleClick="toggleSideBar"
    />
    <Breadcrumb />
    <div style="display: flex;justify-content: flex-end;align-items: center;flex-grow: 1;height: 100%;">
      <el-tooltip effect="dark" content="全屏" placement="bottom">
        <Screenfull class="screenfull" />
      </el-tooltip>

      <div style="cursor: pointer;height: 100%;display: flex;">
            <a-dropdown :placement="dropdown_placement[0]" :trigger="dropdown_trigger">
              <section style="height: 100%;display: flex;align-items: center;margin-right: 12px;">
                <GlobalOutlined />
              </section>
              <template #overlay>
                <a-menu>
                  <a-menu-item key="0" @click="checkLanguage('cn')">简体中文</a-menu-item>
                  <a-menu-divider />
                  <a-menu-item key="1" @click="checkLanguage('en')">English</a-menu-item>
                </a-menu>
              </template>
            </a-dropdown>
            <a-dropdown :placement="dropdown_placement[1]" :trigger="dropdown_trigger">
              <section style="height: 100%;display: flex;align-items: center;justify-content: center;position:relative;">
                <img style="width: 40px;height: 40px;cursor: pointer;border-radius: 10px;" src="https://www.xueyueob.cn/cube/cube01.bmp"/>
                <i class="el-icon-caret-bottom" style="position: absolute;top: 25px;right: -16px;font-size: 12px;"></i>
              </section> 
              <template #overlay>
                <a-menu>
                  <a-menu-item key="0" @click="$router.push('/index')"><UserOutlined />首页</a-menu-item>
                  <a-menu-divider />
                  <a-menu-item key="1"><UserOutlined />个人中心</a-menu-item>
                  <a-menu-divider />
                  <a-menu-item key="2"><SettingOutlined />个人设置</a-menu-item>
                  <a-menu-divider />
                  <a-menu-item key="3" @click="logoutOut"><LogoutOutlined />退出登录</a-menu-item>
                </a-menu>
              </template>
            </a-dropdown>
      </div>
    </div>
</template>

<script lang="ts">
import { computed, createVNode, defineComponent, reactive, toRefs } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import { useI18n } from "vue-i18n";
import Hamburger from '@/components/Hamburger/index.vue'
import Breadcrumb from "@/components/Breadcrumb/index.vue";
import Screenfull from "@/components/Screenfull/index.vue";
import { message, Modal } from "ant-design-vue";
import { setItem } from "@/utils/storage/storage";
import { 
  GlobalOutlined,
  ExclamationCircleOutlined,
  UserOutlined,
  SettingOutlined,
  LogoutOutlined
} from "@ant-design/icons-vue";
export default defineComponent({
  components: {
    GlobalOutlined,
    ExclamationCircleOutlined,
    UserOutlined,
    SettingOutlined,
    LogoutOutlined,
    Hamburger,
    Breadcrumb,
    Screenfull,
  },
  porps:{
    
  },
  setup(props,{emit}) {
    const router = useRouter();
    const store = useStore();
    const i18n = useI18n();

    const state = reactive({
        opened:true,
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
    });

    const toggleSideBar = () => {
      state.opened = !state.opened;
      emit('toggleSideBar',!state.opened);
    };

    const editPossword = () => {
      message.warning("请联系管理员");
    };

    const loginOut = () => {
      Modal.confirm({
        title: "提示",
        icon: createVNode(ExclamationCircleOutlined),
        content: "退出登录 ...",
        okText: "确认",
        cancelText: "取消",
        closable: true, // 是否显示右上角的关闭按钮
        onOk() {
          router.push("/login");
        },
        onCancel() {},
      });
    };
    const checkLanguage = (value: string) => {
      i18n.locale.value = value;
      setItem("locale", value);
      state.language = value;
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
    return {
        ...toRefs(state),
        toggleSideBar,
        editPossword,
        loginOut,
        checkLanguage,
        logoutOut
    };
  },
});
</script>

<style lang="scss" scoped>
.navbar {
  height: 50px;
  overflow: hidden;
  line-height: 50px;
}
</style>
