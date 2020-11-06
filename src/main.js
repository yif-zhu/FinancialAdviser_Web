// 默认babel中需要的polyfill
import '@babel/polyfill'
// 导入自定义的polyfill
import '@/utils/polyfill.js';

import Vue from 'vue';
import App from './App.vue';
import router from './router/index';
import store from './store/index';
import BaseDialog from './components/BaseDialog.vue';
/**
 * 样式初始化，重置浏览器的默认表现
 * normalize.css 是一个开源库，请勿直接修改此文件， 如有需要，
 * 请在normalize-ui.css文件中定义浏览器的默认样式
 * */
import '@/assets/css/normalize.css';
import '@/assets/css/normalize-ui.css';

/* 使用Element UI */
import ElementUI from 'element-ui';
import './assets/scss/theme.scss'

// 共用样式
import '@/assets/scss/common.scss';
import VueQuillEditor from 'vue-quill-editor'

import 'quill/dist/quill.core.css';
import 'quill/dist/quill.snow.css';
import 'quill/dist/quill.bubble.css';
Vue.use(VueQuillEditor)

import CommonService from '@/api/CommonService';

Vue.config.productionTip = false;

// 挂载请求方法到vue实例上 调用存储过程可通过 this.$http("FixedIncome", "xxxxx");
Vue.prototype.$http = function (connName, spName, usingGet = false) {
  return new CommonService(connName, spName, usingGet);
};
// 设置页面标题
Vue.prototype.$title = function (title) {
  this.$store.commit('setSiteTitle', title);
};

Vue.use(ElementUI, { size: 'small', zIndex: 100 });

// 公用组件全局注册
Vue.component(BaseDialog.name, BaseDialog);


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');

