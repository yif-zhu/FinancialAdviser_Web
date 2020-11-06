<template>
  <div class="productList">
    <div class="tableWrap transactionBox">
      <data-grid conName="PortfolioManagement" tableName="DV.view_ProductCheckList"
        :order="listOrder" :filter="listFilter"
        ref="refDataGrid" :isFixed="true">
        <template slot="toolbar-right">
        </template>
        <template slot="table-column">
			<el-table-column prop="" label="操作"width="100" >
				 <template slot-scope="{row,$index}">
					<el-button type="text" size="small"     @click.native="handleUpdate($index, row)"     v-if="showBtn[$index]">更新</el-button>
					<el-button type="text" size="small"     @click.native="handleCancel($index, row)"     v-if="showBtn[$index]">取消</el-button>
					<el-button type="text" size="small"     @click.native="handleEdit($index, row)"     v-if="!showBtn[$index]">编辑</el-button>
				</template>
			</el-table-column>
			<el-table-column prop="PaymentPeriodID" label="期数" sortable="custom"width="80" ></el-table-column>
			<el-table-column prop="PaymentPeriodDate" label="截止日期"width="100" ></el-table-column>
			<el-table-column prop="TrustBasicInfo" label="基础信息"width="80" >
				<template slot-scope="{row,$index}">
					<input class="edit-cell" v-if="showEdit[$index]"v-model="row.TrustBasicInfo">
					<span v-if="!showEdit[$index]">{{row.TrustBasicInfo}}</span>
				</template>
			</el-table-column>
			<el-table-column prop="TrustBond" label="分层"width="80" >
				<template slot-scope="{row,$index}">
					<input class="edit-cell" v-if="showEdit[$index]"v-model="row.TrustBond">
					<span v-if="!showEdit[$index]">{{row.TrustBond}}</span>
				</template>
			</el-table-column>
			<el-table-column prop="TrustDate" label="日期信息"width="80" >
				<template slot-scope="{row,$index}">
					<input class="edit-cell" v-if="showEdit[$index]"v-model="row.TrustDate">
					<span v-if="!showEdit[$index]">{{row.TrustDate}}</span>
				</template>
			</el-table-column>
			<el-table-column prop="PaymentSequence" label="偿付顺序"width="80" >
				<template slot-scope="{row,$index}">
					<input class="edit-cell" v-if="showEdit[$index]"v-model="row.PaymentSequence">
					<span v-if="!showEdit[$index]">{{row.PaymentSequence}}</span>
				</template>
			</el-table-column>
			<el-table-column prop="CashflowAggregation" label="现金流归集"width="80" >
				<template slot-scope="{row,$index}">
					<input class="edit-cell" v-if="showEdit[$index]"v-model="row.CashflowAggregation">
					<span v-if="!showEdit[$index]">{{row.CashflowAggregation}}</span>
				</template>
			</el-table-column>
			<el-table-column prop="FactBondPayment" label="收益分配"width="80" >
				<template slot-scope="{row,$index}">
					<input class="edit-cell" v-if="showEdit[$index]"v-model="row.FactBondPayment">
					<span v-if="!showEdit[$index]">{{row.FactBondPayment}}</span>
				</template>
			</el-table-column>
			<el-table-column prop="FeeStructure" label="费用"width="80" >
				<template slot-scope="{row,$index}">
					<input class="edit-cell" v-if="showEdit[$index]"v-model="row.FeeStructure">
					<span v-if="!showEdit[$index]">{{row.FeeStructure}}</span>
				</template>
			</el-table-column>
			<el-table-column prop="PoolStatistics" label="池统计"width="80" >
				<template slot-scope="{row,$index}">
					<input class="edit-cell" v-if="showEdit[$index]"v-model="row.PoolStatistics">
					<span v-if="!showEdit[$index]">{{row.PoolStatistics}}</span>
				</template>
			</el-table-column>
			<el-table-column prop="PoolDistribution" label="池分布"width="80" >
				<template slot-scope="{row,$index}">
					<input class="edit-cell" v-if="showEdit[$index]"v-model="row.PoolDistribution">
					<span v-if="!showEdit[$index]">{{row.PoolDistribution}}</span>
				</template>
			</el-table-column>
			<el-table-column prop="AssetPoolPayment" label="资产池还款记录"width="120" >
				<template slot-scope="{row,$index}">
					<input class="edit-cell" v-if="showEdit[$index]"v-model="row.AssetPoolPayment">
					<span v-if="!showEdit[$index]">{{row.AssetPoolPayment}}</span>
				</template>
			</el-table-column>
			<el-table-column prop="ServiceProvider" label="参与方"width="80" >
				<template slot-scope="{row,$index}">
					<input class="edit-cell" v-if="showEdit[$index]"v-model="row.ServiceProvider">
					<span v-if="!showEdit[$index]">{{row.ServiceProvider}}</span>
				</template>
			</el-table-column>
			<el-table-column prop="Modified" label="修改时间"width="140" ></el-table-column>
        </template>
      </data-grid>
    </div>
  </div>
