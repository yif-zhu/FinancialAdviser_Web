<template>
  <ItemBox title="财务分析报告" >
    <template slot="right">
      <el-button type="primary" @click="exportExcel"  style="position: absolute;right: 60px;top: 20px;">生成财务分析报告</el-button>
    </template>
    <data-grid id="export-table" conName="PortfolioManagement" proc-name="report" :tableName="viewType"
               ref="refDataGrid" isFixed :order="listOrder"
               :filter="listFilter" :needUserName="true"  :multiSelection="true" :row-key="row_key"
               @listDataChanged="listDataChanged" :key="viewType">
<!--     <el-table :showFilter="false" :data="balanceInfo" style="width: 100%">-->
      <template slot="table-column">
        <el-table-column prop="TrustName" label="报告名称"  min-width="200"
                         :show-overflow-tooltip="true">
        </el-table-column>
        <el-table-column prop="TrustStartDate" label="报告日期"  width="120">
        </el-table-column>
        <el-table-column prop="MarketCategoryName" label="所属经营机构"  width="120">
        </el-table-column>
        <el-table-column prop="ProductSubject" label="创建人" min-width="130">
        </el-table-column>
        <el-table-column prop="TrustStartDate" label="创建日期" min-width="130">
        </el-table-column>
        <el-table-column label="操作" min-width="150":show-overflow-tooltip="true" >
          <template slot-scope="{row}">
            <el-button @click="EditReport(row)" size="mini" type="text">编辑</el-button>
            <el-button @click="downloadReport(row)" size="mini" type="text">下载</el-button>
            <el-button @click="deleteReport(row)" size="mini" class="red" type="text">删除</el-button>
          </template>
        </el-table-column>
      </template>
<!--     </el-table>-->
    </data-grid>
    <el-dialog title="生成财务分析报告" width="500px" :visible.sync="createReport" destroy-on-close :lock-scroll="false">
      <el-table :showFilter="false" :data="fields" style="min-height: 300px;">
        <div class="filter-label text-ellipsis" >报表日期：
          <el-select  v-model="industy" popper-class="max-width" style="width: 100%;" filterable>
            <el-option v-for="(option, index) in fields" :label="option.TrustName" :value="option.TrustName" :key="index"></el-option>
          </el-select>
        </div>
      </el-table>
    </el-dialog>
  </ItemBox>

</template>

<script>
import dataGrid from '@/components/common/DataGrid.vue';
import ItemBox from '@/components/layout/ItemBox.vue';
import {
  mapState,
  mapMutations
} from 'vuex';
import fsvc from "@/api/FileService";
import csvc from "@/api/CommonService";

export default {
  components: {
    dataGrid,
    ItemBox
  },
  data() {
    return {
      listOrder: 'ItemId asc,TrustStartDate asc',
      listFilter: 'IsMarketProduct = 1',
      searchS: true,
      industy:'202003季度',
      createReport:false,
      fields: [{
        TrustName:'202001季度'
      },{
        TrustName:'202002季度'
      },{
        TrustName:'202003季度'
      },{
        TrustName:'202004季度'
      },],
      checkedData:[],
      tableDataList:[],
      viewType: 'DV.view_Products',
      reportUpload:false,
      dialogUploadFileName:'',
      progressSw:false,
      progressText: '正在保存文件，请稍等',
      percentage: 0,
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
    exportExcel(){
      this.createReport = true;
    },
    EditReport(TrustID){
      this.reportUpload = true;
      this.TrustId = TrustID;
    },
    downloadReport(TrustId){
      //下载报告
      this.$message.success('下载成功');
    },
    deleteReport(TrustID){
      //删除报告
      let self = this;
      if (confirm("确定要删除所选产品吗?")) {
        self.$message.success('删除成功');
      }
    },
    dialogFileInputs(event) {
      var file = event.target.files;
      if (file.length == 1) {
        this.dialogUploadFileName = file[0].name;
      }
    },
    dialogUploadCilck(id) {
      $("#" + id).click();
    },
    reportingFilesUpload() {
      var self = this;
      var postData = $("#excelUploads")[0].files;
      if (postData.length < 1) {
        self.$message.error('请选择上传的文件');
        return;
      }

      self.reportUpload = false;
      self.percentage = 0
      var postDataI = 0;
      var nbprogress = 0;
      var postDataName = postData[postDataI].name;
      const progress = function (progressEvt) {
        self.progressSw = true
        nbprogress = progressEvt.loaded / progressEvt.total;
        self.percentage = parseInt((postDataI + nbprogress) / (postData.length) * 100)

      };
      var callback1 = function (fpath) {
        self.progressText = ''
        let filePath = fpath.UploadResult;
        filePath = filePath.substr(0,filePath.lastIndexOf('/')+1)
        let fileType = postDataName.substr(postDataName.lastIndexOf(".") + 1);
        var svc = self.$http('PortfolioManagement', 'DV.TrustAssociatedDocs_Add');
        svc.AddParam({
          Name: "TrustId",
          Value: self.TrustID,
          DBType: "int"
        });
        svc.AddParam({
          Name: "FileCategory",
          Value: self.fileType,
          DBType: "string"
        });
        svc.AddParam({
          Name: "FilePath",
          Value: filePath,
          DBType: "string"
        });
        svc.AddParam({
          Name: "FileName",
          Value: postDataName,
          DBType: "string"
        });
        svc.AddParam({
          Name: "FileType",
          Value: fileType,
          DBType: "string"
        });
        svc.AddParam({
          Name: "UserName",
          Value: self.userName,
          DBType: "string"
        });
        svc.ExecResult().then(res => {
          res = parseInt(res);
          if (isNaN(res)) {
            self.$message.error('文件上传发生内部服务错误');
            self.progressSw = false
          } else {
            self.progressSw = true
            self.progressText = '已成功上传文件'
            setTimeout(() => {
              self.progressSw = false
              self.progressText = ''
            }, 500)
          }
        });
      }
      fsvc.UploadOther(postData[postDataI], postDataName, folderName, 1)(progress, callback1)
    },
    row_key(row) {
      //console.log(row)
      return this.viewType === 'DV.view_Products' ? row.TrustId : row.SNO;
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
  .dialogfileUploadBox .el_fileUploadInput {
    left: 0;
    width: 300px;
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


