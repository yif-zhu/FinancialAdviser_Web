<template>
  <el-tabs class="dynamic-tab"
           v-model="activeIndex"
           @tab-remove="handleRemove"
           @tab-click="handleClick"
           type="card">
    <el-tab-pane v-for="item in tabs"
                 :key="item.id"
                 :label="item.title"
                 :labelContent="()=>(item)"
                 :name="item.id"
                 :closable="item.closable">
    </el-tab-pane>
  </el-tabs>
</template>

<script>
  import { createNamespacedHelpers } from 'vuex';
  const { mapState, mapMutations } = createNamespacedHelpers('dynamicTabs');
  export default {
    name: "DynamicTab",
    data: () => ({
      activeIndex: ''
    }),
    created() {
      this.setAllTabs();
    },
    mounted() {
      this.activeIndex  = this.currentTabIndex;
      var self = this;
      var _beforeUnload_time = 0, _gap_time = 0;
      var is_fireFox = navigator.userAgent.indexOf("Firefox")>-1;
      window.addEventListener('unload', e => {
        _gap_time = new Date().getTime() - _beforeUnload_time
        if(_gap_time <= 5) {
          console.log('sx11')
          self.removeAllTabs();
          self.removeCacheTabs();
        }
      })
      window.addEventListener('beforeunload',() => {
        _beforeUnload_time = new Date().getTime()
        if(is_fireFox) {//火狐关闭执行
          console.log('sx22')
          self.removeAllTabs();
          self.removeCacheTabs();
        }

      });
    },
    computed: {
      ...mapState(['tabs', 'currentTab', 'currentTabIndex'])
    },
    watch: {
      currentTabIndex(v) {
        if(v !== '' && v !== this.activeIndex) {
          this.activeIndex = v;
        }
      }
    },
    methods: {
      ...mapMutations([
        'removeTab',
        'setCurrentTab',
        'setCurrentTabIndex',
        'setCacheTabs',
        'setAllTabs',
        'removeAllTabs',
        'removeCacheTabs',
      ]),
      handleRemove(id) {
        this.removeTab(id);
        this.$router.push(this.currentTab);
        this.setCacheTabs();
      },
      handleClick(tab) {

        this.setCurrentTabIndex(tab.name);
        // 利用element一个多余的参数来挂载一些数据 （不知道未来会不会被干掉）
        let currentTab = tab.labelContent();
        console.log(currentTab)
        this.setCurrentTab(currentTab);
        if(currentTab.title) {
          this.$title(currentTab.title);
          this.$router.push(JSON.parse(JSON.stringify(currentTab)));
          console.log(JSON.parse(JSON.stringify(currentTab)))
        }
      },
    },
    destroyed() {
      this.removeAllTabs();
      this.removeCacheTabs();
    }
  };
</script>
<style lang="scss">
  .dynamic-tab{
    position: absolute;
    width: 100%;
    top: 5px;
    .el-tabs__nav{
      border-radius: 2px!important;
    }
    // left: 10px;
    .el-tabs__nav-scroll{
      // background-color: #172374;
    }
    &.el-tabs--card > .el-tabs__header{
      border:none;
    }
    .el-tabs__nav-next, .el-tabs__nav-prev{
      line-height: 30px;
    }
    .el-tabs__nav.is-top>div{

      color: #fff;
    }
    .el-tabs__header.is-top {
      margin: 0;
    }
    &.el-tabs--card > .el-tabs__header .el-tabs__item.is-active,
    &.el-tabs--card > .el-tabs__header .el-tabs__item.is-active.is-closable{
      background-color:#d6b06e;
      border-bottom: none;
      color: #fff;
    }
    &.el-tabs--card > .el-tabs__header .el-tabs__nav{
      border:none;
      overflow: hidden;
    }
    .el-tabs__nav.is-top{
      height: 30px;
      line-height: 30px;
      background-color: #4b569c;
    }
    .el-tabs__nav.is-top > div{
      // border-bottom: 2px solid #5264d9;
      height: 30px;
      line-height: 30px;
      border-left: none!important;
      font-size: 12px;
      color: rgba(255, 255, 255, .8);
      &:hover{
        color: #fff;
      }
    }
    /*.el-tabs__nav.is-top > div:nth-child(1){*/
      /*border-top-left-radius: 0;*/
    /*}*/

  }
</style>
