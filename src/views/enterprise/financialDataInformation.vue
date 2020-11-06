
<template>
  <div class="detailPage">
    <ItemBox style="font-size:15px" title="财务数据">
      <template slot="right">
        <div class="view-type" style="position: absolute;right: 200px;top: 20px;">报表日期：
          <el-select  v-model="industy" popper-class="max-width" style="width: 50%;" filterable>
            <el-option v-for="(option, index) in fields" :label="option.TrustName" :value="option.TrustName" :key="index"></el-option>
          </el-select>
        </div>
        <el-button  size="mini" type="primary" @click="exportExcel" style="position: absolute;right: 120px;top: 20px;">报表模板下载</el-button>
        <el-button  size="mini" type="primary" @click="importExcel" style="position: absolute;right: 30px;top: 20px;">导入报表</el-button>
      </template>
      <el-tabs v-model="activeName" class="tabs" @tab-click="handleClick">
        <el-tab-pane label="资产负债表" name="first">
          <el-table :showFilter="false" :data="balanceInfo" style="width: 100%">
            <el-table-column prop="temp" label="目录"  min-width="130">
            </el-table-column>
            <el-table-column prop="detail" label="详情"  min-width="130">
            </el-table-column>
            <el-table-column prop="desc" label="说明"  min-width="130">
            </el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="利润表" name="second">
          <el-table :showFilter="false" :data="incomeInfo" style="width: 100%">
            <el-table-column prop="temp" label="目录"  min-width="130">
            </el-table-column>
            <el-table-column prop="detail" label="详情"  min-width="130">
            </el-table-column>
            <el-table-column prop="desc" label="说明"  min-width="130">
            </el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="现金流量表" name="third">
          <el-table :showFilter="false" :data="cashfolwInfo" style="width: 100%">
            <el-table-column prop="temp" label="目录"  min-width="130">
            </el-table-column>
            <el-table-column prop="detail" label="详情"  min-width="130">
            </el-table-column>
            <el-table-column prop="desc" label="说明"  min-width="130">
            </el-table-column>
          </el-table>
        </el-tab-pane>
      </el-tabs>
    </ItemBox>
  </div>
</template>

<script>
  import BaseInfo from '@/components/common/BaseInfo.vue';
  import ItemBox from '@/components/layout/ItemBox.vue';
  import utilsIndex from '@/utils/index.js'
  export default {
    name: "BaseInfoTable",
    // components: { MarketInfoTable},
    data() {
      return {
        activeName:'first',
        industy:'202003季度',
        fields:[{
          TrustName:'202001季度'
        },{
          TrustName:'202002季度'
        },{
          TrustName:'202003季度'
        },{
          TrustName:'202004季度'
        },],
        balanceInfo:[{
          temp:'1.货币资金',
          detail:'',
          desc:'',
        },{
          temp:'2.货币资金2',
          detail:'',
          desc:'',
        },{
          temp:'3.货币资金3',
          detail:'',
          desc:'',
        },{
          temp:'4.货币资金4',
          detail:'',
          desc:'',
        },{
          temp:'5.货币资金5',
          detail:'',
          desc:'',
        },{
          temp:'6.货币资金6',
          detail:'',
          desc:'',
        }],
        incomeInfo:[{
          temp:'1.货币资金',
          detail:'',
          desc:'',
        },{
          temp:'2.货币资金2',
          detail:'',
          desc:'',
        },{
          temp:'3.货币资金3',
          detail:'',
          desc:'',
        },{
          temp:'4.货币资金4',
          detail:'',
          desc:'',
        },{
          temp:'5.货币资金5',
          detail:'',
          desc:'',
        },{
          temp:'6.货币资金6',
          detail:'',
          desc:'',
        }],
        cashfolwInfo:[{
          temp:'1.货币资金',
          detail:'',
          desc:'',
        },{
          temp:'2.货币资金2',
          detail:'',
          desc:'',
        },{
          temp:'3.货币资金3',
          detail:'',
          desc:'',
        },{
          temp:'4.货币资金4',
          detail:'',
          desc:'',
        },{
          temp:'5.货币资金5',
          detail:'',
          desc:'',
        },{
          temp:'6.货币资金6',
          detail:'',
          desc:'',
        }],
      }
    },
    components:{
      BaseInfo,
      ItemBox
    },
    created() {
      this.loadFiledsAndInit();
    },
    computed: {
      TrustID() {
        return this.$store.state.productInfo.trustId;
      }
    },
    methods: {
      loadFiledsAndInit() {
        var svc = this.$http(this.conName, 'DV.AdvanceFilter_GetSettingByEnterPrise1', true);
        svc.AddParam({
          Name: 'TemplateName',
          Value: '',
          DBType: 'string'
        });
        svc.ExecTables().then((response) => {
          if (!response || response.length < 1) {
            return;
          }
          this.fields = JSON.parse(JSON.stringify(response[0]));
          //this.fields = JSON.parse(JSON.stringify(response[0]));
        });
      },
      exportExcel(){},
      importExcel(){},
      stateFormat(row, column, cellValue) {
        return utilsIndex.numUnit(cellValue)
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
      handleClick(tab, event) {
        if (this.activeName == 'first') {
          return
        }

      },
    }
  }

</script>

<style lang="scss">
.bondDetailBox{
  li{
    width: 33%;
    display: inline-block;
  }
  p{
    line-height: 30px;
    span:nth-child(1){
      color: $--color-grey;
      display: inline-block;
      width: 50%;
    }
  }
}
  .tabs{
    .el-tabs__nav-wrap::after{
      background-color: #fff;
    }
    .el-tabs__active-bar{
      height: 3px;
      background-color: transparent;
      &:before{
        position: absolute;
        content: "";
        left: 50%;
        right: 50%;
        width: 20px;
        margin-left: -10px;
        margin-right: -10px;
        height: 3px;
        background-color: $--color-primary;
      }
    }

    .el-tabs__item{
      color: $--color-grey;
      font-size: 13px;
      &:hover{
        color: $--color-black;
      }
      &.is-active{
        font-size: 16px;
        color: $--color-black;
      }
    }

    .el-tabs__content{
      overflow: visible;
    }
    .analysistabs{
      text-align:center;
      }
  }
</style>
