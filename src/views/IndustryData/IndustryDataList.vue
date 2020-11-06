<template>
  <div class="productList" style="height:100%;display:flex;">
    <div class="tableWrap transactionBox" ref="tableWrap">
      <data-grid :showFilter="true" id="export-table" conName="PortfolioManagement" proc-name="industry" :tableName="viewType"
        ref="refDataGrid" isFixed :order="listOrder" @sortChange="doListSortChange"
        :filter="listFilter" :needUserName="true"  @select="selectRow"  :multiSelection="true" :row-key="row_key" @listDataChanged="listDataChanged" :key="viewType">
        <template slot="toolbar-filter">
          <div class="view-type">所属行业：
            <el-select size="mini" v-model="industy" popper-class="max-width" style="width: 20%;" filterable @change="handleSearch">
              <el-option label="全部" value="0"></el-option>
              <el-option v-for="(option, index) in fields" :label="option.TrustName" :value="option.TrustName" :key="index"></el-option>
            </el-select>
            &#8195&#8195   数据日期：
            <el-select size="mini" v-model="dataDate" popper-class="max-width" style="width: 20%;" filterable @change="handleSearch">
              <el-option label="全部" value="0"></el-option>
              <el-option v-for="(option, index) in fields" :label="option.TrustName" :value="option.TrustName" :key="index"></el-option>
            </el-select>
          </div>
        </template>
        <template slot="toolbar-right">
          <el-button size="mini" @click="showAddEnterPrise" >新建行业数据</el-button>
        </template>
        <template slot="table-column">
          <el-table-column label="操作" width="100" sortable="custom" fixed>
            <template slot-scope="{row}">
              <el-button @click="EditEnterprise(row.TrustId)" size="mini"  type="text">编辑</el-button>
              <el-button @click="deleteEnterprise(row.TrustId)" class="red" size="mini" type="text">删除</el-button>
            </template>
          </el-table-column>
          <el-table-column prop="TrustNameShort" label="简称" sortable="custom" fixed width="160"
            :show-overflow-tooltip="true">
            <template slot-scope="{row}">
              <router-link :to="'Detail/' + row.TrustId" class="link" target="_blank"
                :title="row.TrustNameShort">
                {{row.TrustNameShort}}
              </router-link>
            </template>
          </el-table-column>
          <el-table-column prop="TrustName" label="名称" sortable="custom" min-width="200"
            :show-overflow-tooltip="true">
          </el-table-column>
          <el-table-column prop="TrustStartDate" label="发行日期" sortable="custom" width="120">
          </el-table-column>
          <el-table-column prop="ClosureDate" label="法定到期日" sortable="custom" width="120">
          </el-table-column>
          <el-table-column prop="IsTopUpAvaliable" label="是否循环结构" min-width="130">
          </el-table-column>
          <el-table-column prop="RevolvingPeriods" label="循环期期长(月)" min-width="130">
          </el-table-column>
          <el-table-column prop="IssueAmount" label="发行总金额" sortable="custom" min-width="130">
          </el-table-column>
          <el-table-column prop="CollectionMethodName" label="募集方式" width="80">
          </el-table-column>
          <el-table-column prop="TrustStatus" label="当前状态">
          </el-table-column>
        </template>
      </data-grid>
    </div>

    <div v-if="addIndustry">
      <el-dialog :title="title" width="880px" :visible.sync="addIndustry" destroy-on-close :lock-scroll="false">
        <create-trust :trustID="TrustId"></create-trust>
      </el-dialog>
    </div>
  </div>
</template>

