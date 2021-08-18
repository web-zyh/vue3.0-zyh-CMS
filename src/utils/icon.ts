/** 
 * 动态引入路由里的icon图标
 * 用例:
 * 1.引入ts文件
 * import { Icon } from "utils/icon";
 * 2.vue中注册该组件
 * components: {
    Icon
   },
   3. icons（'GlobalOutlined'）可写任意字符串类型的图标名称
    <Icon :icon="icons" />
*/
import { createVNode } from 'vue'
import  * as $Icon from '@ant-design/icons-vue'

export const Icon = (props: { icon: string }) => {
  const { icon } = props;
  let Icons = $Icon as any;
  return createVNode(Icons[icon] );
};