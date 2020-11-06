<template>
  <div class="productList">
    <div class="searchBox" v-show="searchS">
      <adv-filter conName="PortfolioManagement" templateName="AdminProductListFilter"
        v-on:handleSearch="doProductListFilter" @handleSearchCon="handleSearchCon" ref="advFilterR">
      </adv-filter>
    </div>
    <div class="tableWrap transactionBox">
      <data-grid conName="PortfolioManagement" tableName="DV.view_AdminProducts"
        @sortChange="listSortChange" @selectionChange="listSelectionChange" :order="listOrder" :bondCode="bondCode"
        :filter="listFilter" :showFilter="true" ref="refDataGrid" :multiSelection="true" :isFixed="true">
        <template slot="toolbar-filter">
          <span class="openSearch" @click="searchSC" title="检索"><i class="iconfont"
              :class="searchS?'icon-shouqi':'icon-zhankai1'"></i>{{searchS?'关闭检索':'展开检索'}}</span>
        </template>
        <template slot="toolbar-right">
          <el-button type="primary" size="mini" :disabled="listData.length!=1"
            @click="supplementTrust()" plain>
            <i class="el-icon-tickets"></i>补充完整结构
          </el-button>
          <el-dropdown @command="handleCommand" style="margin-left: 10px;">
            <el-button type="primary" size="mini" :disabled="listData.length!=1" plain>
              <i class="el-icon-upload2"></i>数据上传
            </el-button>
            <el-dropdown-menu slot="dropdown" style="width: 130px; margin-top: 5px;"
              :visibleArrow="false">
              <el-dropdown-item command='excelUpload'>Excel模型</el-dropdown-item>
              <el-dropdown-item command='trusteeUpload'>收益分配</el-dropdown-item>
              <el-dropdown-item command='TaxTable'>税费表</el-dropdown-item>
              <el-dropdown-item command='PoolStatistics'>资产池统计</el-dropdown-item>
              <el-dropdown-item command='PoolDistributions'>资产池分布</el-dropdown-item>
              <el-dropdown-item command='PoolCashFlow'>资产池现金流</el-dropdown-item>
              <el-dropdown-item command='assetPoolPayment'>资产池还款记录</el-dropdown-item>
              <el-dropdown-item command='TrustServiceProvider'>相关参与方</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <el-dropdown @command="handleCommandExport" style="margin: 0px 10px;">
            <el-button type="primary" size="mini" :disabled="listData.length!=1" plain>
              <i class="el-icon-download"></i>数据下载
            </el-button>
            <el-dropdown-menu slot="dropdown" style="width: 160px; margin-top: 5px;"
              :visibleArrow="false">
              <el-dropdown-item command='0'>债券收益分配(模板0)</el-dropdown-item>
              <el-dropdown-item command='1'>债券收益分配(模板1)</el-dropdown-item>
              <el-dropdown-item command='2'>资产池还款记录</el-dropdown-item>
              <el-dropdown-item command='3'>税费表</el-dropdown-item>
              <!-- <el-dropdown-item command='4'>结构xml</el-dropdown-item> -->
              <el-dropdown-item command='5'>产品导出</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <el-button type="primary" size="mini" @click="createTrust(0)" plain>
            <i class="iconfont icon-xinjian2"></i>新建
          </el-button>
          <el-button type="primary" :disabled="listData.length!=1" size="mini"
            @click="createTrust(1)" plain>
            <i class="iconfont icon-bianji"></i>编辑
          </el-button>
          <el-button :disabled="listData.length<=0" type="danger" size="mini"
            @click="removeDealStructures" plain>
            <i class="iconfont icon-lajitong"></i>删除
          </el-button>
          <el-button :disabled="listData.length<=0" type="primary" plain size="mini"
            @click="checklist"><i class="el-icon-tickets"></i>推送设置
          </el-button>
          <el-button type="primary" plain size="mini" v-popover:searchConA><i
              class="iconfont icon-weibiaoti--1"></i>管理筛选条件
          </el-button>
        </template>
        <template slot="table-column">
          <el-table-column type="selection" width="50" align="center"></el-table-column>
          <el-table-column prop="TrustId" sortable="custom" width="70" label="标识"></el-table-column>
          <el-table-column min-width="160" label="产品简称" :show-overflow-tooltip="true">
            <template slot-scope="scope">
              <router-link :to="'Detail/' + scope.row.TrustId" class="link"
                :title="scope.row.TrustNameShort">
                {{scope.row.TrustNameShort}}
              </router-link>
            </template>
          </el-table-column>
          <el-table-column prop="TrustName" label="产品名称" sortable="custom" min-width="200"
            :show-overflow-tooltip="true">
          </el-table-column>
          <el-table-column prop="TrustCode" label="产品代码" sortable="custom" min-width="150"
            :show-overflow-tooltip="true">
          </el-table-column>
          <el-table-column prop="IsExcelModelUploaded" sortable="custom" align="center"
            min-width="100" label="Excel模型">
            <template slot-scope="scope">
              <span><i class="iconfont"
                  :class="scope.row.IsExcelModelUploaded?'icon-chenggong':'icon-shibai'"></i></span>
            </template>
          </el-table-column>
          <el-table-column prop="IsTrusteeUploadUploaded" min-width="100" sortable="custom"
            align="center" label="收益分配">
            <template slot-scope="scope">
              <span><i class="iconfont"
                  :class="scope.row.IsTrusteeUploadUploaded?'icon-chenggong':'icon-shibai'"></i></span>
            </template>
          </el-table-column>
          <el-table-column prop="IsTaxFeeUploaded" min-width="100" sortable="custom" align="center"
            label="税费">
            <template slot-scope="scope">
              <span><i class="iconfont"
                  :class="scope.row.IsTaxFeeUploaded?'icon-chenggong':'icon-shibai'"></i></span>
            </template>
          </el-table-column>
          <el-table-column prop="IsPoolStatisticsUploaded" min-width="110" sortable="custom"
            align="center" label="资产池统计">
            <template slot-scope="scope">
              <span><i class="iconfont"
                  :class="scope.row.IsPoolStatisticsUploaded?'icon-chenggong':'icon-shibai'"></i></span>
            </template>
          </el-table-column>
          <el-table-column prop="IsPoolDistributionsUploaded" min-width="110" sortable="custom"
            align="center" label="资产池分布">
            <template slot-scope="scope">
              <span><i class="iconfont"
                  :class="scope.row.IsPoolDistributionsUploaded?'icon-chenggong':'icon-shibai'"></i></span>
            </template>
          </el-table-column>
          <el-table-column prop="IsPoolCashFlowUploaded" min-width="120" sortable="custom"
            align="center" label="资产池现金流">
            <template slot-scope="scope">
              <span><i class="iconfont"
                  :class="scope.row.IsPoolCashFlowUploaded?'icon-chenggong':'icon-shibai'"></i></span>
            </template>
          </el-table-column>
          <el-table-column prop="IsPoolPaymentUploaded" min-width="130" sortable="custom"
            align="center" label="资产池还款记录">
            <template slot-scope="scope">
              <span><i class="iconfont"
                  :class="scope.row.IsPoolPaymentUploaded?'icon-chenggong':'icon-shibai'"></i></span>
            </template>
          </el-table-column>
          <el-table-column prop="IsProductReleaseInstructionsUploaded" min-width="110"
            sortable="custom" align="center" label="发行说明书">
            <template slot-scope="scope">
              <span><i class="iconfont"
                  :class="scope.row.IsProductReleaseInstructionsUploaded?'icon-chenggong':'icon-shibai'"></i></span>
            </template>
          </el-table-column>
          <el-table-column prop="IsProductCreditRatingFilesUploaded" min-width="100"
            sortable="custom" align="center" label="评级报告">
            <template slot-scope="scope">
              <span><i class="iconfont"
                  :class="scope.row.IsProductCreditRatingFilesUploaded?'icon-chenggong':'icon-shibai'"></i></span>
            </template>
          </el-table-column>
          <el-table-column prop="IsTrusteeReportUploaded" min-width="130" sortable="custom"
            align="center" label="受托机构报告">
            <template slot-scope="scope">
              <span><i class="iconfont"
                  :class="scope.row.IsTrusteeReportUploaded?'icon-chenggong':'icon-shibai'"></i></span>
            </template>
          </el-table-column>
          <el-table-column prop="IsExerciseNoticeUploaded" min-width="160" sortable="custom"
            align="center" label="兑付兑息及行权公告">
            <template slot-scope="scope">
              <span><i class="iconfont"
                  :class="scope.row.IsExerciseNoticeUploaded?'icon-chenggong':'icon-shibai'"></i></span>
            </template>
          </el-table-column>
          <el-table-column prop="IsFinancialReportsUploaded" min-width="100" sortable="custom"
            align="center" label="财务报告">
            <template slot-scope="scope">
              <span><i class="iconfont"
                  :class="scope.row.IsFinancialReportsUploaded?'icon-chenggong':'icon-shibai'"></i></span>
            </template>
          </el-table-column>
          <el-table-column prop="IsIncomeDistributionReportUploaded" min-width="130"
            sortable="custom" align="center" label="收益分配报告">
            <template slot-scope="scope">
              <span><i class="iconfont"
                  :class="scope.row.IsIncomeDistributionReportUploaded?'icon-chenggong':'icon-shibai'"></i></span>
            </template>
          </el-table-column>
          <el-table-column prop="IsLoanServicerReportUploaded" min-width="140" sortable="custom"
            align="center" label="贷款服务机构报告">
            <template slot-scope="scope">
              <span><i class="iconfont"
                  :class="scope.row.IsLoanServicerReportUploaded?'icon-chenggong':'icon-shibai'"></i></span>
            </template>
          </el-table-column>
          <el-table-column prop="IsAnnouncementOfResultsUploaded" min-width="130" sortable="custom"
            align="center" label="发行结果公告">
            <template slot-scope="scope">
              <span><i class="iconfont"
                  :class="scope.row.IsAnnouncementOfResultsUploaded?'icon-chenggong':'icon-shibai'"></i></span>
            </template>
          </el-table-column>
          <el-table-column prop="IsDealStructurePictureUploaded" min-width="120" sortable="custom"
            align="center" label="交易结构图">
            <template slot-scope="scope">
              <span><i class="iconfont"
                  :class="scope.row.IsDealStructurePictureUploaded?'icon-chenggong':'icon-shibai'"></i></span>
            </template>
          </el-table-column>
          <el-table-column prop="LastModifiedPerson" min-width="120" align="center"
            :show-overflow-tooltip="true" label="最近一次修改人">
          </el-table-column>
          <el-table-column prop="LastModifiedTime" min-width="150" sortable="custom"
            :show-overflow-tooltip="true" label="最近一次修改时间">
          </el-table-column>
        </template>
      </data-grid>
    </div>
    <base-dialog draggable :close-on-click-modal="false" title="上传交易结构模型"
      :visible.sync="excelUploadVisible" width="500px">
      <div class="dialogfileUploadBox">
        <span>文件上传：</span>
        <input type="file" id="excelUpload" @change="dialogFileInput($event)"
          class="fileUploadInput"
          accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel" />
        <el-input class="el_fileUploadInput" v-model="dialogUploadFileName">
          <el-button class="el_fileUploadBtn" slot="append"
            @click="dialogUploadCilck('excelUpload')">选择文件
          </el-button>
        </el-input>
      </div>
      <span slot="footer" class="dialog-footer assetDialogFooter">
        <el-button @click="excelUploadVisible = false" size="mini">取 消</el-button>
        <el-button type="primary" @click="excelUploadFile()" size="mini">确定</el-button>
      </span>
    </base-dialog>
    <base-dialog draggable :close-on-click-modal="false" title="上传受托报告"
      :visible.sync="trusteeUploadVisible" width="500px">
      <div class="dialogfileUploadBox">
        <span>文件上传：</span>
        <input type="file" id="trusteeUpload" multiple="multiple" @change="dialogFileInput($event)"
          class="fileUploadInput"
          accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel,application/pdf" />
        <el-input class="el_fileUploadInput" v-model="dialogUploadFileName">
          <el-button class="el_fileUploadBtn" slot="append"
            @click="dialogUploadCilck('trusteeUpload')">选择文件
          </el-button>
        </el-input>
      </div>
      <span slot="footer" class="dialog-footer assetDialogFooter">
        <el-button @click="trusteeUploadVisible = false" size="mini">取 消</el-button>
        <el-button type="primary" @click="trusteeUploadFile()" size="mini">确定</el-button>
      </span>
    </base-dialog>

    <base-dialog draggable :close-on-click-modal="false" :title="dialogTitle"
      :visible.sync="dlgAssetPoolPayment" width="500px">
      <div class="dialogfileUploadBox" v-if="dlgAssetPoolPayment">
        <span>文件上传：</span>
        <input type="file" id="assetPoolPayment" @change="dialogFileInput($event)"
          class="fileUploadInput"
          accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel" />
        <el-input class="el_fileUploadInput" v-model="dialogUploadFileName">
          <el-button class="el_fileUploadBtn" slot="append"
            @click="dialogUploadCilck('assetPoolPayment')">选择文件
          </el-button>
        </el-input>
      </div>
      <span slot="footer" class="dialog-footer assetDialogFooter">
        <el-button @click="dlgAssetPoolPayment = false" size="mini">取 消</el-button>
        <el-button type="primary" @click="assetPoolPaymentUpload()" size="mini">确定</el-button>
      </span>
    </base-dialog>

    <base-dialog title="基础信息" width="500px" draggable :close-on-click-modal="false"
      :visible.sync="dlgTrustInfo.Visiable">
      <createTrust v-if="dlgTrustInfo.Visiable" :trustID="dlgTrustInfo.TrustId"
        :onDialogClosed="trustUpdated">
      </createTrust>
    </base-dialog>

    <base-dialog title="导入统计" width="960px" draggable :close-on-click-modal="false"
      :visible.sync="statisticsDialogVisible">
      <hchart :options="statisticOptions" style="height: 500px;"></hchart>
    </base-dialog>

    <base-dialog title="推送设置" width="1000px" draggable :close-on-click-modal="false"
      :visible.sync="dlgCheckList.Visiable">
      <checkList v-if="dlgCheckList.Visiable" :trustID="dlgCheckList.TrustId"
        :onDialogClosed="closeCheckList">
      </checkList>
    </base-dialog>
    <!-- 管理筛选条件 -->
    <el-popover placement="bottom-start" title="" width="280" ref="searchConA" :visibleArrow="false"
      v-model="searchConA" trigger="click">
      <div>
        <div v-if="fields.length>0">
          <div v-for="field in fields" :key="field.Title" v-show="field.ChosenTitles.length>0"
            class="chosen-fields">
            <span class="field-titles"><span
                class="title">{{field.Title}}：</span>{{field.UIFormat?field.ChosenTitles.join(" - "):field.ChosenTitles.join(", ")}}</span>
            <span class="field-remove" v-if="!field.Must" @click="removeFieldChosen(field)">
              <i class="el-icon-close"></i>
            </span>
          </div>
          <div  v-show="bondCode !==''"
            class="chosen-fields">
            <span class="field-titles"><span
                class="title">证券代码：</span>{{bondCode}}</span>
            <span class="field-remove" @click="removeColdChosen">
              <i class="el-icon-close"></i>
            </span>
          </div>
          <span @click="removeAll()" class="colorPrimary clear-condition"
            v-show="removeShow">清除筛选</span>
        </div>
        <p v-show="!removeShow" style="font-size:12px;color:#a5a5a5;text-align:center;">暂无数据</p>
      </div>
    </el-popover>
  </div>
