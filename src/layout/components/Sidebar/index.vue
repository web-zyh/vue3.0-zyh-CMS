<template>
  <a-layout-sider
    :collapsed="collapsed"
    :trigger="null"
    collapsible
    class="layout-silder"
  >
  <div class="logo" @click="$router.push('/index')" :style="{ justifyContent: collapsed ? 'center' : 'flex-start' }">
      <div class="_img"></div>
      <transition name="el-zoom-in-center">
        <h1 v-if="!collapsed" class="_text">{{ title }}</h1>
      </transition>
    </div> 
    <a-menu :theme="theme" :mode="mode" style="margin-top: 50px;" @click="handleClick">
        <SidebarItem v-for="item in routerList" :key="item.path" :index="item.path" :nav="item"  />
    </a-menu>
  </a-layout-sider>
</template>

<script lang="ts">
import { defineComponent, reactive, computed, onMounted, toRefs } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import SidebarItem from "./SidebarItem.vue";

export default defineComponent({
  props: {
    title: {
      type: String,
      default() {
        return "后台管理";
      },
    },
    theme: {
      type: String,
      default() {
        return "dark"; // light,dark
      },
    },
    mode: {
      type: String,
      default() {
        return "inline"; // vertical vertical-right horizontal inline
      },
    },
    data: {
      type: Array,
      default() {
        return Array<any>();
      },
    },
    collapsed: {
      type: Boolean,
      default() {
        return false;
      },
    },
  },
  components: {
    SidebarItem,
  },
  setup() {
    const store = useStore();
    const router = useRouter();
    const state = reactive({
      routerList: Array<any>()
    });

    onMounted(() => {
      setRoutes();
    });

    const setRoutes = () => {
      let dataRouter = router.options.routes;
      if (dataRouter.length > 0) {
        dataRouter.forEach((item) => {
          if (item.path === "/") {
            let children = item.children as any;
            state.routerList.push(...children);
          }
        });
      }
    };
    const handleClick = (e: any) => {
      router.push(e.key);
    };
    return {
      ...toRefs(state),
      handleClick
    }
  },
});
</script>

<style lang="scss" scoped="scoped">
.layout-silder{
  height: 100vh;
}

.logo {
  position: absolute;
  top: 0;
  display: flex;
  width: 100%;
  height: 50px;
  overflow: hidden;
  text-align: center;
  cursor: pointer;
  background-color: #2b2f3a;
  justify-content: center;
  align-items: center;

  ._img {
    width: 32px;
    height: 32px;
    background-image: url(../../../assets/logo.png);
    margin: 16px;
    background-repeat: no-repeat;
    background-position: center;
    background-size: contain;
  }

  ._text {
    display: inline-block;
    height: 50px;
    margin-left: 12px;
    font-size: 14px;
    line-height: 50px;
    color: #fff;
  }
}
</style>
