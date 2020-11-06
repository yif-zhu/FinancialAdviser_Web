import {mapState, mapMutations} from 'vuex';

export default {
  computed: {
    ...mapState('dynamicTabs', ["currentTab", "isActivated"])
  },
  methods: {
    ...mapMutations('dynamicTabs',['addTab', 'setCacheTabs']),
    newTab(tab) {
      if(typeof tab !== 'object') return;
      // 默认自动打开
      if(typeof tab.autoOpen === 'undefined') tab.autoOpen = true;
      // 默认允许关闭
      if(typeof tab.closable === 'undefined') tab.closable = true;
      this.addTab(tab);
      this.setCacheTabs();
      if(tab.title && tab.autoOpen) {
        this.$title(tab.title);
        let currentTab = JSON.parse(JSON.stringify(this.currentTab));
        this.$router.push(currentTab);
      }
    },
  },
}