</template>

<script>
  import csvc from "@/api/CommonService.js";
  import fsvc from '@/api/FileService';
  import taskprocess from '@/api/TaskProcess';
  import createTrust from "./CreateTrust.vue";
  import checkList from "./CheckList.vue";
  import pager from "@/components/common/Pager.vue";
  import DataGrid from '@/components/common/DataGrid.vue';
  import hchart from "@/components/common/Highcharts";
  import Highcharts from "highcharts";
  import advFilter from '@/components/common/AdvanceFilter.vue'
  import dynamicTab from '@/mixins/dynamicTab.js';
  import {
    mapMutations,
    mapState
  } from 'vuex';
	import { FileBaseFolder } from '@/utils/config';
	import transformSeparator from '@/utils/transformSeparator';
  export default {
    components: {
      pager,
      DataGrid,
      createTrust,
      checkList,
      hchart,
      advFilter
    },
    props: {
      openInParentTab: {
        type: Function
      },
      projectsTransactionHight: {}
    },
    data() {
      return {
        dialogTitle: '',
        listFilter: 'IsMarketProduct = 1',
        listOrder: "TrustId desc",
        listData: [],
        dynamicTabHeight: "",
        excelUploadVisible: false,
        dlgTrustInfo: {
          Visiable: false,
          TrustId: 0
        },
        dlgCheckList: {
          Visiable: false,
          TrustId: 0
        },
        statisticsDialogVisible: false,
        dialogUploadFileName: null,
        dropdownData: [],
        statisticOptions: null,
        instructionstUploadVisible: false,
        RatingUploadVisible: false,
        trusteeUploadVisible: false,
        dlgAssetPoolPayment: false,
        uploadType: '',
        ShowDetailDialog: false,
        searchS: true,
        fields: [],
        removeShow: false,
        searchConA: false,
        bondCode:''
      };
    },
    mixins: [dynamicTab],
    created() {
      this.dynamicTabInterFace()
    },
    mounted() {
      var self = this;
      self.getDropdown()
      //self.LoadStatistic()
      if (this.projectsTransactionHight) {
        $(".transactionStyle").removeClass("tool-elRightBtn");
        $(".transactionBox").addClass("transactionBoxStyle");
        window.onresize = function () {
          self.dynamicTabHeight = document.documentElement.clientHeight - 280 + "px";
        };
      } else {
        window.onresize = function () {
          self.dynamicTabHeight = document.documentElement.clientHeight - 230 + "px";
        };
      }
    },
    computed: {
      ...mapState('user', ['userName']),
    },
    methods: {
      ...mapMutations('dynamicTabs', ['addTab']),
      handleSearchCon(fields, removeShow) {
        this.fields = fields
        this.removeShow = removeShow
        console.log(fields)
      },
      removeColdChosen() {
        this.$refs.advFilterR.bondCodeClear()
      },
      removeFieldChosen(fields) {
        this.$refs.advFilterR.removeFieldChosen(fields)
      },
      removeAll() {
        this.searchConA = false
        this.$refs.advFilterR.removeAll()
        this.removeColdChosen()
      },
      dynamicTabInterFace() {
        this.newTab({
          id: 'ProductList',
          name: 'ProductList',
          title: '产品管理',
          closable: false, // 不允许关闭
          isCache: true // 缓存当前页面
        })
        this.newTab({
          id: 'DataStatistics', // 动态标签的ID，用来判断唯一性，避免重复创建
          name: 'DataStatistics', // 动态标签需要绑定到的路由，与路由配置中的name值要一致
          title: '数据统计',
          autoOpen: false, // 不需要自动打开
          closable: false, // 不允许关闭
          isCache: true // 缓存当前页面
        })
//         this.newTab({
//           id: 'WorkStatistics',
//           name: 'WorkStatistics',
//           title: '工作统计',
//           autoOpen: false,
//           closable: false,
//           isCache: true
//         })
      },
      doProductListFilter(condition,bondCode) {
          this.listFilter = condition;
          this.bondCode = bondCode;
      },
      searchSC() {
        this.searchS = !this.searchS
      },
      handleCommand(dialogName) {
        this.uploadType = dialogName;
        if (dialogName == 'excelUpload') {
          this.excelUploadVisible = true
          this.clearUploadedText()
        } else if (dialogName == 'distributionUpload') {
          $("#InstructionsUpload").val('');
          this.dialogUploadFileName = null;
          this.instructionstUploadVisible = true;
        } else if (dialogName == 'ratingReportUpload') {
          $("#RatingUpload").val('');
          this.dialogUploadFileName = null;
          this.RatingUploadVisible = true;
        } else if (dialogName == 'trusteeUpload') {
          $("#trusteeUpload").val('');
          this.dialogUploadFileName = null;
          this.trusteeUploadVisible = true;
        } else if (dialogName == 'assetPoolPayment' || dialogName == 'TaxTable') {
          this.dialogUploadFileName = null;
          this.dlgAssetPoolPayment = true;
          if (dialogName == 'assetPoolPayment') {
            this.dialogTitle = '上传资产池还款记录'
          } else {
            this.dialogTitle = '上传税费表'
          }
        } else {
          switch (dialogName) {
            case 'PoolStatistics':
              this.dialogTitle = '上传资产池统计';
              break;
            case 'PoolDistributions':
              this.dialogTitle = '上传资产池分布';
              break;
            case 'PoolCashFlow':
              this.dialogTitle = '上传资产池现金流';
              break;
            case 'TrustServiceProvider':
              this.dialogTitle = '上传相关参与方';
            default:
              break;
          }
          this.dialogUploadFileName = null;
          this.dlgAssetPoolPayment = true;
        }
      },
      handleCommandExport(type) {
        switch (type) {
          case '0':
            this.exportTrustBondPayment('1');
            break;
          case '1':
            this.exportTrustBondPayment('2');
            break;
          case '2':
            this.exportAssetPoolPayment();
            break;
          case '3':
            this.exportTaxTable();
            break;
          case '5':
            this.exportTrustPro();
            break;
          case '4':
            this.exportTrustXML();
          default:
            break;
        }
      },
      reInit() {
        this.$refs.advfStructureList.LoadFiledsAndInit();
        this.$refs.pagerViewTrust.getListWithPager();
      },
      listDataLoaded(data) {
        this.listData = data;
      },
      listSortChange(sorter) {
        if (!sorter.prop || !sorter.order) {
          return;
        }

        let order = sorter.order === "descending" ? " desc" : " asc";
        let targetOrder = sorter.prop + order;
        if (targetOrder === this.listOrder) {
          return;
        }

        this.listOrder = targetOrder;
      },
      listSelectionChange: function (data) {
        this.listData = data;
      },
    //   advFilterButtonClick(conditions) {
    //     this.listFilter = conditions;
    //   },
      openInTab(id, title) {
        this.addTab({
          name: '' + id,
          title,
          id,
          component: 'structureCustomize'

        });
      },
      advsFilterPositionClick() {
        $(".advsFilterPosition").slideToggle(180);
      },
      editStructure() {
        if (this.listData.length > 0) {
          this.openInTab(
            this.listData[0].TrustId,
            this.listData[0].TrustName
          );
        }
      },
      downloadReport(scope, category) {
        // console.log(scope);
        fsvc.DownLoadFileByPath(scope)
      },
      //上传数据
      exportTrustBondPayment(type) {
        let self = this;
        var svc = new fsvc.Export("PortfolioManagement", "DV.FactBondPayment_Export");
        svc.AddParam({
          Name: "TrustID",
          Value: self.listData[0].TrustId,
          DBType: "int"
        });
        svc.AddParam({
          Name: "ResultType",
          Value: type,
          DBType: "int"
        });
        //语言
        svc.ExportExcelFile("债券收益分配");
      },
      exportAssetPoolPayment() {
        let self = this;

        var tp = new taskprocess("Task", "DV_ExportPaymentScheduleAggregation", "TaskProcess");
        tp.AddVariableItem("TrustID", self.listData[0].TrustId, "String");
        tp.ShowIndicator(function () {
          var fName = '资产池还款记录_' + self.listData[0].TrustId + '.xlsx';
          var filePath = transformSeparator(FileBaseFolder + 'DealViewer\\Output\\' + fName);
          fsvc.DownLoadFileByPath(filePath);
        });
      },
      exportTaxTable() {
        let self = this;

        var tp = new taskprocess("Task", "DV_ExportFeeStructureReconciliation", "TaskProcess");
        tp.AddVariableItem("TrustID", self.listData[0].TrustId, "String");
        tp.ShowIndicator(function () {
          var fName = '税费表_' + self.listData[0].TrustId + '.xlsx';
          var filePath = transformSeparator(FileBaseFolder + 'DealViewer\\Output\\' + fName);
          fsvc.DownLoadFileByPath(filePath);

        });

        // 				    var svc = new fsvc.Export("PortfolioManagement", "DV.FeeStructureReconciliation_Export");
        // 				    svc.AddParam({
        // 				        Name: "TrustID",
        // 				        Value: self.listData[0].TrustId,
        // 				        DBType: "int"
        // 				    });
        // 				    //语言
        // 				    svc.ExportExcelFile("税费表");
      },
      //导出XML 给QuickDeal用
      exportTrustXML() {
        let self = this;
        var tp = new taskprocess(
          "Task",
          "FixedIncomeSuite_TrustInfoExport",
          "TaskProcess"
        );
        tp.AddVariableItem("TrustId", self.listData[0].TrustId, "int");
        tp.ShowIndicator(function () {
          let filePath =
            "../../TrustManagementService/TrustImportAndExportModel/AnalysisFramework_TrustInfoImportAndExportModel_" +
            self.listData[0].TrustId + ".xml";
          let filename = 'AnalysisFramework_TrustInfoImportAndExportModel_' + self.listData[0]
            .TrustId + '.xml'
          let link = document.createElement('a');
          link.download = filename;
          link.style.display = 'none';
          link.href = filePath;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        });
      },
      exportTrustPro() {
        var self = this
        let trustId = self.listData[0].TrustId
        console.log(trustId)
        let callApi = this.$http('TaskProcess', 'Task.initTaskStatusByTrustId', 1);
        callApi.AddParam({
          Name: 'trustId',
          Value: trustId,
          DBType: 'int'
        });
        callApi.ExecResult().then(res => {});
        let tpi = new taskprocess("Task", 'FixedIncomeSuite_TrustInfoExport', "TaskProcess")
        tpi.AddVariableItem('TrustId', trustId, 'String');
        tpi.ShowIndicator(() => {
          let svc = this.$http('TaskProcess', 'Task.checkTaskStatusByTrustId', 1);
          svc.AddParam({
            Name: 'trustId',
            Value: trustId,
            DBType: 'int'
          });
          svc.ExecTable().then(res => {
            if (res.length == 0) {
              return
            }
            if (res[0].Status == "1") {
              let filePath =
                "/TrustManagementService/TrustImportAndExportModel/QuickDeal_TrustInfoImportAndExportModel_" +
                trustId + ".xml";
              let filename = 'QuickDeal_TrustInfoImportAndExportModel_' + trustId + '.xml'
              let link = document.createElement('a');
              link.download = filename;
              link.style.display = 'none';
              link.href = filePath;
              document.body.appendChild(link);
              link.click();
              document.body.removeChild(link);
            }
          })
        })
      },
      clearUploadedText() {
        this.dialogUploadFileName = null;
      },
      excelUploadFile: function () {
        var self = this;
        console.log(self.userName)
        var postData = $("#excelUpload")[0].files[0];
        if (!postData) {
          self.$message({
            message: '请选文件',
            type: 'warning'
          });
          return;
        }
        var postDataName = postData.name;
        var timestamp = new Date().getTime();
        let trustId = self.listData[0].TrustId;
        fsvc.Upload(postData, timestamp + postDataName, "DealViewer\\ExcelModelData").then(
          function (
            fpath) {
            self.excelUploadVisible = false; // 关闭上传弹窗

            self.filePath = transformSeparator(FileBaseFolder + fpath.UploadResult);
            self.excelUpload = false;
            var tp = new taskprocess(
              "Task",
              "DV_UploadProductInfo",
              "TaskProcess"
            );
            tp.AddVariableItem("TrustID", trustId, "String");
            tp.AddVariableItem("UserName", self.userName, "String");
            tp.AddVariableItem("DataType", 'ExcelModel', "String");
            tp.AddVariableItem("SourceFilePath", FileBaseFolder + fpath
              .UploadResult, "String");
            tp.ShowIndicator(function () {
              self.$refs.refDataGrid.refresh();
            });
          });
      },
      trusteeUploadFile: function () {
        var self = this;
        var postData = $("#trusteeUpload")[0].files[0];
        if (!postData) {
          self.$message({
            message: '请选文件',
            type: 'warning'
          });
          return;
        }
        var postDataName = postData.name;
        var timestamp = new Date().getTime();
        let trustId = self.listData[0].TrustId;
        fsvc.Upload(postData, timestamp + postDataName, transformSeparator("DealViewer\\TrusteeReportData")).then(
          function (fpath) {
            self.trusteeUploadVisible = false; // 关闭上传弹窗

            self.filePath = FileBaseFolder + fpath.UploadResult;
            self.excelUpload = false;
            var tp = new taskprocess(
              "Task",
              "DV_UploadTrustFactBondPayment",
              "TaskProcess"
            );
            tp.AddVariableItem("TrustID", trustId, "String");
            tp.AddVariableItem("UserName", self.userName, "String");
            tp.AddVariableItem("DataType", 'FactBondPayment', "String");
            tp.AddVariableItem("SourceFilePath", FileBaseFolder + fpath
              .UploadResult, "String");
            tp.ShowIndicator(function () {
              self.$refs.refDataGrid.refresh();
            });
          });
      },
      assetPoolPaymentUpload: function () {
        var self = this;
        var postData = $("#assetPoolPayment")[0].files[0];
        if (!postData) {
          self.$message({
            message: '请选文件',
            type: 'warning'
          });
          return;
        }
        var timestamp = new Date().getTime();
        var postDataName = postData.name;
        let trustId = self.listData[0].TrustId;
        var upFile = '',
          taskName = '',
          dataType = '';
        switch (self.uploadType) {
          case 'assetPoolPayment':
            upFile = "DealViewer\\AssetPoolData";
            taskName = "DV_UploadFactAssetPoolPayment";
            dataType = 'FactAssetPoolPayment';
            break;
          case 'TaxTable':
            upFile = "DealViewer\\TrustFee";
            taskName = 'DV_UploadFeeStructureReconciliation';
            dataType = 'TaxFee';
            break;
          case 'PoolStatistics':
            upFile = "DealViewer\\PoolStatistics";
            taskName = 'DV_UploadPoolStatistics';
            dataType = 'PoolStatistics';
            break;
          case 'PoolDistributions':
            upFile = "DealViewer\\PoolDistributions";
            taskName = 'DV_UploadPoolDistributions';
            dataType = 'PoolDistributions';
            break;
          case 'PoolCashFlow':
            upFile = "DealViewer\\PoolCashflowAggregation";
            taskName = 'DV_UploadCashflowAggregation';
            dataType = 'PoolCashFlow';
            break;
          case 'TrustServiceProvider':
            upFile = "DealViewer\\TrustServiceProvider";
            taskName = 'DV_UploadTrustServiceProvider';
            dataType = 'TrustServiceProvider';
            break;
          default:
            break;
        }
        fsvc.Upload(postData, timestamp + postDataName, upFile).then(function (fpath) {
          self.filePath = FileBaseFolder + fpath.UploadResult;
          self.excelUpload = false;
          var tp = new taskprocess(
            "Task",
            taskName,
            "TaskProcess"
          );
          tp.AddVariableItem("TrustID", trustId, "String");
          tp.AddVariableItem("UserName", self.userName, "String");
          tp.AddVariableItem("DataType", dataType, "String");
          tp.AddVariableItem("SourceFilePath", FileBaseFolder + fpath
            .UploadResult, "String");
          tp.ShowIndicator(function () {
            self.dlgAssetPoolPayment = false;
            self.$refs.refDataGrid.refresh();
          });
        });
      },
      //上传文件处理
      dialogFileInput(event) {
        var file = event.target.files;
        console.log(file)
        let self = this
        if (file.length > 1) {
          this.dialogUploadFileName = ''
          for (let key in file) {
            if (key == "length") {
              self.dialogUploadFileName = self.dialogUploadFileName.substring(0, self
                .dialogUploadFileName.length - 1)
              return
            }
            self.dialogUploadFileName = self.dialogUploadFileName + file[key].name + ','
          }
        } else if (file.length == 1) {
          this.dialogUploadFileName = file[0].name;
        }
      },
      dialogUploadCilck(id) {
        $("#" + id).click();
      },
      checklist() {
        let id = this.listData[0].TrustId;
        this.dlgCheckList.TrustId = id;
        this.dlgCheckList.Visiable = true;
      },
      closeCheckList() {
        this.dlgCheckList.Visiable = false;
      },
      createTrust(isEdit) {
        if (isEdit) {
          let id = this.listData[0].TrustId;
          this.dlgTrustInfo.TrustId = id;
        } else {
          this.dlgTrustInfo.TrustId = 0;
        }
        this.dlgTrustInfo.Visiable = true;
      },
      trustUpdated(haveUpdate) {
        this.dlgTrustInfo.Visiable = false;
        if (haveUpdate) {
          this.$refs.refDataGrid.refresh();
        }
      },
      removeDealStructures() {
        let self = this;
        if (confirm("确定要删除所选产品吗?")) {
          let list = [];
          if (self.listData && self.listData.length > 0) {
            self.listData.forEach((item, index) => {
              list.push(item.TrustId);
            });
            let strDealStructures = "";
            if (list.length > 0) {
              strDealStructures = list.join(",");
            }
            if (strDealStructures) {
              var svc = new csvc(
                "PortfolioManagement",
                "DV.Trust_Remove",
                1
              );
              svc.AddParam({
                Name: "DealStructuresString",
                Value: strDealStructures,
                DBType: "string"
              });
              svc.AddParam({
                Name: "UserName",
                Value: self.userName,
                DBType: "string"
              });
              svc.ExecTable().then(res => {
                self.$refs.refDataGrid.refresh();
                self.$message.success('删除成功');
                var tp = new taskprocess(
                  "Task",
                  "FixedIncomeSuite_DeleteTrustFromDealViewer",
                  "TaskProcess"
                );
                tp.AddVariableItem("TrustID", list[0], "String");
                tp.RunTask();
              });
            }
          }
        }
      },
      //补充经典交易结构
      supplementTrust() {
        let self = this;
        //DealStructure.TrustManagement.usp_GenerateClassicDealStructure
        if (self.listData && self.listData.length > 0) {
          let tid = self.listData[0].TrustId;
          let svc = new csvc(
            "PortfolioManagement",
            "TrustManagement.usp_GenerateClassicDealStructure"
          );
          svc.AddParam({
            Name: "TrustId",
            Value: tid,
            DBType: "string"
          });
          svc.ExecTable().then(res => {
            self.$refs.refDataGrid.refresh();
            this.$message({
              message: '补充成功',
              type: 'success'
            });
          });
        }
      },
      //获取select下拉数据
      getDropdown() {
        let self = this
        let svc = new csvc(
          "PortfolioManagement",
          "DV.ItemData_GetByCategoryCode"
        );
        svc.AddParam({
          Name: "CategoryCode",
          Value: 'AssetType',
          DBType: "string"
        });

        svc.ExecTable().then(res => {
          self.dropdownData = res
        });
      },
      //            导入统计图表数据

      //导入统计
      ImportStatistics() {
        this.statisticsDialogVisible = true
      },
      openDetailDialog(TrustId) {
        this.ShowDetailDialog = true;
      },
    }
  };

