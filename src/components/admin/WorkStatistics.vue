<template>
  <div class="productList">
    <div class="tableWrap transactionBox">
      <data-grid conName="PortfolioManagement" tableName="DV.view_WorkStatistics" @sortChange="listSortChange"
        :order="listOrder" :filter="listFilter" :showFilter="true"
        ref="refDataGrid" :isFixed="true">
        <template slot="toolbar-right">
			<el-select v-model="username" placeholder="请选择姓名" @change="changeFilter()" style="width: 180px;" size="mini">
			  	<el-option
			  	v-for="item in users"
			  	:key="item.UserName"
			  	:label="item.DisplayName"
			  	:value="item.UserName">
			  	</el-option>
			</el-select>
			<el-select v-model="type" @change="changeFilter()" style="width: 180px;margin-left: 10px;" size="mini">
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
			<el-table-column prop="DisplayName" label="姓名" sortable="custom"  align="center"width="100" ></el-table-column>
			<el-table-column prop="Trust" label="产品" sortable="custom"  align="center"width="100" ></el-table-column>
			<el-table-column prop="PaymentScheduleAggregation" label="资产池现金流" sortable="custom"  align="center"width="120" ></el-table-column>
			<el-table-column prop="PoolStatistics" label="池统计" sortable="custom"  align="center"width="100" ></el-table-column>
			<el-table-column prop="PoolDistributions" label="池分布" sortable="custom"  align="center"width="100" ></el-table-column>
			<el-table-column prop="FactBondPayment" label="收益分配" sortable="custom"  align="center"width="100" ></el-table-column>
			<el-table-column prop="FactAssetPoolPayment" label="资产池还款记录" sortable="custom"  align="center"width="130" ></el-table-column>
			<el-table-column prop="FeeStructureReconciliation" label="税费" sortable="custom"  align="center"width="100" ></el-table-column>
			<el-table-column prop="ProductReleaseInstructions" label="发行说明书" sortable="custom"  align="center"width="110" ></el-table-column>
			<el-table-column prop="ProductCreditRatingFiles" label="评级报告" sortable="custom"  align="center"width="100" ></el-table-column>
			<el-table-column prop="TrusteeReport" label="受托报告" sortable="custom"  align="center"width="100" ></el-table-column>
			<el-table-column prop="IncomeDistributionReport" label="收益分配报告" sortable="custom"  align="center"width="120" ></el-table-column>
        </template>
      </data-grid>
    </div>
  </div>
</template>

<script>
	import DataGrid from '@/components/common/DataGrid.vue';
	export default {
		name: "WorkStatistics",
		components: {
			DataGrid,
		},
		data() {
			return{
				listFilter:'',
				listOrder:"Createtime desc",
				dynamicTabHeight: "",
				type:'ByWeek',
				types:[{'TypeName':'按天','TypeCode':'ByDay'},{'TypeName':'按周','TypeCode':'ByWeek'},{'TypeName':'按月','TypeCode':'ByMonth'}],
				username:null,
				users:[],
			}
		},
		created() {
			this.loadDataTeamMembers();
			this.listFilter="Type='"+this.type+"'";
		},
		computed: {
		},
		methods: {
			listSortChange(orderBy) {
			  this.listOrder = orderBy ? orderBy : 'Createtime desc';
			},
			changeFilter(){
				if(this.username){
					this.listFilter ="Type='"+this.type+"'and UserName='"+this.username+"'";
				}
				else{
					this.listFilter ="Type='"+this.type+"'";
				}
			},
			loadDataTeamMembers(){
				let self=this;
				let http = self.$http("PortfolioManagement", "DV.DataTeamMembers_Get");
				http.ExecTable().then(res => {
					self.users=res;
					console.log(res)
				});

			}
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
