<style lang="scss">
  .app-content{
    height: 100%;
  }
</style>

<template>
  <div class="app-content">
    <slot name="prepend"></slot>
    <router-view></router-view>
    <slot name="append"></slot>
  </div>
</template>

<script>
  export default {
    name: "AppContent"
  }
</script>
