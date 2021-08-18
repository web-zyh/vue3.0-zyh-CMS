<template>
  <div class="swiper-container">
    <div class="swiper-wrapper">
      <div class="swiper-slide" v-for="(items, key) in swiperList" :key="key">
        <div class="swiper-BgMap">
          <img
            :src="items.bgMap"
            :alt="items.alt"
            style="width: 100%; height: 100%"
          />
        </div>
      </div>
    </div>
    <div class="swiper-pagination"></div>
    <div class="swiper-button-prev"></div>
    <div class="swiper-button-next"></div>
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive, toRefs, onMounted } from "vue";
import SwiperCore, { Pagination, Navigation, Autoplay } from "swiper";
SwiperCore.use([Pagination, Navigation, Autoplay]);
import "swiper/swiper.scss";
import "swiper/components/pagination/pagination.scss";
import "swiper/components/navigation/navigation.scss";

export default defineComponent({
  name: "",
  props: {
    swiperList: {
      type: Array,
      default() {
        return [
          {
            id: 0,
            bgMap: require("../../assets/banner/banner_03.png"),
            alt: "背景图第一张",
          },
          {
            id: 1,
            bgMap: require("../../assets/banner/banner_03.png"),
            alt: "背景图第二张",
          },
          {
            id: 2,
            bgMap: require("../../assets/banner/banner_03.png"),
            alt: "背景图第三张",
          },
        ];
      },
    },
  },
  setup() {
    const state = reactive({});
    onMounted(() => {
      createSwiper();
    });

    const createSwiper = () => {
      new SwiperCore(".swiper-container", {
        loop: true,
        autoplay: true, // 可选选项，自动滑动
        pagination: {
          el: ".swiper-pagination",
          clickable: true
        },
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
      });
    };
    return {
      ...toRefs(state),
    };
  },
});
</script>

<style lang="scss" src="./style.scss"></style>
