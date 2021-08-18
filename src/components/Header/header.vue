<template>
  <div>
    <div id="setHeader">
      <header class="navigation lycontainer">
        <div class="navigation__container">
          <div class="nav_left">
            <div class="nav_logo"></div>
          </div>
          <nav
            class="nav_right"
            :style="device !== 'pc' ? 'align-items: center' : ''"
          >
            <template v-if="device == 'pc'">
              <template v-for="nav in navList" :key="nav.id">
                <ul
                  @mousemove="moveNav(nav.id)"
                  @mouseleave="leaveNav"
                  class="nav_menu_list"
                >
                  <li :class="{ active: nav.id == is_open }">
                    <a
                      @click="navJump(nav)"
                      :target="nav.target"
                      class="nav_menu_list_link"
                      >{{ $t(`nav.${nav.title}`) }}</a
                    >
                    <!-- <a @click="navJump(nav)" :target="nav.target" class="nav_menu_list_link">{{ nav.title }}</a> -->

                    <ul
                      v-if="nav.id == is_open"
                      class="menu_chidren"
                      @mouseleave="leaveNav"
                    >
                      <li
                        class="menu_chidren_item"
                        v-for="(item, idx) in nav.children"
                        :key="idx"
                      >
                        <a
                          class="menu_chidren_item_link"
                          :target="item.target"
                          @click="navChildJump(item)"
                          >{{ item.label }}</a
                        >
                      </li>
                    </ul>
                  </li>
                </ul>
              </template>
              <div
                style="margin-top: 1.25rem; cursor: pointer"
                @click="switchLanguage"
              >
                <a>{{ local }}</a>
              </div>
            </template>
            <template v-else>
              <div style="cursor: pointer" @click="triggerMobMenu">
                <svg
                  t="1618813322341"
                  class="icon"
                  viewBox="0 0 1024 1024"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  p-id="2077"
                  width="32"
                  height="32"
                >
                  <path
                    d="M898.8 278.4H152.8a32 32 0 0 1 0-64h746a32 32 0 0 1 0 64zM898.8 547.408H152.8a32 32 0 0 1 0-64h746a32 32 0 0 1 0 64zM898.8 816.4H152.8a32 32 0 0 1 0-64h746a32 32 0 0 1 0 64z"
                    fill="#8a8a8a"
                    p-id="2078"
                  ></path>
                </svg>
              </div>
            </template>
          </nav>
        </div>
      </header>
    </div>
    <ul
      v-if="mobMenu"
      style="
        position: fixed;
        width: 100%;
        height: 100%;
        top: 62px;
        left: 0;
        bottom: 0;
        right: 0;
        background: #fff;
        z-index: 1003;
        user-select: none;
      "
    >
      <li
        v-for="nav in navList"
        :key="nav.id"
        style="border-bottom: 1px solid #ddd; padding: 1rem 3rem"
      >
        <div
          style="display: flex; width: 100%; cursor: pointer"
          @click="mobNav_menu(nav.id)"
        >
          <a @click="navJump(nav)" :target="nav.target" style="width: 100%">{{
            $t(`nav.${nav.title}`)
          }}</a>
          <i v-if="nav.children.length > 0">
            <svg
              :style="
                nav.id == is_open
                  ? 'transform: rotate(360deg)'
                  : 'transform: rotate(180deg)'
              "
              style="width: 25px; height: 25px; transition: all 0.3s"
              t="1618814758949"
              class="icon"
              viewBox="0 0 1024 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              p-id="2318"
              width="32"
              height="32"
            >
              <path
                d="M549.84704 309.80096l328.69376 328.704c20.91008 20.91008 20.91008 54.80448 0 75.70432-20.89984 20.89984-54.80448 20.89984-75.70432 0L512 423.36256 221.16352 714.19904c-20.91008 20.89984-54.80448 20.89984-75.70432 0-20.91008-20.89984-20.91008-54.79424 0-75.70432l328.69376-328.704c10.45504-10.4448 24.14592-15.6672 37.84704-15.6672S539.40224 299.35616 549.84704 309.80096z"
                p-id="2319"
                fill="#515151"
              ></path>
            </svg>
          </i>
        </div>
        <ul v-if="nav.id == is_open">
          <li
            v-for="(item, idx) in nav.children"
            :key="idx"
            style="padding: 1rem 3rem; cursor: pointer"
          >
            <a :target="item.target" @click="navChildJump(item)">{{
              item.label
            }}</a>
          </li>
        </ul>
      </li>
      <div style="padding: 1rem 3rem; cursor: pointer" @click="switchLanguage">
        <a>{{ local }}</a>
      </div>
    </ul>
  </div>
