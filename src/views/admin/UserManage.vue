<template>
  <div class="productList" style="height:100%;display:flex;">
    <div class="tableWrap transactionBox" ref="tableWrap">
      <data-grid :showFilter="true" id="export-table" conName="PortfolioManagement" proc-name="User" tableName="DV.view_TrustsInterBank"
                 ref="refDataGrid" isFixed :order="listOrder" @sortChange="doListSortChange"
                 :filter="listFilter" :needUserName="true"  @select="selectRow"  :row-key="row_key" @listDataChanged="listDataChanged" >
        <template slot="toolbar-filter">
          <div class="view-type">用户管理</div>
        </template>
        <template slot="toolbar-right">
          <el-button size="mini" @click="showAddUser" >新增用户</el-button>
        </template>
        <template slot="table-column">
          <el-table-column label="操作" width="120" sortable="custom" fixed>
            <template slot-scope="{row}">
              <el-button @click="EditEnterprise(row)" size="mini"  type="text">编辑</el-button>
              <el-button @click="deleteEnterprise(row.TrustId)" size="mini" class="red" type="text">删除</el-button>
            </template>
          </el-table-column>
          <el-table-column prop="TrustId" label="账号" sortable="custom" min-width="120">
          </el-table-column>
          <el-table-column prop="TrustName" label="用户名称" sortable="custom" min-width="150">
          </el-table-column>
          <el-table-column prop="TrustStartDate" label="创建时间" min-width="50">
            <template slot-scope="scope">
              {{scope.row.TrustStartDate?scope.row.TrustStartDate.S2Date():'--'}}
            </template>
          </el-table-column>
        </template>
      </data-grid>
    </div>
    <div v-if="AddUserDialog">
      <el-dialog :title="title" width="430px" :visible.sync="AddUserDialog" :lock-scroll="false" :close-on-click-modal="false">
        <el-form ref="passwordForm" :model="passwordForm" :rules="passwordRules" >
          <el-form-item label="用户名" prop="userName"  >
            <el-input type="input" v-model="passwordForm.userName" :disabled="!EditUserDialog" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="姓名" prop="DisplayName" >
            <el-input type="input" v-model="passwordForm.DisplayName" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="邮箱" prop="Email" :error="passwordErrors.Email">
            <el-input type="email" v-model="passwordForm.Email" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="手机号" prop="telephone" :error="passwordErrors.telephone">
            <el-input type="tel" v-model="passwordForm.telephone" auto-complete="off"></el-input>
          </el-form-item>
          <div v-if="EditUserDialog">
            <el-form-item label="密码"  prop="newPassword" >
              <el-input type="password" v-model="passwordForm.newPassword" auto-complete="off" show-password></el-input>
            </el-form-item>
            <el-form-item label="确认密码" prop="confirmPassword" :error="passwordErrors.confirmPassword" >
              <el-input type="password" v-model="passwordForm.confirmPassword" auto-complete="off" show-password></el-input>
            </el-form-item>
          </div>
          <el-form-item label="所属经营机构" prop="Orgenaration" >
            <el-select  size="mini" v-model="passwordForm.Orgenaration" popper-class="max-width" style="width: 100%;" filterable >
              <el-option label="请选择" value="0"></el-option>
              <el-option v-for="(option, index) in fields" :label="option.TrustName" :value="option.TrustName" :key="index"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="addUser">确定</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import dataGrid from '@/components/common/DataGrid.vue';
export default {
  components: {
    dataGrid,
  },
  data() {
    const validator = (rule, value, callback) => {
      let test = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,20}$/;
      let testEmail = /^[a-zA-Z0-9]+([-_.][a-zA-Z0-9]+)*@[a-zA-Z0-9]+([-_.][a-zA-Z0-9]+)*\.[a-z]{2,}$/;
      let testTel = /^1[3456789]\d{9}$/;
      if (rule.field =='Email') {
        if (value === '') {
          callback(new Error('请输入邮箱'));
        } else if (!(testEmail.test(value))) {
          callback(new Error('请输入正确格式的邮箱地址'));
        } else {
          callback();
        }
      }
      else if (rule.field =='telephone') {
        if (value === '') {
          callback(new Error('请输入手机号'));
        } else if (!(testTel.test(value))) {
          callback(new Error('请输入正确格式的手机号'));
        } else {
          callback();
        }
      }
      else  {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else if (!(test.test(value))) {
          callback(new Error('密码长度为8-20位，必须包括字母、数字'));
        } else {
          callback();
        }
      }
    };
    return {
      listOrder: 'ItemId asc,TrustStartDate asc',
      listFilter: 'IsMarketProduct = 1',
      searchS: true,
      fields: [],
      checkedData:[],
      tableDataList:[],
      viewType: 'DV.view_Products',
      AddUserDialog: false,
      EditUserDialog:false,
      title:'',
      passwordForm: {
        userName:'',
        DisplayName:'',
        Email:'',
        telephone:'',
        newPassword:'',
        confirmPassword: '',
        Orgenaration:'0',
      },
      passwordRules: {
        Email: [
          { validator, trigger: 'blur' }
        ],
        telephone: [
          { validator, trigger: 'blur' }
        ],
        newPassword: [
          { validator, trigger: 'blur' }
        ],
        confirmPassword: [
          { validator, trigger: 'blur' }
        ],
      },
      passwordErrors: {
        Email:'',
        telephone:'',
        confirmPassword: '',
      },
    }
  },
  computed: {
  },
  created() {
    this.getOrganData();
  },
  methods: {
    getOrganData(){
      var svc = this.$http('PortfolioManagement', 'DV.AdvanceFilter_GetSettingByEnterPrise1', true);
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
      });
    },
    EditEnterprise(row){
      this.AddUserDialog = true;
      this.EditUserDialog = false;
      this.title='编辑用户';
      let Current = [];
      Current.userName = row.TrustNameShort;
      Current.DisplayName = row.TrustCode;
      Current.Email = '12345@163.com';
      Current.telephone = '15885246789';
      Current.Orgenaration = row.TrustName;
      this.passwordForm = Current;
    },
    deleteEnterprise(TrustID){
      this.$message.success('删除成功');
    },
    showAddUser () {
      let self = this;
      self.EditUserDialog = true;
      self.AddUserDialog = true;
      self.TrustId = 0;
      this.title='新增用户';
      this.passwordForm.userName = '';
      this.passwordForm.DisplayName = '';
      this.passwordForm.Email = '';
      this.passwordForm.telephone = '';
      this.passwordForm.Orgenaration = '0';
      this.passwordForm.newPassword ='';
      this.passwordForm.confirmPassword= '';
    },
    addUser(){

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
    this.listFilter = "IsMarketProduct = 1";

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
