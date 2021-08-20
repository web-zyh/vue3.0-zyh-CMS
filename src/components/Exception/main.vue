<template>
  <section class="exception">
    <div class="img">
      <img :src="src" :alt="alt" :title="title" />
    </div>
    <div class="content">
      <div class="slot"><slot></slot></div>
      <div class="desc">{{ desc }}</div>
      <div class="button">
        <a href="/index">
          <a-button :type="type" >{{ text }}</a-button>
        </a>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent, onMounted } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import images404 from "@/assets/404.png";

export default defineComponent({
  name: "Exception",
  props: {
    src:{
      type: String,
      default: () => {
        // return require("../../assets/403.png");
        return images404;
      },
    },
    alt:{
      type: String,
      default: () => {
        return "图片未显示成功";
      }
    },
    title:{
      type: String,
      default:()=>{
        return "鼠标移入显示内容";
      }
    },
    desc:{
      type: String,
      default: () => {
        return "Sorry";
      }
    },
    text:{
      type: String,
      default: () => {
        return "Back Home";
      },
    },
    type: {
      type: String,
      default:()=>{
        return "primary | Default | dashed | danger | link";
      }
    },
  },
  setup() {
    const store = useStore();
    const router = useRouter();

    onMounted(() => {});
    const goHome = () => {
      router.push("/index");
    };

    return {
      goHome
    };
  },
});
</script>

<style lang="scss" src="./style.scss"></style>
