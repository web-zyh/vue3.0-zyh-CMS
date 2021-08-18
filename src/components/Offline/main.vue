<template>
  <div v-if="!onLine" class="offline-mask">
    <h2 class="offline-mask-title">{{ offlineTitle }}</h2>
    <p class="offline-mask-desc">{{ offlineDesc }}</p>
  </div>
</template>
<script lang="ts">
import { notification } from "ant-design-vue";

import { defineComponent, onMounted, onUnmounted, reactive, toRefs } from "vue";
/**
 *  interface State {
 *     readonly onLine: boolean;
 *  }
 *  readonly 为只读属性，加上此属性后该值不可修改,等同于js里的const，不同处在于变量使用场景为const，属性使用场景为readonly
 */
interface State {
  onLine: boolean;
}
export default defineComponent({
  name: "OfflineDetection",
  props: {
    offlineTitle: {
      type: String,
      default() {
        return "网络已断开,请检查网络连接";
      }
    },
    onlineTitle: {
      type: String,
      default() {
        return "网络已连接";
      }
    },
    offlineDesc: {
      type: String,
      default() {
        return "";
      }
    },
    duration: {
      type: Number,
      default() {
        return 4.5;
      }
    },
    test: {
      type: String,
      default() {
        return "有网";
      }
    }
  },
  setup(props, ctx) {
    const state = reactive<State>({
      onLine: navigator.onLine,
    });
    const { test } = props as any;

    onMounted(() => {
      // window.addEventListener("online", eventHandle);
      // window.addEventListener("offline", eventHandle);
      window.addEventListener("online", (event) => {
        eventHandle(event);
      });
      window.addEventListener("offline", (event) => {
        eventHandle(event);
      });
    });
    onUnmounted(() => {
      window.removeEventListener("offline", eventHandle);
      window.removeEventListener("online", eventHandle);
    });
    const eventHandle = (event: Event) => {
      console.log(event, "event");
      const { offlineTitle, onlineTitle, offlineDesc, duration } = props as any;
      const { type } = event;
      if (type == "offline") {
        state.onLine = false; // 断网
      } else if (type == "online") {
        state.onLine = true; // 开网
        notification.open({
          type:'success',
          message: onlineTitle,
          description:'',
          duration,
        });
      }
    };
    return {
      ...toRefs(state),
      eventHandle
    };
  }
});
</script>
<style lang="scss" src="./style.scss"></style>
