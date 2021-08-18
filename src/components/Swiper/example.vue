<template>
  <Swiper :swiperList="swiperList"></Swiper>
</template>
<script lang="ts">
import { defineComponent, reactive, toRefs } from "vue";
import Swiper from "./swiper.vue";

export default defineComponent({
  components: { Swiper },
  setup() {
    const state = reactive({
      swiperList: [
        {
          id: 0,
          bgMap: require("@/assets/banner/banner_01.png"),
          alt: "背景图第一张",
        },
        {
          id: 1,
          bgMap: require("@/assets/banner/banner_02.png"),
          alt: "背景图第二张",
        },
        {
          id: 2,
          bgMap: require("@/assets/banner/banner_03.png"),
          alt: "背景图第三张",
        },
      ],
    });
    return {
      ...toRefs(state),
    };
  },
});
</script>
