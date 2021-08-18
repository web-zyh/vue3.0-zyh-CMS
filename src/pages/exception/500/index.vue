<template>
  <CustomException
    :src="exce_500"
    title="500"
    desc="Sorry, the server is reporting an error."
    ><p>500</p></CustomException
  >
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs, onMounted } from "vue";
import CustomException from "@/components/Exception/main.vue";

export default defineComponent({
  components: {
    CustomException
  },
  setup() {
    const state = reactive({
      exce_500: require("../../../assets/500.png"),
    });
    onMounted(() => {
      console.log("我是500");
    });
    return {
      ...toRefs(state),
    };
  },
});
</script>
