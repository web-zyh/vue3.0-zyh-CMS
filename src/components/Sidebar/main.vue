<template>
  <a-layout-sider
    :collapsed="collapsed"
    :trigger="null"
    collapsible
    class="layout-silder"
  >
    <div>
      <a
        href="javascript:void(0)"
        :style="{ justifyContent: collapsed ? 'center' : 'flex-start' }"
        class="silder-logo"
      >
        <div class="logo"></div>
        <div v-if="!collapsed">{{title}}</div>
      </a>
    </div>
    <a-menu :theme="theme" :mode="mode" :selectedKeys="selectedKeys" @click="handleClick">
      <!-- <template v-for="(item,index) in data" >
        
       <template v-if="item.children" >
           <a-sub-menu :key="item.path" >
            <template #title>
              <span>{{item.name}}</span>
            </template>

            <a-menu-item :key="val.path" v-for="(val) in item.children">{{val.path}}</a-menu-item>
          </a-sub-menu>
      </template>

      <a-menu-item :key="item.path" v-if="!item.children">
          <span :key="index">{{item.meta.title}}</span>
      </a-menu-item>
       

      </template> -->
     
      <a-menu-item key="/index" >
        <user-outlined />
        <span>首页</span>
      </a-menu-item>
      <a-menu-item key="/table">
        <video-camera-outlined />
        <span>表格</span>
      </a-menu-item>
      <a-sub-menu>
        <template #title>
          <span>
            <UserOutlined />
            <span>个人页</span>
          </span>
        </template>
        <a-menu-item key="/account/center">个人中心</a-menu-item>
        <a-menu-item key="/account/setting">个人设置</a-menu-item>
      </a-sub-menu>
      <a-sub-menu>
        <template #title>
          <span>
            <UserOutlined />
            <span>异常页</span>
          </span>
        </template>
        <a-menu-item key="/exception/403">403</a-menu-item>
        <a-menu-item key="/exception/404">404</a-menu-item>
        <a-menu-item key="/exception/500">500</a-menu-item>
      </a-sub-menu> 

    </a-menu>
  </a-layout-sider>
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
} from "@ant-design/icons-vue";
import { defineComponent, reactive, ref, toRefs } from "vue";
import { useRouter } from "vue-router";

export default defineComponent({
  props: {
    title: {
      type: String,
      default() {
        return "后台管理";
      }
    },
    theme:{
      type: String,
      default() {
        return "light";// light,dark
      }
    },
    mode:{
      type: String,
      default() {
        return "inline";// vertical vertical-right horizontal inline
      }
    },
    data:{
      type: Array,
      default() {
        return Array<any>()
      }
    },
    collapsed: {
      type: Boolean,
      default() {
        return false;
      },
    },
    selectedKeys: {},
  },
  components: {
    UserOutlined,
    VideoCameraOutlined,
    UploadOutlined,
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    GlobalOutlined,
    LogoutOutlined,
    SettingOutlined,
  },
  setup(props,ctx) {
    const state = reactive({});
    const router = useRouter();

    const handleClick = (value: any) => {
      ctx.emit("click", value.key);
    };
    return {
      ...toRefs(state),
      handleClick,
    };
  },
});
</script>

<style lang="scss" src="./style.scss"></style>
