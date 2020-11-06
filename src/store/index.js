import Vue from 'vue';
import Vuex from 'vuex';
import createLogger from 'vuex/dist/logger';
import modules from './modules';
import mutations from './mutations.js';
import actions from './actions.js';
import cookie from '../utils/cookie.js';
import keys from '../utils/keys.js'

// vuex 是一个针对于构建复杂逻辑应用的状态管理工具
// 可以帮助我们解决页面传值，多个组件共享状态的问题
Vue.use(Vuex);

const isProd = process.env.NODE_ENV === 'production';

// 导出Vuex实例
export default new Vuex.Store({
  // state类似于Vue组件中的data， 只不过这里被当做共享属性，
  // （注意：虽然所有组件都能获取到这个共享属性，但却不能直接在组件中修改它们的值），
  // 我们可以把与业务逻辑不想关，与页面显示完全相关的全局状态添加到这里
  state: {
    locale: 'zh-CN',
    languages: {
      'zh-CN': '简体中文',
      'en-US': 'English'
    },
    showHeader: false,
    showIndicator: false,
    taskProcessUrl: '',
    taskProcessCallback: function() {},
    isLogin: false,
    redirect: '',
    siteTitle: process.env.VUE_APP_TITLE,
    kendoIsInit: false,
    // 记录用户停留页面，用于上报错误信息
    pageUrl: '',
    message: '',
    messageType: 'success',
  },
  // getters类似于Vue组件中的计算属性
  getters: {
    loggedIn: (state) => (state.isLogin || cookie.get(keys.userInfo) !== null ),
  },

  // 用来修改state中的值，记录状态的变化
  mutations,
  actions,
  modules,
  strict: process.env.NODE_ENV !== 'production',
  plugins: !isProd ? [createLogger()] : []
});
