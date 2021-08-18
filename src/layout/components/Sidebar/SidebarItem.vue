<template>
  <div v-if="nav.meta && !nav.hide" class="menu-wrapper">
    <!-- 一级菜单 -->
    <a-menu-item
      v-if="!nav.children || !nav.children.length"
      :index="nav.path"
      :class="{ 'submenu-title-noDropdown': !nav.isNest }"
    >
      <span><Icon :icon="nav.meta.icon" /></span> 
      <span>{{ nav.meta.title }}</span>
    </a-menu-item>
    <a-sub-menu v-else :index="nav.path">
      <!-- 二级菜单 -->
      <template #title>
        <span><Icon :icon="nav.meta.icon" /></span> 
        <span>{{ nav.meta.title }}</span>
      </template>
      <!-- 三级菜单 -->
      <div v-for="child in nav.children" :key="child.path">
        <a-menu-item :key="child.path" :index="child.path">
          <span>
            <span><Icon :icon="nav.meta.icon" /></span> 
            <span>{{child.meta.title}}</span>
          </span>
        </a-menu-item>
      </div>
    </a-sub-menu>
  </div>
</template>

<script lang="ts">
import { defineComponent, defineProps, onMounted, toRefs } from "vue";

import { Icon } from "../../../utils/icon";

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
