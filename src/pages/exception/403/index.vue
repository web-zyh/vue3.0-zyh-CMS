<template>
  <CustomException
    :src="exce_403"
    title="403"
    desc="Sorry, you don't have access to this page."
    ><p>403</p></CustomException
  >
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs, onMounted } from "vue";
import CustomException from "@/components/Exception/main.vue";
import images403 from "@/assets/403.png";

export default defineComponent({
  components: {
    CustomException,
  },
  setup() {
    const state = reactive({
      exce_403: images403,
    });
    onMounted(() => {
      console.log("我是403");
    });
    return {
      ...toRefs(state),
    };
  },
});
</script>