</script>

<style scoped lang="scss" type="text/scss">
  .productList{
			  background: #fff;
			 display: flex;
			 flex: 1;
			 min-height: 0;
			 height: 100%;
			 flex-direction: row;
			 overflow: hidden;
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


    .searchBox{
      flex: 0 0 300px;
      width: 0;
      background-color: #f4f5fe;
      padding-left: 15px;
    }
    .transactionBoxStyle {
      background: #ffffff;
      padding: 5px 15px 8px 15px;
      box-shadow: 0px 0px 2px 3px rgba(218, 231, 255, 0.6);
    }

    .transactionBoxStyle .transactionStyle {
      position: relative;
      height: 40px;
      line-height: 35px;
      border-bottom: 1px solid #cccccc;
      margin-bottom: 8px;
    }

    .transactionBoxStyle .el-table {
      box-shadow: none;
    }

    .ratingList {
      margin: 0px;
      padding: 0px;

      li {
        display: flex;
        padding: 10px;
        cursor: pointer;

        &:hover {
          background-color: #ebeef5;
        }
      }
    }

    .el-icon-remove.remove-button {
      color: $--color-danger;
      font-size: 16px;
      vertical-align: middle;
      margin-right: 15px;
      cursor: pointer;
    }
    .icon-chenggong{
      color: limegreen;
      font-size: 12px;
    }
    .icon-shibai{
      color: red;
      font-size: 12px;
    }
    .el-button i{
      font-size: 13px!important;
      margin-right: 5px;
    }
    /deep/ .tool-bar{
      height: 39px;
      .tool-right{
        height: 39px!important;
      }
      .tool-left{
        height: 39px!important;
      }
    }
    .openSearch{
      font-size: 12px;
      line-height: 39px;
      padding-left: 20px;
      cursor: pointer;
      vertical-align: middle;
      i{
        color: $--color-primary;
        margin-right: 5px;
        vertical-align: middle;
      }
    }
    /deep/ .advance-filter-header{
      .left{
        margin-left: 0;
      }

    }
    /deep/ .advance-filter-body{
      padding-left: 0;
    }
		}
.clear-condition{
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
      border:1px solid $--color-grey-light;
      color: $--color-primary;
      border-radius: 3px;
      font-size: 12px;
      position: relative;
      padding-right: 22px;
      overflow: hidden;
      &:hover{
        border-color: $--color-primary;
        .field-remove{
          background-color: $--color-primary;
          color: #fff;
        }
      }

      .field-titles {
        margin-right: 5px;
        display: inline-block;
        padding: 3px 0 3px 10px;
        .title{
          color: $--color-black;
        }
      }

      .field-remove {
        display: inline-block;
        height: 100%;
        cursor: pointer;
        padding:0 5px;
        position: absolute;
        top: 0;right: -1px;
        line-height: 26px;
        width: 15px;
        background-color: #f1f1f1;
        i{
          position: absolute;
          top: 50%;
          left: 50%;
          transform:translate(-50%,-50%)
        }
      }
    }
  </style>
