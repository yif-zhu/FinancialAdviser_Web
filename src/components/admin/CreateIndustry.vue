<template>
    <el-main class="create-trust">
        <el-form>
            <el-form-item label="产品代码" :label-width="formLabelWidth">
                <el-input v-model="trustCode" :disabled="trustCodeDisabled" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="产品全称" :label-width="formLabelWidth">
                <el-input v-model="trustName" style="width:320px" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="市场产品" :label-width="formLabelWidth">
                <el-checkbox v-model="isMarketProduct">是</el-checkbox>
                <el-tag v-show="!isMarketProduct">非市场产品以下属性非必填</el-tag>
            </el-form-item>
            <div v-show="!isMarketProduct"></div>
            <el-form-item label="市场分类" :label-width="formLabelWidth">
                <el-select v-model="marketCategory" placeholder="请选择">
                    <el-option v-for="item in marketCategoryOptions" :key="item.ItemCode" :label="item.ItemTitle"
                        :value="item.ItemCode">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="监管机构" :label-width="formLabelWidth">
                <el-radio-group v-model="regulatoryOrg" size="mini">
                    <el-radio-button v-for="item in regulatoryOrgOptions" :key="item.ItemCode" :label="item.ItemCode">{{item.ItemTitle}}</el-radio-button>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="交易场所" :label-width="formLabelWidth">
                <el-select v-model="marketPlace" placeholder="请选择">
                    <el-option v-for="item in marketPlaceOptions" :key="item.ItemCode" :label="item.ItemTitle" :value="item.ItemCode">{{item.ItemTitle}}</el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="资产类型" :label-width="formLabelWidth">
                <el-select v-model="assetType" filterable placeholder="请选择,可关键字检索">
                    <el-option v-for="item in assetTypeOptions" :key="item.ItemCode" :label="item.ItemTitle" :value="item.ItemCode">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="细分分类" :label-width="formLabelWidth">
                <el-select v-model="basicAssetType" filterable placeholder="请选择,可关键字检索">
                    <el-option v-for="item in basicAssetTypeOptions" :key="item.ItemCode" :label="item.ItemTitle"
                        :value="item.ItemCode">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="募集方式" :label-width="formLabelWidth">
                <el-radio-group v-model="collectionMethod" size="mini">
                    <el-radio-button v-for="item in collectionMethodOptions" :key="item.ItemCode" :label="item.ItemCode">{{item.ItemTitle}}</el-radio-button>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="当前状态" :label-width="formLabelWidth">
                <el-select v-model="trustStatus">
                    <el-option v-for="item in TrustStatusCode" :label="item.ItemTitle" :value="item.ItemCode">
						{{item.ItemTitle}}
					</el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="清算日" v-if="trustStatus === 'Liquidated'" :label-width="formLabelWidth">
				<el-date-picker
				  v-model="liquidatedDate"
				  type="date"
				  value-format="yyyy-MM-dd"
				  placeholder="选择清算日">
				</el-date-picker>
            </el-form-item>
        </el-form>
        <div style="text-align: right;" class="assetDialogFooter">
            <el-button @click="cancelCreate" size="mini">取 消</el-button>
            <el-button type="primary" @click="createOrUpdateTrust" size="mini">保存</el-button>
        </div>
    </el-main>
</template>

