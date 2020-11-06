/* 动态标签栏 */
export default {
  state: {
    currentTab: null,
    currentTabIndex:'',
    tabs: [],
    cacheTabs: [], // 组件缓存
    tabIndex: 0,
    isActivated: false
  },
  mutations: {
    // 新增或更新
    addTab(state, payload) {
      if(typeof payload !== 'object') return;
      // 默认自动打开
      if(typeof payload.autoOpen === 'undefined') payload.autoOpen = true;
      // 默认允许关闭
      if(typeof payload.closable === 'undefined') payload.closable = true;
      if(payload.id === undefined) {
        payload.id = ++state.tabIndex + '';
      }else{
        payload.id = payload.id + '';
      }
      let len = state.tabs.length;
      for (let i = 0; i < len; i++) {
        let tab = state.tabs[i];
        if (tab.id !== undefined &&
          tab.id === payload.id) {
          if(payload.title) tab.title = payload.title;
          if(payload.name) tab.name = payload.name;
          if(tab.params !== undefined &&
            payload.params !== undefined) {
            // 相当于路由params属性
            tab.params = payload.params;
          }
          if(tab.autoOpen) {
            state.currentTab = tab;
            state.currentTabIndex = tab.id;
          }
          return;
        }
      }
      state.tabs.push(payload);
      // 在router-view模式下是否缓存（for keep-alive）
      if(payload.isCache && (state.cacheTabs.indexOf(payload.id) === -1)) {
        state.cacheTabs.push(payload.id);
      }
      if(payload.autoOpen) {
        state.currentTab = payload;
        state.currentTabIndex = payload.id;
      }
    },
    setTab(state,payload) {
      if(typeof payload !== 'object') return;
      let len = state.tabs.length;
      for (let i = 0; i < len; i++) {
        let tab = state.tabs[i];
        if (tab.id !== undefined &&
          tab.id === payload.id) {
          tab.name = payload.name;
        }
      }
    },
    setCurrentTab(state, payload) {
      if(typeof payload !== 'object') return;
      state.currentTab = payload;
    },
    setCurrentTabIndex(state, payload) {
      state.currentTabIndex = payload;
    },
    // 本地缓存
    setCacheTabs(state) {
      localStorage.setItem('dynamicTabs', JSON.stringify(state));
    },
    removeCacheTabs() {
      localStorage.removeItem('dynamicTabs');
    },
    removeTab(state, id) {
      if(typeof id !== 'string') id = id.toString();
      let len = state.tabs.length;
      for(let i = 0 ; i < len; i++) {
        let tab = state.tabs[i];
        if(tab.id === id) {
          if (state.currentTabIndex === id) {
            let nextTab = state.tabs[i + 1] || state.tabs[i - 1];
            if(nextTab) {
              state.currentTab = nextTab;
              state.currentTabIndex = nextTab.id;
            }
          }
          if(tab.isCache) {
            let cacheIndex = state.cacheTabs.indexOf(tab.id);
            if(cacheIndex > -1) {
              state.cacheTabs.splice(cacheIndex, 1);
            }
          }
          state.tabs.splice(i, 1);
          return;
        }
      }
    },
    setAllTabs(state) {
      let tabs = localStorage.getItem('dynamicTabs');
      let payload = (typeof tabs === 'string') ? JSON.parse(tabs) : null;
      if(!payload) return;
      state.tabs = payload.tabs;
      state.cacheTabs = payload.cacheTabs;
      state.currentTab = payload.currentTab;
      state.currentTabIndex = payload.currentTabIndex;
      state.tabIndex = payload.tabIndex;
      // 动态标签是新鲜的 （此属性用于拿到最新tabs数据后做一些新增操作）
      state.isActivated = true;
    },
    removeAllTabs(state) {
      state.tabs = [];
      state.cacheTabs = [];
      state.currentTab = null;
      state.currentTabIndex = '';
      state.tabIndex = 0;
      // 动态标签凋谢了
      state.isActivated = false;
    },
  }
};
