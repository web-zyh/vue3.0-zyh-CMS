const path = require("path");

const isProduction = process.env.NODE_ENV === "production"; // 是否为生产环境
const debug = !isProduction;

function resolve(dir) {
    return path.join(__dirname, dir);
}
module.exports = {
    outputDir: "dist", // 打包输出文件目录
    lintOnSave: true, // eslint-loader 是否开启eslint
    // 生产环境是否生成 sourceMap 文件
    productionSourceMap: false, // 改为false。最终打包的文件中会出现一些map文件，map文件的作用在于：项目打包后，代码都是经过压缩加密的，如果运行时报错，输出的错误信息无法准确得知是哪里的代码报错。
    devServer: {
        open: true, // 自动开启浏览器
        port: 8089, // 设置启动端口
        https: false,
        hotOnly: false,
        proxy: null
            // proxy: { // 设置代理
            //     '/': {
            //         // target: 'http://172.0.37.11:19999',//代理地址，这里设置的地址会代替axios中设置的baseURL
            //         changeOrigin: true, // 如果接口跨域，需要进行这个参数配置
            //         //ws: true, // proxy websockets
            //         secure: false, // 如果是https接口，需要配置这个参数
            //         //pathRewrite方法重写url
            //         pathRewrite: {
            //             // '^/server': '/'
            //             //pathRewrite: {'^/api': '/'} 重写之后url为 http://192.168.1.16:8085/xxxx
            //             //pathRewrite: {'^/api': '/api'} 重写之后url为 http://192.168.1.16:8085/api/xxxx
            //         }
            //     }
            // }
    }
};