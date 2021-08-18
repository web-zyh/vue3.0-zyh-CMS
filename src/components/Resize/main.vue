<template>
  <div @resize="handleResize"></div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from "vue";
import { useStore } from "vuex";
// import { setRem } from "../../utils/rem/rem";

/**
 * 设备类型
 */
enum DEVICES {
  /**
   * 桌面
   */
  DESKTOP = "pc",
  PC = "pc",
  /**
   * 平板
   */
  TABLET = "tablet",
  /**
   * 移动端/手机
   */
  MOBILE = "mobile",
}

export default defineComponent({
  name: "ResizeDevice",
  props: {},
  setup() {
    const store = useStore();

    onMounted(() => {
      window.onresize = () => {
        return (() => {
          handleResize(getDevice());
        })();
      };
    });
    const handleResize = (device: string) => {
      console.info(`设备类型: ${device}`);
      store.commit("setDevice", device);
    };
    const getDevice = () => {
      const tablet = "(min-width: 768px) and (max-width: 1024px)";
      const mobile = "(max-width: 767px)";
      if (window.matchMedia(mobile).matches) {
        return DEVICES.MOBILE;
      } else if (window.matchMedia(tablet).matches) {
        return DEVICES.TABLET;
      }
      return DEVICES.PC;
    };
    return {
      handleResize,
      getDevice,
    };
  },
});
</script>
