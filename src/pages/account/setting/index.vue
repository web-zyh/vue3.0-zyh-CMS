<template>
  <div>个人设置</div>
</template>

<script lang="ts">

import { defineComponent, reactive, ref, toRefs, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import { useI18n } from 'vue-i18n'; 

export default defineComponent({
  components: {
   
  },
  setup() {
    const i18n = useI18n();
    const router = useRouter();
    const store = useStore();

    const state = reactive({
     
    });

    onMounted(() => {
      
    });

    return {
      ...toRefs(state),
    };
  },
});
</script>
<style lang="scss" src="./style.scss"></style>
<style lang="scss">
@import "@/assets/scss/index.scss"; /* 全局通用样式 */
@import "@/assets/scss/reset.scss"; /* 现代CSS重置  */
</style>
