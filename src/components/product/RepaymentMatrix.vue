<style lang="scss" scoped>
  .repayment-matrix{
    position: relative;
    width: 250px;
    height: 160px;
    margin-bottom: 10px;
    display: inline-block;
    .layered-container{
      display: flex;
      flex-direction: column;

      &.is-horizontal{
        flex-direction: row;
      }
    }

    .layered{
      position: relative;
      border: 1px solid #fff;
      display: flex;
      align-items: center;
      justify-content: center;
      overflow: hidden;
      height: 100%;
      font-size: 12px;
      color: #fff;
      text-align: center;

      .layered-used-space{
        position: absolute;
        top: 0;
        right: 0;
        left: 0;
        opacity: 1;
        pointer-events: none;
        background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAGCAYAAAD37n+BAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAF8WlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS42LWMxNDAgNzkuMTYwNDUxLCAyMDE3LzA1LzA2LTAxOjA4OjIxICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyIgeG1sbnM6cGhvdG9zaG9wPSJodHRwOi8vbnMuYWRvYmUuY29tL3Bob3Rvc2hvcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RFdnQ9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZUV2ZW50IyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ0MgKE1hY2ludG9zaCkiIHhtcDpDcmVhdGVEYXRlPSIyMDE4LTA2LTEzVDEzOjQ4OjU3KzA4OjAwIiB4bXA6TW9kaWZ5RGF0ZT0iMjAxOC0wNi0xM1QxNDoxNDozNyswODowMCIgeG1wOk1ldGFkYXRhRGF0ZT0iMjAxOC0wNi0xM1QxNDoxNDozNyswODowMCIgZGM6Zm9ybWF0PSJpbWFnZS9wbmciIHBob3Rvc2hvcDpDb2xvck1vZGU9IjMiIHBob3Rvc2hvcDpJQ0NQcm9maWxlPSJzUkdCIElFQzYxOTY2LTIuMSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDoyZGIxNzU5NC05OWVmLTRjZTEtOWRkMi1iNTIwZmM0OTAyOTEiIHhtcE1NOkRvY3VtZW50SUQ9ImFkb2JlOmRvY2lkOnBob3Rvc2hvcDo2NDliNzgyMC0yOGUxLTIyNDctOWMxOS1jMTI3YTQwNmJlZDUiIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDowZjIwZWFmMC01NDExLTQ4NmQtYWYxYS1lZTI4NzM3ZjQ1ODYiPiA8eG1wTU06SGlzdG9yeT4gPHJkZjpTZXE+IDxyZGY6bGkgc3RFdnQ6YWN0aW9uPSJjcmVhdGVkIiBzdEV2dDppbnN0YW5jZUlEPSJ4bXAuaWlkOjBmMjBlYWYwLTU0MTEtNDg2ZC1hZjFhLWVlMjg3MzdmNDU4NiIgc3RFdnQ6d2hlbj0iMjAxOC0wNi0xM1QxMzo0ODo1NyswODowMCIgc3RFdnQ6c29mdHdhcmVBZ2VudD0iQWRvYmUgUGhvdG9zaG9wIENDIChNYWNpbnRvc2gpIi8+IDxyZGY6bGkgc3RFdnQ6YWN0aW9uPSJzYXZlZCIgc3RFdnQ6aW5zdGFuY2VJRD0ieG1wLmlpZDoyZGIxNzU5NC05OWVmLTRjZTEtOWRkMi1iNTIwZmM0OTAyOTEiIHN0RXZ0OndoZW49IjIwMTgtMDYtMTNUMTQ6MTQ6MzcrMDg6MDAiIHN0RXZ0OnNvZnR3YXJlQWdlbnQ9IkFkb2JlIFBob3Rvc2hvcCBDQyAoTWFjaW50b3NoKSIgc3RFdnQ6Y2hhbmdlZD0iLyIvPiA8L3JkZjpTZXE+IDwveG1wTU06SGlzdG9yeT4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz7e4M9IAAAAKElEQVQYlWP8//8/AxQ0oNFYxZkYSAQsxJoMAyTbwIjkB7wmM5DrBwBqHAuHsM3a0gAAAABJRU5ErkJggg==) repeat;
      }
    }

    .layered-info{
      position: absolute;
      width: 130px;
      padding: 5px;
      background-color: #fff;
      font-size: 12px;
      line-height: 1.77;
      color: #555;
      z-index: 9999;
      box-shadow: 0 0 3px 0 rgba(0, 0, 0, .2);
      
      p {
        span{
          color: #999;
          margin-right: 3px;
        }
      }
    }
  }
</style>

<template>
  <div class="repayment-matrix">
    <div v-for="(con, i) in computedLayers"
         class="layered-container"
         :class="{'is-horizontal': con.layer.length > 1}"
         :style="{height: con.height, backgroundColor: con.backgroundColor}"
         :key="i">
      <div class="layered"
           v-for="(item, index) in con.layer"
           :style="item.offerAmountStyle"
           @mouseover="showInfo($event, item)"
           @mouseout="hideInfo"
           :key="index">
        <div class="layered-used-space" :style="item.payAmountStyle"></div>
        <!-- {{item.text}} -->
      </div>
    </div>
    <div class="layered-info" :style="layeredInfoStyles">
      <p><span>证券简称</span>{{layeredInfo.name}}</p>
      <p><span>分层占比</span>{{layeredInfo.offerAmountPercent.toFixed(2)}}%</p>
      <p><span>初始本金</span>{{layeredInfo.offerAmounts}}</p>
      <p><span>剩余本金</span>{{layeredInfo.closingBalance}}</p>
      <p><span>剩余占比</span>{{layeredInfo.closingBalanceRate}}%</p>
    </div>
  </div>
