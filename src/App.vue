<style lang="scss">
  #app{
    height: 100%;
    // background: linear-gradient(#2b3daf 60%, #fff );
  }
</style>
<template>
  <div id="app">
    <router-view></router-view>
    <BaseDialog title="任务处理"
                width="450px"
                top="10vh"
                :visible="showIndicator"
                :close-on-click-modal="false"
                :draggable="true"
                ref="taskProcess"
                v-if="showIndicator"
                append-to-body
                @close="handleClose">
      <div class="taskProcess-window">
        <iframe :src="taskProcessUrl" frameborder="0" id="Task_Indicator_Page"></iframe>
      </div>
    </BaseDialog>
  </div>
</template>

<script>
  import {
    mapState,
    mapMutations,
    mapActions
  } from "vuex";

  export default {
    computed: {
      ...mapState(["redirect", "showIndicator", "taskProcessUrl", "taskProcessCallback"])
    },
    methods: {
      ...mapMutations(["setRedirect", "setIndicatorStatus"]),
      ...mapActions("user", ["getUserInfo"]),
      handleClose() {
        // 关闭运行窗口时执行task回调
        this.setIndicatorStatus(false);
        this.taskProcessCallback();
      },
    },
    watch: {
      // 自定义跳转
      redirect(to, from) {
        if (to !== "" && to !== from) {
          if (to.toLowerCase() === "/login") {
            let path = '';
            // 多个接口同时返回错误导致跳转失败，所以先清空跳转
            this.setRedirect('');
            if (process.env.VUE_APP_CUSTOMER && process.env.VUE_APP_CUSTOMER === 'huatai') {
              // 华泰需要免登录
              path = '/vvauto-login';
            }else{
              path = '/login';
            }
            // 防止重复添加redirectUrl
            if(!this.$route.query.redirectURL) {
              this.$router.push({
                path: path,
                query: {
                  redirectURL: this.$router.currentRoute.fullPath
                }
              });
            }
          } else {
            this.$router.push(to);
          }
        }
      }
    },
    mounted() {
      // 第一次进来去缓存里取登录信息
      this.getUserInfo();
    }
  }
</script>