<script>
  import dataGrid from '@/components/common/DataGrid.vue';
  import CreateTrust from "@/components/admin/CreateTrust";
	import { BasePath } from '@/utils/config.js';
  import {
    addClass,
    removeClass,
    hasClass
  } from '@/utils/dom.js'
  import {
    mapState,
    mapMutations
  } from 'vuex';
  export default {
    components: {
      dataGrid,
      CreateTrust,
      // enterpriseFilter
    },
    data() {
      return {
        listOrder: 'ItemId asc,TrustStartDate asc',
        listFilter: 'IsMarketProduct = 1',
        searchS: true,
        fields: [],
        removeShow: false,
        searchCon: false,
        bondCode:'',
        checkedData:[],
        tableDataList:[],
        // 为华泰客户环境
        IS_HUATAI: process.env.VUE_APP_CUSTOMER && process.env.VUE_APP_CUSTOMER === 'huatai',
        viewType: 'DV.view_Products',
        addIndustry: false,
        title:'',
        industy: '',
        dataDate:'',
        TrustId: 0,
      }
    },
    computed: {
      userName() {
        return this.$store.state.user.userName;
      },
      ConcernTrust() {
        return this.$store.state.productInfo.ConcernTrust
      }
    },
    methods: {
      ...mapMutations('productInfo', ['setProductDetail', 'setConcernTrust']),
      searchSC() {
        this.searchS = !this.searchS
      },
      EditEnterprise(TrustID){
        this.addIndustry = true;
        this.TrustId = TrustID;
        this.title = '编辑行业信息';
      },
      deleteEnterprise(TrustID){

      },
      showAddEnterPrise () {
        let self = this;
        self.addIndustry = true;
        self.TrustId = 0;
        self.title ='新建行业信息';
      },
      handleSearch() {
        let ary = [];
        if (this.bondCode.length >0){
          ary.push(` TrustCode Like N'%{0}%'`.Format(this.bondCode))
          this.conditionAr.FitterCode = 'TrustCode'
          this.conditionAr.Fitter = 'like'
          this.conditionAr.Value = this.bondCode
        }
        if (this.industy != '0' && this.industy.length >0){
          ary.push(` TrustName = N'{0}'`.Format(this.industy))
          this.conditionAr.FitterCode = 'TrustName'
          this.conditionAr.Fitter = '='
          this.conditionAr.Value = this.industy
        }
        if (this.organ != '0' && this.organ.length >0){
          ary.push(` TrustNameShort = N'{0}'`.Format(this.organ))
          this.conditionAr.FitterCode = 'TrustNameShort'
          this.conditionAr.Fitter = '='
          this.conditionAr.Value = this.organ
        }
        this.$emit('handleSearch', ary.join(' and '));
      },
      row_key(row) {
        //console.log(row)
        return this.viewType === 'DV.view_Products' ? row.TrustId : row.SNO;
      },
      doListSortChange(orderBy) {
        this.listOrder = orderBy ? orderBy : 'TrustId desc';
      },
      //选中产品
    selectRow(data){
      console.log(data)
      this.checkedData = data
    },

    listDataChanged(data) {
      this.tableDataList = data
    },
    },
    mounted() {
      this.$title();
      this.listFilter = "IsMarketProduct = 1"
    }
  }

</script>

<style lang="scss">
  .productList {
    background: #fff;
    display: flex;
    flex: 1;
    min-height: 0;
    height: 100%;
    flex-direction: row;
    overflow: hidden;

    /deep/ .tool-bar {
      height: 38px;

      .tool-inner {
        height: 38px;
      }

      .tool-right {
        height: 38px;
      }

      .tool-left {
        height: 38px;
      }
    }
    .red {
      color: red;

      &:hover {
        color: red;
        opacity: .8;
      }
    }
    .searchBox-fold{
      width: 0px;
      height: 50px;
      transition: all .3s ease;
      position: absolute;
      top: 50%;
      left: 0;
      z-index: 9;
      cursor: pointer;
      border-left: 13px solid #3345b9;
      border-bottom: 13px solid transparent;
      border-top: 13px solid transparent;

      i{
        height: 20px;
        position: absolute;
        top: 5px;
        left: -14px;
        color: #fff;
      }
    }

    .transactionBox {
      height: 100%;
      flex: 1;
      width: 0;
    }

    .searchBox {
      flex: 0 0 300px;
      width: 0;
      background-color: #f4f5fe;
      padding-left: 15px;
    }

    .icon-guanzhu1 {
      color: rgb(247, 186, 42);
      font-size: 13px;
      cursor: pointer;
    }

    .icon-guanzhu {
      color: #c0c4cc;
      font-size: 13px;
      cursor: pointer;
    }

    .searchBox {
      background-color: #f1f2fb;
      width: 25%;
      min-height: 0;
      padding-left: 15px;
    }

    .el-checkbox-button--small .el-checkbox-button__inner {
      border-radius: 2px !important;
      margin-right: 10px;
      background-color: #ddd;
    }

    .el-checkbox-button.is-checked .el-checkbox-button__inner {
      background-color: $--app-theme-color;
    }

    .tableWrap {
      position: relative;
      width: 75%;
      height: 100%;

      >.data-grid {
        display: flex;
        flex-direction: column;
        height: 100%;
        .el-table--mini th {
          padding: 1px 0;
        }
      }
    }
  }

  .view-type{
    line-height: 40px;
    padding: 0 14px;

    a{
      color: #4D4D4D;
      margin-right: 21px;
      &:hover{
        color: rgba(#4D4D4D, 0.8);
      }
      &.active{
        color: $--color-primary;
        font-weight: bold;
      }
    }
  }

  .clear-condition {
    font-size: 12px;
    text-align: center;
    color: $--color-primary;
    display: inline-block;
    width: 100%;
    cursor: pointer;
  }

  .chosen-fields {
    display: inline-block;
    margin-bottom: 10px;
    margin-right: 10px;
    background-color: #fff;
    border: 1px solid $--color-grey-light;
    color: $--color-primary;
    border-radius: 3px;
    font-size: 12px;
    position: relative;
    padding-right: 22px;
    overflow: hidden;

    &:hover {
      border-color: $--color-primary;

      .field-remove {
        background-color: $--color-primary;
        color: #fff;
      }
    }

    .field-titles {
      margin-right: 5px;
      display: inline-block;
      padding: 3px 0 3px 10px;

      .title {
        color: $--color-black;
      }
    }

    .field-remove {
      display: inline-block;
      height: 100%;
      cursor: pointer;
      padding: 0 5px;
      position: absolute;
      top: 0;
      right: -1px;
      line-height: 26px;
      width: 15px;
      background-color: #f1f1f1;

      i {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%)
      }
    }
  }

</style>
