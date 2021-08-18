<template>
  <div class="lycontainer">
    <div class="setFooter">
      <div class="footer_link">
        <div class="footerLink_item" v-for="list in list" :key="list.id">
          <h3>
            {{ $t(`footer.${list.title}`) }}
          </h3>
          <ul v-for="(item, idx) in list.children" :key="idx">
            <li>
              <p>
                <a :href="item.link" target="_blank">
                  {{ $t(`footer.${item.label}`) }}</a
                >
              </p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive, toRefs } from "vue";

export default defineComponent({
  name: "",
  setup(prop, context) {
    const state = reactive({
      list: [
        {
          title: "quickLink",
          id: 0,
          children: [
            {
              label: "quickLinkItem.quickLinkItem",
              link: "https://www.baidu.com",
            },
            {
              label: "quickLinkItem.quickLinkItem",
              link: "https://www.baidu.com",
            },
          ],
        },
        {
          title: "aboutUs",
          id: 1,
          children: [
            {
              label: "aboutUsItem.aboutUsItem",
              link: "https://www.baidu.com",
            },
            {
              label: "aboutUsItem.aboutUsItem",
              link: "https://www.baidu.com",
            },
          ],
        },
        {
          title: "contactUs",
          id: 2,
          children: [
            {
              label: "contactUsItem.contactUsItem",
              link: "https://www.baidu.com",
            },
            {
              label: "contactUsItem.contactUsItem",
              link: "https://www.baidu.com",
            },
          ],
        },
      ],
    });
    return {
      ...toRefs(state),
    };
  },
});
</script>

<style lang="scss" src="./style.scss"></style>
