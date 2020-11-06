<style lang="scss" module>
  .app-container{
    //background: url(@/assets/images/bg.svg) no-repeat;
    height: 100%;
    //background-size: contain;
    position: relative;
    padding-top: 40px;
  }
</style>

<template>
  <div :class="$style['app-container']">
    <slot></slot>
  </div>
</template>

<script>
  export default {
    name: "AppContainer",
    data() {
      return {
      }
    }
  }
</script>