<script>
    import csvc from "@/api/CommonService.js";
	import taskprocess from '@/api/TaskProcess';
	import {
		mapState
	} from 'vuex';
    export default {
        props: {
            onDialogClosed: {
                type: Function
            },
            trustID: {
                type: [Number, String]
            }
        },
        data() {
            return {
                formLabelWidth: '90px',
                trustCodeDisabled: false,

                marketPlaceOptions: [],
                assetTypeOptions: [],
                regulatoryOrgOptions: [],
                marketCategoryOptions: [],
                basicAssetTypeOptions: [],
                collectionMethodOptions: [],

                trustCode: null,
                trustName: null,
                isMarketProduct: true,
                marketCategory: null,
                regulatoryOrg: null,
                marketPlace: null,
                assetType: null,
                basicAssetType: null,
                collectionMethod: null,
				trustStatus: null,
				liquidatedDate: null,
				TrustStatusCode:[],
            };
        },
        mounted() {
			this.loadTrustBasicInfo();
			this.loadTrustStatusCode();
        },
		computed:{
			...mapState('user',['userName']),
		},
        methods: {
            loadTrustBasicInfo() {
                var self = this;
                var svc = new csvc("PortfolioManagement", "DV.GetBasicInfo", 1);
                if (this.trustID && this.trustID != 0) {
                    //this.trustCodeDisabled = true;
                    svc.AddParam({
                        Name: "TrustID",
                        Value: self.trustID,
                        DBType: "int"
                    });
                }
                svc.ExecTables().then(res => {
                    if (!res || res.length < 3) {
                        self.$message.error('加载产品信息出错');
                        return;
                    }
                    self.marketCategoryOptions = res[0];
                    self.regulatoryOrgOptions = res[1];
                    self.marketPlaceOptions = res[2];
                    self.assetTypeOptions = res[3];
                    self.basicAssetTypeOptions = res[4];
                    self.collectionMethodOptions = res[5];
                    if (res[6] && res[6].length > 0) {
                        let t = res[6][0];
                        self.trustCode = t.TrustCode;
                        self.trustName = t.TrustName;
                        self.isMarketProduct = t.IsMarketProduct == 1;
                        self.marketCategory = t.MarketCategory;
                        self.marketPlace = t.MarketPlace;
                        self.regulatoryOrg = t.RegulatoryOrg;
                        self.assetType = t.AssetType;
                        self.basicAssetType = t.BasicAssetType;
                        self.collectionMethod = t.CollectionMethod;
                        self.trustStatus = t.TrustStatus;
                        self.liquidatedDate = t.LiquidatedDate;
                    }
                });
            },
			loadTrustStatusCode(){
				var self = this;
				var svc = new csvc("PortfolioManagement", "DV.ItemData_GetByCategoryCode", 1);
				svc.AddParam({
				    Name: "CategoryCode",
				    Value: 'TrustStatus',
				    DBType: "string"
				});
				svc.ExecTable().then(res=>{
					self.TrustStatusCode=res;
				});
			},
            cancelCreate() {
                if (this.onDialogClosed) {
                    this.onDialogClosed(0);
                }
            },
            createOrUpdateTrust() {
                let self = this;
                if (!this.trustCode || !this.trustName) {
                    self.$message.error('产品名称和代码为必填项');
                    return;
                }
                if (this.isMarketProduct && (!this.marketCategory || !this.regulatoryOrg ||
                        !this.marketPlace || !this.assetType || !this.basicAssetType || !this.collectionMethod)) {
                    self.$message.error('市场产品，以下分类属性选填');
                    return;
                }

                let regCode = new RegExp("^[a-zA-Z]([a-zA-Z0-9])*(-[0-9]+)*$");
                if (!regCode.test(this.trustCode)) {
                    self.$message.error('产品代码不规范');
                    return;
                }
                let reg = new RegExp("[`~!@#$^&*()=_|{}':;',\\[\\].<>/?~！@#￥……&*（）——|{}【】‘；：”“'。，、？]");
                if (reg.test(this.trustName)) {
                    self.$message.error('产品名称不规范');
                    return;
                }

                var svc = new csvc("PortfolioManagement", "DV.TrustInfo_Update");
                svc.AddParam({
                    Name: "TrustID",
                    Value: self.trustID,
                    DBType: "int"
                });
                svc.AddParam({
                    Name: "TrustCode",
                    Value: self.trustCode,
                    DBType: "string"
                });
                svc.AddParam({
                    Name: "TrustName",
                    Value: self.trustName,
                    DBType: "string"
                });
                svc.AddParam({
                    Name: "IsMarketProduct",
                    Value: self.isMarketProduct,
                    DBType: "bool"
                });                
                svc.AddParam({
                    Name: "MarketCategory",
                    Value: self.marketCategory,
                    DBType: "string"
                });
                svc.AddParam({
                    Name: "RegulatoryOrg",
                    Value: self.regulatoryOrg,
                    DBType: "string"
                });                
                svc.AddParam({
                    Name: "MarketPlace",
                    Value: self.marketPlace,
                    DBType: "string"
                });
                svc.AddParam({
                    Name: "AssetType",
                    Value: self.assetType,
                    DBType: "string"
                });
                svc.AddParam({
                    Name: "BasicAssetType",
                    Value: self.basicAssetType,
                    DBType: "string"
                });
                svc.AddParam({
                    Name: "CollectionMethod",
                    Value: self.collectionMethod,
                    DBType: "string"
                }); 
                svc.AddParam({
                    Name: "TrustStatus",
                    Value: self.trustStatus,
                    DBType: "string"
                });
				if(self.trustStatus === 'Liquidated') {
					if(!self.liquidatedDate) {
						self.$message.error('请选择清算日期！');
						return;
					}
					svc.AddParam({
						Name: "LiquidatedDate",
						Value: self.liquidatedDate,
						DBType: "string"
					});
				}
				svc.AddParam({
					Name: "UserName",
					Value: self.userName,
					DBType: "string"
				});
                svc.ExecResult().then(res => {
					res = parseInt(res);
					var tp = new taskprocess(
						"Task",
						"FixedIncomeSuite_AddNewTrustFromDealViewer",
						"TaskProcess"
					);
					
                    if (isNaN(res)) {
                        self.$message.error('更新产品信息发生系统内部错误');
                        return;
                    }
                    if (res == 0) {
                        self.$message.error('系统中已存在相同名称或相同代码的产品');
                        return;
                    }
					if(res!=self.trustID){
						self.$message.success('产品添加成功');
						self.trustID=res;
						tp.AddVariableItem("TrustID", res, "String");
						tp.RunTask();
					}
					else{
						self.$message.success('产品信息更新成功');
						tp.AddVariableItem("TrustID", self.trustID, "String");
						tp.RunTask();
					}
                    if (self.onDialogClosed) {
                        self.onDialogClosed(res);
                    }
                });
            }
        }
    };

</script>

<style scoped="scoped">
    .create-trust .el-input {
        width: auto;
    }

    .assetDialogFooter {
        margin-top: 10px;
        margin-bottom: 0px;
    }

</style>
<style>
    .create-trust .el-select>.el-input {
        width: 200px;
    }

</style>