</template>

<script>
  import utilsIndex from '@/utils/index.js'
  export default {
    name: "RepaymentMatrix",
    props: {
      data: {
        type: Array,
        default: () => []
      }
    },
    data() {
      return {
        layers: [],
        computedLayers: [],
        layeredInfoStyles: {
          top: 0,
          left: 0,
          display: 'none'
        },
        layeredInfo:{
          name: '',
          offerAmount: '',
          closingBalance: '',
          closingBalanceRate:'',
          remainingPercent: 0,
          offerAmountPercent: 0,
        }
      }
    },
    created() {
      this.initLayer();
    },
    methods: {
      initLayer() {
        let totalOfferAmount = 0;
        this.data.forEach(v => {
          console.log(v)
          totalOfferAmount += parseFloat(v.OfferAmount);
        });

        let layers = {};
        let layerColors = [
          '#759ae4',
          '#5566ce',
          '#01d5bf',
          '#00c673',
          '#bfd52a',
          '#f19603',
          '#a36fff'
        ];
        this.data.forEach((v,i) => {
          let offerAmount =  v.OfferAmount ? parseFloat(v.OfferAmount) : 0;
          let offerAmounts =  v.OfferAmount ? utilsIndex.numUnit(v.OfferAmount) : 0;
          let payAmount = v.PayAmount ? parseFloat(v.PayAmount) : 0;
          let closingBalance = v.ClosingBalance ? utilsIndex.numUnit(v.ClosingBalance) : 0;
          let closingBalanceRate = v.ClosingBalanceRate ? parseFloat(v.ClosingBalanceRate) : 0;
          let payAmountPercent = payAmount / offerAmount * 100;
          let offerAmountPercent = offerAmount / totalOfferAmount * 100;
          let currentLayer = {
            name: v.ShortName,
            className: v.ClassName,
            payAmountPercent: payAmountPercent,
            payAmountStyle: {
              height: payAmountPercent + '%',
            },
            offerAmountPercent: offerAmountPercent,
            offerAmountStyle: {
              width: '100%',
              backgroundColor: layerColors[i]
            },
            text: ((v.ClassName) ? v.ClassName : '未知') + ' ' + Math.round(offerAmountPercent) + '%',
            offerAmounts:offerAmounts,
            closingBalance,
            closingBalanceRate,
            remainingPercent: (closingBalance / offerAmount),
            value: offerAmount
          };

          if(!layers[v.ClassName]) layers[v.ClassName] = [];

          layers[v.ClassName].push(currentLayer);

        });

        let computedLayers = [];

        let freePercent = 100;

        const fixedPercent = function(percent, freeCount) {
          let o = 100 / 6;
          if(percent <= o) {
            freePercent -= o;
            return o + '%';
          }
          if(percent === 100) return '100%';
          let currentPercent = percent - (percent % o);
          if( freePercent <= currentPercent ) {
            return freePercent + '%';
          }else{

            freePercent -= currentPercent;
            if(freeCount > 1) {
              let needMinPercent = freeCount * o;
              if(freePercent < needMinPercent) {
                currentPercent =  currentPercent - (needMinPercent - freePercent);
                freePercent = freePercent + (needMinPercent - freePercent);
              }
            }
            if(freePercent > o && freeCount === 1) {
              let needFloatPercent = freePercent - o;
              currentPercent += needFloatPercent;
              freePercent += needFloatPercent;
            }
            return currentPercent + '%';
          }
        };

        layers = Object.values(layers);

        let totalCount = layers.length;

        

        layers.forEach( (layer, i) => {
          let count = layer.length;
          let height = 0;
          if(count > 1) {
            let totalPercent = layer.map(v=> v.offerAmountPercent).reduce((prev, next) => prev + next);
            layer.forEach(v => {
              v.offerAmountStyle.width = (v.offerAmountPercent / totalPercent * 100) + '%';
            });
            height = totalPercent;
          }else{
            height = layer[0].offerAmountPercent;
          }
          computedLayers.push({
            height: fixedPercent(height, totalCount - (i + 1)),
            layer,
            backgroundColor: layerColors[i]
          })
        });
        this.computedLayers = computedLayers;
        this.layers = layers;
      },
      showInfo(event, item) {
        //console.log(e)
        let evt = event.target;
        let actualLeft = evt.offsetLeft + (evt.offsetWidth / 4);
        let actualTop = evt.offsetTop + (evt.offsetHeight / 2) + 10;
        let current = evt.offsetParent;
        while (current !== null && current !== this.$el){
          actualTop += current.offsetTop;
          actualLeft += current.offsetLeft;
          current = current.offsetParent;
        }

        if(actualLeft >= 130) {
          actualLeft -= (this.$el.offsetWidth - 130);
        }
        this.layeredInfoStyles = {
          left: actualLeft + 'px',
          top: actualTop + 'px',
          display: 'block'
        };
        this.layeredInfo = item;
      },
      hideInfo(event) {
        //console.log('out', event)
        let evt = event.toElement;
       if(!this.$el.contains(evt)){
         this.layeredInfoStyles.display = 'none';
       }
      }
    },
  }
</script>
