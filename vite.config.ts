import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  base: "./",//打包路径
  resolve: {
    alias: {
      // @ts-ignore
      '@': path.resolve(__dirname, './src')//设置别名
    }
  },
  server: {
    port: 8899,//启动端口
    open: true,
    // proxy: null,
    // proxy: {
    //   // 选项写法
    //   '/': 'http://99.97.247'//代理网址
    // },
    cors: true
  }
})
