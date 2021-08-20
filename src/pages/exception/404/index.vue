<template>
  <CustomException
    :src="exce_404"
    title="404"
    desc="Sorry, the page you visited does not exist."
    ><p>404</p></CustomException
  >
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs, onMounted } from "vue";
import CustomException from "@/components/Exception/main.vue";
import images404 from "@/assets/404.png";

export default defineComponent({
  components: {
    CustomException,
  },
  setup() {
    const state = reactive({
      exce_404: images404,
    });
    onMounted(()=>{
      console.log("我是404");
    });
    return {
      ...toRefs(state),
    };
  },
});
</script>
