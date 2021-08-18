<template>
  <a href="javascript:;" class="backTop" ref="backTop" @click="handleClick">
    <div class="backTop-content">
      <div class="backTop-icon"></div>
    </div>
  </a>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, ref, toRefs } from "vue";

interface PageContent {
  height: number;
}

export default defineComponent({
  name: "BackTop",
  setup() {
    const backTop = ref();
    const state = reactive<PageContent>({
      height: 300,
    });

    onMounted(() => {
      backTop.value.style.display = "none";
      window.onscroll = computedDisplay;
    });

    const computedDisplay = () => {
      let cw = document.documentElement.scrollTop || document.body.scrollTop;
      if (cw > state.height) {
        backTop.value.style.display = "block";
      } else {
        backTop.value.style.display = "none"; // 到一定距离才显示。
      }
    };

    const handleClick = () => {
      backTop.value.style.display = "none";
      window.onscroll = null;
      // 让按钮隐藏,消除到一定距离显示按钮事件。
      let duration = 500,
        interval = 10; // 总时间和频率
      let target =
        document.documentElement.scrollTop || document.body.scrollTop; // 滑动总距离
      let step = (target / duration) * interval; // 每次走的距离

      let timer = window.setInterval(() => {
        let curTop =
          document.documentElement.scrollTop || document.body.scrollTop;

        if (curTop === 0) {
          window.clearInterval(timer);
          window.onscroll = computedDisplay; // 回到顶部的时候要开启事件。
          return;
        }
        curTop -= step;
        document.documentElement.scrollTop = document.body.scrollTop = curTop;
      }, interval);
    };

    return {
      ...toRefs(state),
      backTop,
      handleClick,
      computedDisplay,
    };
  },
});
</script>

<style lang="scss" src="./style.scss"></style>
