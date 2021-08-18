<template>
  <div>
    <a-table :data-source="dataSource" :columns="columns" :bordered="true">
      <template #customTitle>
        <span>
          <smile-outlined />
          姓名
        </span>
      </template>
      <template #action="{ record }">
        <a-button type="link" @click="handelEdit(record)">编辑</a-button>
        <a-button type="link" @click="handelDelete(record)">删除</a-button>
      </template>
    </a-table>
  </div>
</template>
<script lang="ts">
import { SmileOutlined } from "@ant-design/icons-vue";
import { reactive, defineComponent, onMounted, toRefs } from "vue";
import { useStore } from "vuex";

export default defineComponent({
  components: { SmileOutlined },
  setup() {
    const tables = reactive({
      dataSource: [
        {
          key: "1",
          name: "张三",
          age: 12,
          address: "北京市",
        },
        {
          key: "2",
          name: "李四",
          age: 42,
          address: "天津市",
        },
        {
          key: "3",
          name: "费五",
          age: 32,
          address: "重庆市",
        },
      ],
      columns: [
        {
          dataIndex: "name",
          key: "name",
          slots: { title: "customTitle", customRender: "name" },
        },
        {
          title: "年龄",
          dataIndex: "age",
          key: "age",
        },
        {
          title: "地址",
          dataIndex: "address",
          key: "address",
        },
        {
          title: "操作",
          key: "action",
          slots: { customRender: "action" },
        },
      ],
    });
    const store = useStore();

    onMounted(() => {});

    const handelEdit = (record: any) => {
      console.log(record, "record");
    };
    const handelDelete = (record: any) => {
      console.log(record, "qqqq");
    };

    return {
      store,
      handelEdit,
      handelDelete,
      ...toRefs(tables),
    };
  },
});
</script>
