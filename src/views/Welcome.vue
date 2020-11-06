<style lang="scss" scoped>

</style>

<template>
  <div>
    <AppHeader></AppHeader>
    <AppContent></AppContent>
    <AppFooter></AppFooter>
  </div>
</template>

<script>
  import AppHeader from '@/components/layout/AppHeader.vue';
  import AppContent from '@/components/layout/AppContent.vue';
  import AppFooter from '@/components/layout/AppFooter.vue';

  export default {
    name: "Welcome",
    components: { AppHeader, AppContent, AppFooter},
    data() {
      return {
        active: '1',
      }
    },
    created() {
      this.$title('欢迎');
    },
  }
</script>
