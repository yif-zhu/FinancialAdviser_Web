<template>
  <div class="productInformation detailPage">
    <ItemBox title="基本信息">
      <div class="base-info">
        <div class="left">
          <BaseInfo :line='2'>
            <li><span>企业名称</span><span>{{productDetail.TrustNameShort}}</span></li>
            <li><span>统一社会信用代码</span><span>{{productDetail.IssueAmount?productDetail.IssueAmount.toLocaleString():productDetail.IssueAmount}}</span></li>
            <li><span>企业类型</span><span>{{productDetail.TrustCode}}</span></li>
            <li><span>注册资本（万元）</span><span>{{productDetail.MarketCategoryName}}</span></li>
            <li><span>所属区域</span><span>{{productDetail.TrustStartDate}}</span></li>
            <li><span>所属行业</span><span>{{productDetail.MarketPlaceName}}</span></li>
            <li><span>企业简称</span><span>{{productDetail.ClosureDate}}</span></li>
            <li><span>成立日期</span><span>{{productDetail.AssetTypeName}}</span></li>
            <li><span>员工人数</span><span>{{productDetail.TrustStatus}}</span></li>
            <li><span>所属经营机构</span><span>{{productDetail.RegulatoryOrgName}}</span></li>
            <li><span>服务开始日期</span><span>{{productDetail.RegulatoryOrgName}}</span></li>
<!--            <li v-if="productDetail.TrustStatus !== '存续期'"><span>服务开始日期</span><span>{{productDetail.LiquidatedDate}}</span></li>-->
            <li><span>服务结束日期</span><span>{{productDetail.BasicAssetTypeName}}</span></li>
            <li><span>注册地址</span><span>{{productDetail.FirstCollectionDate}}</span></li>
            <li><span>经营范围</span><span>{{productDetail.CollectionMethodName}}</span></li>
          </BaseInfo>
        </div>
      </div>
    </ItemBox>
  </div>
</template>

<script>
  import RepaymentMatrix from '@/components/product/RepaymentMatrix.vue'
  import BaseInfo from '@/components/common/BaseInfo.vue'
  import ItemBox from '@/components/layout/ItemBox.vue'
  import { BasePath } from '@/utils/config.js';
  export default {
    data() {
      return {
        stepTable: [],
				tableHeight: 'auto',
      }
    },
    created() {
      // this.initLayered();
			// this.loadDealStructure();
    },
    components:{
      BaseInfo,
      ItemBox,
      RepaymentMatrix
    },
    computed: {
      productDetail() {
        var productDetail = JSON.parse(JSON.stringify(this.$store.state.productInfo.productDetail));
        Object.keys(productDetail).forEach((key) => {
            if ((productDetail[key] == ''|| !productDetail[key])&&productDetail[key]!=0) {
              productDetail[key] = '-'
            }
        })
        return productDetail

      },
      TrustID() {
        return this.$store.state.productInfo.trustId;
      }
    },
    methods: {
      stateFormat(row, column, cellValue) {
        if(cellValue == null){
          return ''
        }else{
          cellValue = Number(cellValue).toFixed(2);
          cellValue += "";
          if (!cellValue.includes(".")) cellValue += ".";
          return cellValue
            .replace(/(\d)(?=(\d{3})+\.)/g, function($0, $1) {
              return $1 + ",";
            })
            .replace(/\.$/, "");
        }
      },
      stateFormatW(row, column, cellValue) {
        if(cellValue == null){
          return ''
        }else{
          cellValue = (Number(cellValue)/10000).toFixed(2);
          cellValue += "";
          if (!cellValue.includes(".")) cellValue += ".";
          return cellValue
            .replace(/(\d)(?=(\d{3})+\.)/g, function($0, $1) {
              return $1 + ",";
            })
            .replace(/\.$/, "");
        }
      },
    },
    watch: {

    }
  }

</script>

