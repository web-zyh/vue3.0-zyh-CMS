## 介绍

项目基于`ant-design-vue`,`typescript`,`vue3.0`,实现的 vue3 风格的后台管理系统，

## gitHub 地址

[vue3.0-zyh](https://github.com/web-zyh)

## 文档

[文档地址,持续更新中。。，]

## mockjs 使用
开发思路:src目录下新建api和mock文件夹，项目上线前，或有后端接口时，书写env的VUE_APP_URL为后台请求地址，并全局替换掉引入的mock文件 ， 最终以api导出的方法名为准，当前结构api目录和mock目录导出方法名一致，
目地就是项目上线时全局替换掉引入的mock文件 
# 例如 
    import { LOGIN } from '@/mock/user/login';把当前路径mock改为api即可。以后创建新的接口请求，依照此种操作。
    import { LOGIN } from '@/mock/user/login'; 模拟数据接口
    import { LOGIN } from '@/api/user/login'; 真实服务器接口地址(注:配置env的VUE_APP_URL为后台请求地址)

## 安装

```js
// 拉取项目代码
git clone https://github.com/web-zyh/vue3.0-zyh-CMS.git

cd vue3.0-zyh-CMS

// 如果使用别的包管理工具，可以自行安装
npm install

// 运行
npm run dev

// 打包
npm run build