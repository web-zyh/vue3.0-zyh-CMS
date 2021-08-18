<template>
    <router-view></router-view>
    <Global />
</template>

<script lang="ts">
import Global from "./global.vue";

import { defineComponent, reactive, toRefs, onMounted } from "vue";
import { useRouter } from "vue-router";

export default defineComponent({
  components: { Global },
  setup() {
    const router = useRouter();
    const state = reactive({});

    onMounted(() => {
      let beginTime = 0; // 开始时间
      let differTime = 0; // 时间差
      window.onunload = function () {
        differTime = new Date().getTime() - beginTime;
        if (differTime <= 5) {
          console.log("这是关闭");
        } else {
          console.log("这是刷新");
        }
      };
      window.onbeforeunload = function () {
        beginTime = new Date().getTime();
      };
    });
    return {
      ...toRefs(state),
    };
  },
});
</script>
<style lang="scss">
@import "@/assets/scss/index.scss"; /* 全局通用样式 */
@import "@/assets/scss/reset.scss"; /* 现代CSS重置  */
</style>
