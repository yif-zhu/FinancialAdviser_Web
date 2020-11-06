const webpack = require('webpack');
// 是否是生产环境
const isProd = process.env.NODE_ENV === 'production';

module.exports = {
  publicPath:  isProd ? '' : '/',
  // 开发环境配置
  devServer: {
    proxy: {
      '/Common': {
        target: process.env.VUE_APP_Domain,
        changeOrigin: true,
        pathRewrite: {//重写路径
          "^/Common": ''//代理路径
        }
      },
      // 代理服务端请求 上下文配置
      '/Services': {
        target: process.env.VUE_APP_Domain,
        changeOrigin: true
      },
      '/TaskProcessEngine': {
        target: process.env.VUE_APP_Domain,
        changeOrigin: true
      },
      // 这几个只能代理出页面，对页面中的请求无法拦截，只做样式调整参考
      '/GoldenStandABS': {
        target: process.env.VUE_APP_Domain,
        changeOrigin: true
      },
      '/QuickDeal': {
        target: process.env.VUE_APP_Domain,
        changeOrigin: true
      },
      '/FileBaseFolder': {
        target: process.env.VUE_APP_Domain,
        changeOrigin: true
      }
    },
    // 开发调试端口
    port: 8080,
    // 自动打开浏览器 (mac 需要设置为true)
    open: process.platform === 'darwin',
    disableHostCheck: true
  },
  productionSourceMap: !isProd,
  // 关闭语法检查
  // lintOnSave: false,
  // 完整ES版（支持template属性） 默认不推荐开启
  // runtimeCompiler: true,
  configureWebpack:{
    plugins: [
      new webpack.ProvidePlugin({
        $: "jquery",
        jQuery: "jquery",
        "windows.jQuery": "jquery"
      }),
    ]
  },
  pages: {
    index: {
      entry: process.env.VUE_APP_IsSimple === '0' ? 'src/main.js' : 'src/main.simple.js',
    }
  },
  css: {
    loaderOptions: {
      sass: {
        data: '@import "@/assets/scss/global-variables.scss";'
      }
    }
  },
};