</template>
<script lang="ts">
import {
  computed,
  defineComponent,
  onMounted,
  reactive,
  ref,
  toRefs,
} from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { useI18n } from "vue-i18n";
import { setItem } from "../../utils/storage/storage";

export default defineComponent({
  name: "",
  components: {},
  setup(prop, context) {
    const store = useStore();
    const router = useRouter();

    const i18n = useI18n();
    // 在vue3中有两种构建响应式对象的方法：reactive和ref
    // reactive()函数接收一个普通对象，返回一个响应式的数据对象。
    // 在使用之前需要导入 const msg = ref(999);
    // import { reactive,ref } from 'vue'
    // return {} 要return 出去
    const state = reactive({
      local: i18n.locale.value == "cn" ? "EN" : "CN",
      // is_open: store.state.navigator,
      is_open: -1,
      mobMenu: false,
      navList: [
        {
          id: 0,
          title: "home",
          href: "",
          target: "_self",
          children: [
            {
              nav: 0,
              label: "初始化",
              link: "/initList.html",
              target: "_self",
            },
          ],
        },
        {
          id: 1,
          title: "services",
          href: "",
          target: "_self",
          children: [],
        },
        {
          id: 2,
          title: "caseShows",
          href: "",
          children: [
            {
              label: "服务1",
              link: "/index",
            },
            {
              label: "服务2s",
              link: "https://www.baidu.com",
            },
          ],
        },
        {
          id: 3,
          title: "solution",
          href: "",
          children: [
            {
              label: "服务1服务1服务1",
              link: "/index",
            },
            {
              label: "服务2s",
              link: "https://www.baidu.com",
            },
          ],
        },
        {
          id: 4,
          title: "contactUs",
          href: "",
          children: [
            {
              label: "服务2s",
              link: "https://www.baidu.com",
            },
          ],
        },
      ],
    });

    
    const device = computed({
      get: () => {
        return store.state.device;
      },
      set: (val: any) => {},
    });
    onMounted(() => {});

    const moveNav = (index: number) => {
      state.is_open = index;
    };
    const leaveNav = () => {
      state.is_open = -1;
    };
    const triggerMobMenu = () => {
      state.mobMenu = !state.mobMenu;
      // 只要关闭移动端的menu图示,就要重置用户点击的折叠菜单
      if (!state.mobMenu) {
        state.is_open = -1;
      }
    };
    const mobNav_menu = (index: number) => {
      if (state.is_open == index) {
        state.is_open = -1;
      } else {
        state.is_open = index;
      }
    };

    const navJump = (item: any) => {
      state.mobMenu = false;
      if (item.href) {
        router.push(item.href);
      }
    };
    const navChildJump = (item: any) => {
      if (item.link) {
        state.mobMenu = false;
        router.push(item.link);
      }
    };

    const switchLanguage = () => {
      const locale = i18n.locale.value === "cn" ? "en" : "cn";
      i18n.locale.value = locale;
      setItem("locale", locale);
      state.local = locale == "cn" ? "EN" : "CN";
    };
    // 将响应式数据对象return出去供template使用
    return {
      // 将代理对象转换为纯对象。并使用扩展操作符展开，方便使用，否则使用方式为state.???方式。转换后可以直接使用state里的对象属性
      ...toRefs(state),
      i18n,
      device,
      moveNav,
      leaveNav,
      triggerMobMenu,
      mobNav_menu,
      navJump,
      navChildJump,
      switchLanguage,
    };
  },
});
</script>
<style lang="scss" src="./style.scss"></style>
