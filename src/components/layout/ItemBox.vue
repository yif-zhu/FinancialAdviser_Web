<style lang="scss" scoped>
  .itemBox{
    margin-bottom: 20px;

    &-title{
      display: flex;
      justify-content: space-between;
      height: 50px;
      align-items: center;

      &--left{
        color: $--color-black;
        position: relative;
        padding-left: 18px;
        font-size: 14px;
        &:before{
          position: absolute;
          content: '';
          width: 6px;
          height: 6px;
          background-color: $--color-primary;
          top: 5px;
          left: 3px;
          box-shadow: #5264d92b -1px 8px 2px 0;
        }
      }

    }

    &-content{
      background: #fff;
      padding: 15px;
      box-shadow: rgb(233, 238, 255) 0 0 40px;
    }
  }
</style>

<template>
  <div class="itemBox">
    <div class="itemBox-title">
      <div class="itemBox-title--left">
        <slot name="left">{{title}}</slot>
      </div>
      <div class="itemBox-title--right">
        <slot name="right"></slot>
      </div>
    </div>
    <div class="itemBox-content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  export default {
    name: "ItemBox",
    props: {
      title: {
        type: String
      }
    }
  }
</script>
