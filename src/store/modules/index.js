// 搜索当前目录
const files = require.context('.', false, /\.js$/);
// 所有模块
const modules = {};

// 遍历文件目录
files.keys().forEach(key => {
  if (key === './index.js') return;
  let module = files(key).default;
  // 强制使用命名空间
  if(!module.namespaced) {
    module.namespaced = true;
  }
  modules[key.replace(/(\.\/|\.js)/g, '')] = module;
});

// 导出所有模块到Vuex
export default modules;
