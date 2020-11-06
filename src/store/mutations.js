import cookie from '@/utils/cookie.js';

// 所有对状态的更改都通过mutations处理，其类似于自定义事件 $emit('xxxx')
export default {
  // 切换语言
  changeLanguage(state, locale) {
    state.locale = locale;
  },
  // 显示导航栏
  changeHeaderVisible(state, visible) {
    if(visible) {
      if(!state.showHeader) {
        state.showHeader = visible;
      }
    }else{
      state.showHeader = visible;
    }
  },
  sendMessage(state, payload) {
    if(typeof payload === 'object') {
      state.message = payload.message;
      if (payload.type !== undefined) {
        state.messageType = payload.type;
      }else{
        state.messageType = 'success';
      }
    }else{
      state.message = payload;
    }
  },
  // 设置登录状态
  setLoginStatus(state, status) {
    state.isLogin = status;
    if(status === false) {
      cookie.delete('');
    }
  },
  setRedirect(state, url) {
    state.redirect = url;
  },
  // 设置站点标题
  setSiteTitle(state, subtitle) {
    let title = state.siteTitle;
    if(subtitle) {
      title = subtitle + ' - ' + title;
    }
    document.title = title;
  },
  setIndicatorStatus(state, statue) {
    state.showIndicator = statue;
  },
  showIndicatorWindow(state, payload) {
    if(!payload.url && payload.url === '') return;
    state.showIndicator = true;
    state.taskProcessUrl = payload.url;
    state.taskProcessCallback = payload.callback || function () {};
  },
  kendoIsInit(state, val) {
    state.kendoIsInit = val;
  },
  setPageUrl(state, url) {
    state.pageUrl = url;
  },
};
