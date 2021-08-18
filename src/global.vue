<template>
  <ResizeDevice></ResizeDevice>

  <CustomBackTop></CustomBackTop>

  <CustomLoading></CustomLoading>

  <OfflineDetection
    offline-title="断网处理标题"
    offline-desc="断网处理描述"
    online-title="网络已连接"
  ></OfflineDetection>
</template>

<script lang="ts">
import ResizeDevice from "@/components/Resize/main.vue";
import OfflineDetection from "@/components/Offline/main.vue";
import CustomBackTop from "@/components/BackTop/main.vue";
import CustomLoading from "@/components/Loading/index.vue";

import { defineComponent } from "vue";

export default defineComponent({
  components: { ResizeDevice, OfflineDetection, CustomBackTop, CustomLoading },
  setup() {
    return {};
  },
});
</script>
