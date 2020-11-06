<template>
  <div class="productList" style="height:100%;display:flex;">
    <div class="tableWrap transactionBox" ref="tableWrap">
      <div class="searchBox-fold" @click="searchSC">
        <i :class="searchS?'el-icon-caret-left':'el-icon-caret-right'"></i>
      </div>
      <data-grid :showFilter="true" id="export-table" conName="PortfolioManagement" proc-name="User" tableName="DV.view_TrustsInterBank"
                 ref="refDataGrid" isFixed :order="listOrder" @sortChange="doListSortChange"
                 :filter="listFilter" :needUserName="true"  @select="selectRow"  :multiSelection="true" :row-key="row_key" @listDataChanged="listDataChanged" :key="viewType">
        <template slot="toolbar-filter">
          <div class="view-type">角色管理</div>
        </template>
        <template slot="toolbar-right">
          <el-button size="mini" @click="showAddRole" >新增角色</el-button>
        </template>
        <template slot="table-column">
          <el-table-column label="操作" width="120" sortable="custom" fixed>
            <template slot-scope="{row}">
              <el-button @click="EditRole(row)" size="mini"  type="text">编辑</el-button>
              <el-button @click="deleteRole(row)" class="red" size="mini" type="text">删除</el-button>
            </template>
          </el-table-column>
          <el-table-column prop="TrustId" label="角色名称" sortable="custom" min-width="120">
          </el-table-column>
          <el-table-column prop="TrustName" label="是否系统角色" sortable="custom" min-width="150">
          </el-table-column>
          <el-table-column prop="TrustStartDate" label="创建时间" min-width="50">
            <template slot-scope="scope">
              {{scope.row.TrustStartDate?scope.row.TrustStartDate.S2Date():'--'}}
            </template>
          </el-table-column>
          <el-table-column prop="TrustName" label="描述" sortable="custom" min-width="150">
          </el-table-column>
        </template>
      </data-grid>
    </div>
    <div v-if="addRole">
      <el-dialog :title="title" width="430px" :visible.sync="addRole" :lock-scroll="false" :close-on-click-modal="false">
        <el-form ref="passwordForm" :model="roleForm"  >
          <el-form-item label="角色名称" prop="userName"  >
            <el-input type="input" v-model="roleForm.roleName" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="角色描述" prop="DisplayName" >
            <el-input type="input" v-model="roleForm.roleDesc" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="addRoleFunc">确定</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
    </div>
  </div>
</template>

<script>

import dataGrid from '@/components/common/DataGrid.vue';
import CreateTrust from "@/components/admin/CreateTrust";
import { BasePath } from '@/utils/config.js';
export default {
  components: {
    dataGrid,
    CreateTrust
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
      viewType: 'DV.view_Products',
      addRole: false,
      roleForm:{
        roleName:'',
        roleDesc:''
      },
      title:''
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

    searchSC() {
      this.searchS = !this.searchS
    },
    EditRole(row){
      this.addRole = true;
      this.title='编辑角色';
      this.roleForm.roleName = row.TrustName;
      this.roleForm.roleDesc = '描述信息';
    },
    deleteRole(row){
      this.$message.success('删除成功');
    },
    showAddRole () {
      let self = this;
      self.addRole = true;
      this.roleForm.roleName = '';
      this.roleForm.roleDesc = '';
      this.title='新增角色';
    },
    addRoleFunc(){

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
