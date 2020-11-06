<template>
  <div class="productList">
    <div class="tableWrap transactionBox">
      <data-grid conName="PortfolioManagement" tableName="DV.view_DataStatistics" @sortChange="listSortChange"
        :order="listOrder" :filter="listFilter" :showFilter="true"
        ref="refDataGrid" :isFixed="true">
        <template slot="toolbar-right">
			<el-select v-model="type" @change="changeType()" style="width: 180px;margin-left: 10px;" size="mini">
			  	<el-option
			  	v-for="item in types"
			  	:key="item.TypeCode"
			  	:label="item.TypeName"
			  	:value="item.TypeCode">
			  	</el-option>
			</el-select>
        </template>
        <template slot="table-column">
			<el-table-column prop="CreateTime" label="统计时间" sortable="custom"  align="center"width="150" ></el-table-column>
			<el-table-column prop="DatePeriod" label="日期" sortable="custom"  align="center"width="180" ></el-table-column>
			<el-table-column label="市场产品总数"align="center">
				<el-table-column prop="Product"label="当前"width="60"align="center"></el-table-column>
				<el-table-column prop="ProductIncremental"label="新增"width="60"align="center"></el-table-column>
			</el-table-column>
			<el-table-column label="公募"align="center">
				<el-table-column prop="PublicOffering"label="当前"width="60"align="center"></el-table-column>
				<el-table-column prop="PublicOfferingIncremental"label="新增"width="60"align="center"></el-table-column>
			</el-table-column>
			<el-table-column label="私募"align="center">
				<el-table-column prop="PrivateEquity"label="当前"width="60"align="center"></el-table-column>
				<el-table-column prop="PrivateEquityIncremental"label="新增"width="60"align="center"></el-table-column>
			</el-table-column>
			<el-table-column label="现金流"align="center">
				<el-table-column prop="PaymentScheduleAggregation"label="当前"width="60"align="center"></el-table-column>
				<el-table-column prop="PaymentScheduleAggregationIncremental"label="新增"width="60"align="center"></el-table-column>
			</el-table-column>
			<el-table-column label="池统计"align="center">
				<el-table-column prop="PoolStatistics"label="当前"width="60"align="center"></el-table-column>
				<el-table-column prop="PoolStatisticsIncremental"label="新增"width="60"align="center"></el-table-column>
			</el-table-column>
			<el-table-column label="池分布"align="center">
				<el-table-column prop="PoolDistributions"label="当前"width="60"align="center"></el-table-column>
				<el-table-column prop="PoolDistributionsIncremental"label="新增"width="60"align="center"></el-table-column>
			</el-table-column>
			<el-table-column label="收益分配"align="center">
				<el-table-column prop="FactBondPayment"label="当前"width="60"align="center"></el-table-column>
				<el-table-column prop="FactBondPaymentIncremental"label="新增"width="60"align="center"></el-table-column>
			</el-table-column>
			<el-table-column label="资产池还款记录"align="center">
				<el-table-column prop="FactAssetPoolPayment"label="当前"width="60"align="center"></el-table-column>
				<el-table-column prop="FactAssetPoolPaymentIncremental"label="新增"width="60"align="center"></el-table-column>
			</el-table-column>
			<el-table-column label="税费"align="center">
				<el-table-column prop="FeeStructureReconciliation"label="当前"width="60"align="center"></el-table-column>
				<el-table-column prop="FeeStructureReconciliationIncremental"label="新增"width="60"align="center"></el-table-column>
			</el-table-column>
			<el-table-column label="发行说明书"align="center">
				<el-table-column prop="ProductReleaseInstructions"label="当前"width="60"align="center"></el-table-column>
				<el-table-column prop="ProductReleaseInstructionsIncremental"label="新增"width="60"align="center"></el-table-column>
			</el-table-column>
			<el-table-column label="评级报告"align="center">
				<el-table-column prop="ProductCreditRatingFiles"label="当前"width="60"align="center"></el-table-column>
				<el-table-column prop="ProductCreditRatingFilesIncremental"label="新增"width="60"align="center"></el-table-column>
			</el-table-column>
			<el-table-column label="受托报告"align="center">
				<el-table-column prop="TrusteeReport"label="当前"width="60"align="center"></el-table-column>
				<el-table-column prop="TrusteeReportIncremental"label="新增"width="60"align="center"></el-table-column>
			</el-table-column>
			<el-table-column label="收益分配"align="center">
				<el-table-column prop="IncomeDistributionReport"label="当前"width="60"align="center"></el-table-column>
				<el-table-column prop="IncomeDistributionReportIncremental"label="新增"width="60"align="center"></el-table-column>
			</el-table-column>
        </template>
      </data-grid>
    </div>
  </div>
</template>

<script>
	import DataGrid from '@/components/common/DataGrid.vue';
	export default {
		name: "DataStatistics",
		components: {
			DataGrid,
		},
		data() {
			return{
				listFilter:'',
				listOrder:"Createtime desc",
				dynamicTabHeight: "",
				type:'ByWeek',
				types:[{'TypeName':'按天','TypeCode':'ByDay'},{'TypeName':'按周','TypeCode':'ByWeek'},{'TypeName':'按月','TypeCode':'ByMonth'},]
			}
		},
		created() {
			this.listFilter="Type='"+this.type+"'";
		},
		computed: {
		},
		methods: {
			listSortChange(orderBy) {
				this.listOrder = orderBy ? orderBy : 'Createtime desc';
			},
			changeType(){
				this.listFilter="Type='"+this.type+"'";
			},
		},
	}
</script>

<style scoped lang="scss" type="text/scss">
 .productList {
    background: #fff;
    display: flex;
    flex: 1;
    min-height: 0;
    height: 100%;
    flex-direction: row;
    overflow: hidden;
    /deep/ .tool-bar{
      height: 38px;
      .tool-inner{
        height: 38px;
      }
      .tool-right{
        height: 38px;
      }
      .tool-left{
        height: 38px;
      }
    }
    .transactionBox {
      height: 100%;
      flex:1;
      width: 0;
    }
    .tableWrap {
      width: 75%;
      height: 100%;

      > .data-grid{
        display: flex;
        flex-direction: column;
        height: 100%;
      }
    }
  }
  </style>
