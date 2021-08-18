<template>
  <a-layout>
    <!-- silder -->
    <Sidebar :collapsed="collapsed" />
    <a-layout>
      <!-- header -->
      <a-layout-header class="lycontainer layout-header">
        <!--顶部导航-->
        <Navbar @toggleSideBar="toggleSideBar" />
      </a-layout-header>

      <!-- 关闭菜单 -->
      <div class="lycontainer layout-tags">
        <TagsView />
      </div>

      <!-- main -->
      <a-layout-content
        class="lycontainer"
        :style="{
          background: '#fff',
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
        <CustomFooter />
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
.layout-header {
  height: 50px;
  background-color: #fff;
  box-shadow: 0 1px 4px #ddd;
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
.layout-tags {
  width: 100%;
  height: 34px;
  background: #fff;
  border-bottom: 1px solid #d8dce5;
  -webkit-box-shadow: 12px 12px 2px 1px rgba(0, 0, 255, 0.2);
  box-shadow: 12px 12px 2px 1px rgba(0, 0, 255, 0.2);
  background: #eee;
}
</style>