<style lang="scss">
  .productInformation {
    .base-info{
      display: flex;
      //font-size: 18px;
      justify-content: space-between;
      .left{
        margin-right: 20px;
      }
      .right{
        width: 250px;
				min-height: 200px;
      }
			.label-node{
				// text-align: center;
        width: 50%;
        float: left;
        padding-left: 3px;
        margin-top: 3px;
        &.pNode{
          width: 100%;
        }

				.label-item{
          display: inline-block;
          font-size: 12px;
					&.indicator{
						width: 15px;
						height: 10px;
						// vertical-align: bottom;
						margin-right: 6px;
						background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAGCAYAAAD37n+BAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAF8WlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS42LWMxNDAgNzkuMTYwNDUxLCAyMDE3LzA1LzA2LTAxOjA4OjIxICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyIgeG1sbnM6cGhvdG9zaG9wPSJodHRwOi8vbnMuYWRvYmUuY29tL3Bob3Rvc2hvcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RFdnQ9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZUV2ZW50IyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ0MgKE1hY2ludG9zaCkiIHhtcDpDcmVhdGVEYXRlPSIyMDE4LTA2LTEzVDEzOjQ4OjU3KzA4OjAwIiB4bXA6TW9kaWZ5RGF0ZT0iMjAxOC0wNi0xM1QxNDoxNDozNyswODowMCIgeG1wOk1ldGFkYXRhRGF0ZT0iMjAxOC0wNi0xM1QxNDoxNDozNyswODowMCIgZGM6Zm9ybWF0PSJpbWFnZS9wbmciIHBob3Rvc2hvcDpDb2xvck1vZGU9IjMiIHBob3Rvc2hvcDpJQ0NQcm9maWxlPSJzUkdCIElFQzYxOTY2LTIuMSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDoyZGIxNzU5NC05OWVmLTRjZTEtOWRkMi1iNTIwZmM0OTAyOTEiIHhtcE1NOkRvY3VtZW50SUQ9ImFkb2JlOmRvY2lkOnBob3Rvc2hvcDo2NDliNzgyMC0yOGUxLTIyNDctOWMxOS1jMTI3YTQwNmJlZDUiIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDowZjIwZWFmMC01NDExLTQ4NmQtYWYxYS1lZTI4NzM3ZjQ1ODYiPiA8eG1wTU06SGlzdG9yeT4gPHJkZjpTZXE+IDxyZGY6bGkgc3RFdnQ6YWN0aW9uPSJjcmVhdGVkIiBzdEV2dDppbnN0YW5jZUlEPSJ4bXAuaWlkOjBmMjBlYWYwLTU0MTEtNDg2ZC1hZjFhLWVlMjg3MzdmNDU4NiIgc3RFdnQ6d2hlbj0iMjAxOC0wNi0xM1QxMzo0ODo1NyswODowMCIgc3RFdnQ6c29mdHdhcmVBZ2VudD0iQWRvYmUgUGhvdG9zaG9wIENDIChNYWNpbnRvc2gpIi8+IDxyZGY6bGkgc3RFdnQ6YWN0aW9uPSJzYXZlZCIgc3RFdnQ6aW5zdGFuY2VJRD0ieG1wLmlpZDoyZGIxNzU5NC05OWVmLTRjZTEtOWRkMi1iNTIwZmM0OTAyOTEiIHN0RXZ0OndoZW49IjIwMTgtMDYtMTNUMTQ6MTQ6MzcrMDg6MDAiIHN0RXZ0OnNvZnR3YXJlQWdlbnQ9IkFkb2JlIFBob3Rvc2hvcCBDQyAoTWFjaW50b3NoKSIgc3RFdnQ6Y2hhbmdlZD0iLyIvPiA8L3JkZjpTZXE+IDwveG1wTU06SGlzdG9yeT4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz7e4M9IAAAAKElEQVQYlWP8//8/AxQ0oNFYxZkYSAQsxJoMAyTbwIjkB7wmM5DrBwBqHAuHsM3a0gAAAABJRU5ErkJggg==) repeat;
						background-color: #c6c6cc;
					}
          &.square{
            width: 15px;
            height: 10px;
            margin-right: 5px;
          }
				}
			}
    }
  }

</style>
