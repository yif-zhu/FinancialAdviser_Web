<template>
  <div class="iframe-page">
    <loading v-show="loadingS" :className="className" v-if="!loadingNo"></loading>
    <iframe id="iframePage" name="iframePage" :src="iframeUrl" ></iframe>
  </div>
</template>

<script>
import loading from '@/components/common/Loading'
export default {
  name: "DataAssetPool",
  data () {
    return {
      loadingS: true,
      className:'loader-iframe',
    }
  },
  props:{
    iframeUrl: {
      type: String,
      default:''
    },
    loadingNo:[Boolean]
  },
  components: {
    loading
  },
  watch: {
  },
  created() {
    var self = this;
    self.$nextTick(() => {
      var iframe = document.getElementById('iframePage');
      if (iframe.attachEvent){
        console.log('有事件')
        iframe.attachEvent('onload',function(){
          console.log('加载完毕1')
          self.loadingS = false
        })
      }else{
        console.log('无事件')
        iframe.onload = function () {
          console.log('加载完毕2')
          self.loadingS = false
        }
      }
     
    })
  },
  methods: {
    
  }
}
</script>

<style lang="scss" scoped>
.iframe-page{
  position: relative;
  margin: 0;
  display: flex;
  flex: 1;
  min-height: 100%;
  > iframe{
    min-height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
  }
}
</style>