</template>

<script>
	import DataGrid from '@/components/common/DataGrid.vue';
	import csvc from "@/api/CommonService.js";
	export default {
		props:{
			trustID: {
			    type: [Number, String]
			}
		},
		components: {
			DataGrid,
		},
		data() {
			return{
				listFilter:'',
				listOrder:"PaymentPeriodID",
				dynamicTabHeight: "",
				showEdit: [], //显示编辑框
				showBtn: [],
				showBtnOrdinary: true
			}
		},
		created() {
			this.listFilter="TrustID="+this.trustID;
		},
		computed: {
		},
		methods: {
			//点击编辑
			handleEdit(index, row) {
				this.$set(this.showEdit,index,true)
				this.$set(this.showBtn,index,true)
			},
			//取消编辑
			handleCancel(index, row) {
				this.$set(this.showEdit,index,false)
				this.$set(this.showBtn,index,false)
            },
			//点击更新
			handleUpdate(index, row) {
				let self=this;
				var svc = new csvc("PortfolioManagement", "DV.ProductCheckList_Update");
				svc.AddParam({
					Name: "TrustID",
					Value: self.trustID,
					DBType: "int"
				});
				svc.AddParam({
					Name: "PaymentPeriodID",
					Value: row.PaymentPeriodID,
					DBType: "int"
				});
				svc.AddParam({
					Name: "TrustBasicInfo",
					Value: row.TrustBasicInfo,
					DBType: "int"
				});
				svc.AddParam({
					Name: "TrustBond",
					Value: row.TrustBond,
					DBType: "int"
				});
				svc.AddParam({
					Name: "TrustDate",
					Value: row.TrustDate,
					DBType: "int"
				});
				svc.AddParam({
					Name: "PaymentSequence",
					Value: row.PaymentSequence,
					DBType: "int"
				});
				svc.AddParam({
					Name: "CashflowAggregation",
					Value: row.CashflowAggregation,
					DBType: "int"
				});
				svc.AddParam({
					Name: "FactBondPayment",
					Value: row.FactBondPayment,
					DBType: "int"
				});
				svc.AddParam({
					Name: "FeeStructure",
					Value: row.FeeStructure,
					DBType: "int"
				});
				svc.AddParam({
					Name: "PoolStatistics",
					Value: row.PoolStatistics,
					DBType: "int"
				});
				svc.AddParam({
					Name: "PoolDistribution",
					Value: row.PoolDistribution,
					DBType: "int"
				});
				svc.AddParam({
					Name: "AssetPoolPayment",
					Value: row.AssetPoolPayment,
					DBType: "int"
				});
				svc.AddParam({
					Name: "ServiceProvider",
					Value: row.ServiceProvider,
					DBType: "int"
				});
				svc.ExecResult().then(res=>{
					if(parseInt(res)>0){
						self.$message.success('更新成功');
					}
				})
			},
		},
	}
</script>

<style scoped lang="scss" type="text/css">
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
	.edit-cell{
		width: 100%;
	}
  }
  </style>
