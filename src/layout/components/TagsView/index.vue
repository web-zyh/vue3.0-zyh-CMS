<template>
   <ScrollPane style="">
        <div style="display: flex;
            align-items: center;
            justify-content: flex-start;height:100%;">
            <button style="margin-right: 28px;background:red;width:50px;height:100%;border:2px solid #000;" v-for="(item,idx) in 50" :key="idx">{{ item }}</button>
        </div>
    </ScrollPane>
</template>
<script lang="ts">
import { defineComponent, computed, ref, onMounted, onUnmounted } from "vue";
import ScrollPane from "./ScrollPane.vue";
export default defineComponent({
  components: { ScrollPane },
  setup(props, { emit }) {
    const scrollContainer = ref();

    onMounted(() => {
    //   this.scrollWrapper.addEventListener("scroll", emitScroll, true);
    });
    onUnmounted(() => {
    //   this.scrollWrapper.removeEventListener("scroll", emitScroll);
    });
    const handleScroll = (e: any) => {
      const eventDelta = e.wheelDelta || -e.deltaY * 40;
      const $scrollWrapper = scrollWrapper;
      console.log(scrollWrapper,'scrollWrapper');
    //   $scrollWrapper.scrollLeft = $scrollWrapper.scrollLeft + eventDelta / 4;
    };
    const emitScroll = (): void => {
      emit("scroll");
    };
    const scrollWrapper = computed(() => {
      return (scrollContainer.value as any).$refs.wrap;
    });
    return {
      scrollContainer,
      handleScroll,
      emitScroll,
      scrollWrapper,
    };
  },
});
</script>
<style lang="scss">
    .el-scrollbar__view{
        height:100%;
    }
</style>
