import Vue from 'vue';
import Router from 'vue-router';
import store from '../store/';

Vue.use(Router);

// 搜索当前目录
const context = require.context('.', false, /\.js$/);
const modules = context.keys().filter(item => item !== './index.js').map(key => context(key).default);

const routes = [{
    path: '/',
    name: 'Welcome',
    meta: {
      requiresAuth: true
    },
    redirect: '/Enterprise/EnterpriseList',
  },
  {
    path: '/Login',
    name: 'Login',
    meta: {
      title: '登录'
    },
    component: () =>
      import('../views/Login.vue')
  },
  ...modules
];

// if (!process.env.VUE_APP_CUSTOMER || process.env.VUE_APP_CUSTOMER !== 'xiaomi') {
//   routes.push({
//     path: '/vvauto-login',
//     name: 'AutoLogin',
//     meta: {
//       title: '登录'
//     },
//     component: () =>
//       import('../views/AutoLogin.vue')
//   })
// }

const router = new Router({
  routes
});
router.beforeEach((to, from, next) => {
  // 验证登录权限
  // 控制导航栏显示隐藏
  if (to.path === '/login' || to.name === '404') {
    store.commit('changeHeaderVisible', false);
  } else {
    store.commit('changeHeaderVisible', true);
  }
  if (to.meta.requiresAuth) {
    if (store.getters.loggedIn) {
      store.commit('setPageUrl', to.fullPath);
      next();
    } else {
      let path = '';
      if (process.env.VUE_APP_CUSTOMER && process.env.VUE_APP_CUSTOMER === 'huatai') {
        // 华泰需要免登录
        path = '/vvauto-login';
      }else{
        path = '/login';
      }
      next({
        path,
        query: {
          redirectURL: to.fullPath
        } // 将当前路由路径作为参数，登录成功后跳转回该路径
      });
    }
  } else {
    next();
  }
});

// 导出Router实例
export default router;
