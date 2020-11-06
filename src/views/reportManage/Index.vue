<template>
  <AppContainer>
    <AppHeader></AppHeader>
    <AppContent></AppContent>
    <AppFooter></AppFooter>
  </AppContainer>
</template>

<script>
  import AppContainer from '@/components/layout/AppContainer.vue';
  import AppHeader from '@/components/layout/AppHeader.vue';
  import AppContent from '@/components/layout/AppContent.vue';
  import AppFooter from '@/components/layout/AppFooter.vue';
  import {mapState, mapMutations} from 'vuex';
  export default {
    name: "ReportIndex",
    data() {
      return {
      }
    },
    components: { AppHeader, AppContent, AppFooter,  AppContainer},
  }
</script>

<style lang="scss" scoped>

</style>
