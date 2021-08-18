<template>
  <section class="loading" v-if="loadingStaus">
    <section class="_content">
      <p><img src="../../assets/loading.gif" alt="加载中" /></p>
      <div>加载中...</div>
    </section>
  </section>
</template>
<script lang="ts">
import { defineComponent, onMounted, reactive,toRefs,computed } from "vue";
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';

export default defineComponent({
  name: "Loading",
  components: {},
  setup() {
      const store = useStore();
      const state = reactive({
        loadingStaus:computed(()=>{ return store.state.loading.Loading;}),
      });
      onMounted(() => {
      });

      return {
          ...toRefs(state)
      }
  },
});
</script>
<style lang="scss">
.loading {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1003;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  & ._content {
    color: #fff;
    text-align: center;
  }
}
</style>
