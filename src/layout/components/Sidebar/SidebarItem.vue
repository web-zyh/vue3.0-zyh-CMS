<template>
  <div v-if="nav.meta && !nav.hide">
    <!-- 一级菜单 -->
    <a-menu-item
      v-if="!nav.children || !nav.children.length"
      :key="nav.path"
      :class="{ 'submenu-title-noDropdown': !nav.isNest }"
    >
      <template #icon>
         <Icon :icon="nav.meta.icon" />
      </template>
      {{ nav.meta.title }}
    </a-menu-item>
    <a-sub-menu v-else :key="nav.path">
      <!-- 二级菜单 -->
        <template #icon>
          <Icon :icon="nav.meta.icon" />
        </template>
        <template #title>{{ nav.meta.title }}</template>
      <!-- 三级菜单 -->
      <div v-for="child in nav.children" :key="child.path">
        <a-menu-item :key="child.path" :index="child.path">
            <template #icon>
              <Icon :icon="child.meta.icon" />
            </template>
            {{ child.meta.title }}
        </a-menu-item>
      </div>
    </a-sub-menu>
  </div>
</template>

<script lang="ts">
import { defineComponent, defineProps, onMounted, toRefs } from "vue";

import { Icon } from "@/utils/icon";

export default defineComponent({
  components: {
    Icon
  },
  props:{
    nav: {
      type: Object,
      required: true,
    },
    isNest: {
      type: Boolean,
      default: false,
    },
  },
  setup(props) {
    onMounted(() => {
    })
    return {
      
    }
  },
});
</script>

