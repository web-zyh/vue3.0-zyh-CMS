<template>
  <a-layout>
    <!-- silder -->
    <Sidebar :collapsed="collapsed" />
    <a-layout>
      <!-- header -->
      <a-layout-header 
        :style="{
          marginLeft: collapsed?'80px':'200px',
        }">
        <!--顶部导航-->
        <div class="lycontainer layout-header">
          <Navbar @toggleSideBar="toggleSideBar" />
        </div>
      </a-layout-header>

      <!-- 关闭菜单 -->
      <div class="lycontainer layout-tags">
        <TagsView />
      </div>

      <!-- main -->
      <a-layout-content
        class="lycontainer layout_main"
        :style="{
          background: '#fff',
          marginTop: '104px',
        }"
      >
        <AppMain />
      </a-layout-content>

      <!-- footer -->
      <a-layout-footer
        class="lycontainer"
        :style="{
          padding: '0',
          background: '#333',
        }"
      >
        <!--  <CustomFooter /> -->
      </a-layout-footer>
    </a-layout>
  </a-layout>
</template>

<script lang="ts">
import {
  defineComponent,
  ref,
  computed,
  watch,
  onBeforeMount,
  onMounted,
  onBeforeUnmount,
  reactive,
  toRefs,
} from "vue";
import { useRoute } from "vue-router";
import { useStore } from "vuex";
import Sidebar from "./components/Sidebar/index.vue";
import Navbar from "./components/Navbar.vue";
import TagsView from "./components/TagsView/index.vue";
import AppMain from "./components/AppMain.vue";
import CustomFooter from "@/components/Footer/main.vue";

export default defineComponent({
  components: {
    Sidebar,
    Navbar,
    AppMain,
    TagsView,
    CustomFooter,
  },
  setup() {
    const route = useRoute();
    const store = useStore();
    const state = reactive({
      collapsed: false,
    });
    const toggleSideBar = (payload: boolean) => {
      console.log(payload,'payload');
      state.collapsed = payload;
    };
    return {
      ...toRefs(state),
      toggleSideBar,
    };
  },
});
</script>

<style lang="scss" scoped>
.ant-layout-header {
  background: #ddd;
  padding: 0;
  height: 52px;
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
}
.layout-header {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
.layout-tags {
  position: fixed;
  top: 52px;
  width: 100%;
  height: 34px;
  background: #fff;
  border-bottom: 1px solid #d8dce5;
  // -webkit-box-shadow: 12px 12px 2px 1px rgba(0, 0, 255, 0.2);
  // box-shadow: 12px 12px 2px 1px rgba(0, 0, 255, 0.2);
}
</style>
