<style lang="scss" scoped>
  .app-header{
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    width: 100%;
    height: 40px;
    background: linear-gradient(to right , #2D3EAB, #0D1E8A 20%, #0D1E8A 70%, #3d4fc5);
    background-color: #2D3EAB;
    .inner{
      padding: 0 20px;
      .content{
        display: flex;
        height: 40px;
        flex-direction: row;
        align-items: center;
        >div{
          flex:1;
        }
        .logo{
          flex:1;
          font-size: 18px;
          font-weight: bold;
          color: #fff;
          a{
            color: #fff;
            .dv-logo{
              height: 26px
            }
          }
        }
        .menu{
          ul{
            text-align: right;
            li{
              display: inline-block;
              font-size: 14px;
              color: rgba(255,255,255,0.6);
              margin-left: 40px;
              vertical-align: middle;

              &:first-child{
                margin-left: 0;
              }
              &.message{
                &.active{
                  position: relative;
                  &:before{
                    display: inline-block;
                    width: 5px;
                    height: 5px;
                    border-radius: 5px;
                    background-color: red;
                    content: '';
                    position: absolute;
                    top: -2px;right: -2px;
                  }
                }
                i{
                  cursor: pointer;
                }
              }
              a{
                color: rgba(255,255,255,0.6);
                vertical-align: middle;
                &.router-link-active{
                  color: #fff;
                }
              }
              &.userName{
                span{
                  vertical-align: middle;
                }
                img{
                  width: 23px;
                  height: 23px;
                  vertical-align: middle;
                  margin-right: 10px;
                }
              }
            }
          }

          .setting{
            color: rgba(255,255,255,0.6);
            cursor: pointer;
            &:hover{
              color: #fff;
            }
          }
        }

      }

    }
  }
.icon-guanzhu1{
  color:rgb(247, 186, 42);
  font-size:13px;
  cursor: pointer;
}
.icon-guanzhu{
  color: #c0c4cc;
  font-size: 13px;
  cursor: pointer;
}
.moreP{
  font-size: 12px;
  text-align: center;
  line-height: 30px;
  color: $--color-grey;
  cursor: pointer;
}
.popoverUl{
  a{
    line-height: 30px;
    font-size: 12px;
    border-bottom: 1px solid #ddd;
    color: $--color-grey;
    display: inline-block;
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
    width: 100%;
    cursor: pointer;
  }
}
.messageTab{
  font-size: 12px;
}
/deep/ .el-tabs__item{
  font-size: 12px;
  height: 30px;
  line-height: 30px;
}
</style>
<template>
  <div class="app-header">
    <div class="inner">
      <div class="content">
        <div class="logo">
          <router-link to="/Enterprise/EnterpriseList">
            <img src="@/assets/images/dv.svg" alt="" class="dv-logo">
          </router-link>
        </div>
<!--        <Search v-if="CUSTOMER === 'xiaomi'"/>-->
        <div class="menu">
          <ul class="app-menu">
            <li class="menu-item">
              <router-link to="/Enterprise">
                <span>企业列表</span>
              </router-link>
            </li>
            <li class="menu-item">
              <router-link to="/IndustryData">
                <span>行业数据</span>
              </router-link>
            </li>
            <li class="menu-item">
              <router-link to="/ReportManage">
                <span>报告管理</span>
              </router-link>
            </li>

            <li class="userName">
              <img :src="userImg"/>
              <el-dropdown @command="handleSetting">
                <span class="setting">
                设置<i class="el-icon-arrow-down el-icon--right"></i>
                </span>
                <el-dropdown-menu slot="dropdown" :visibleArrow="false">
                  <el-dropdown-item command="admin">系统设置</el-dropdown-item>
                  <el-dropdown-item command="modifyPassword">修改密码</el-dropdown-item>
                  <el-dropdown-item command="logout">退出登录</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </li>
          </ul>

        </div>
      </div>
    </div>
    <el-dialog title="修改密码" width="430px" :visible.sync="modifyPasswordDialog" :lock-scroll="false">
      <el-form ref="passwordForm" :model="passwordForm" :rules="passwordRules" key="modifyPassword">
        <el-form-item label="原密码" prop="oldPassword" :error="passwordErrors.oldPassword">
          <el-input type="password" v-model="passwordForm.oldPassword" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="新密码" prop="newPassword" :error="passwordErrors.newPassword">
          <el-input type="password" v-model="passwordForm.newPassword" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="confirmPassword" :error="passwordErrors.confirmPassword">
          <el-input type="password" v-model="passwordForm.confirmPassword" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleModifyUserPassword">确定</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>

  </div>
</template>

<script>
  // import dataGrid from '@/components/common/DataGrid.vue';
  import userImg from '@/assets/images/user.png'
  import {mapState, mapMutations, mapMutions} from 'vuex';
  import md5 from 'js-md5';
  export default {
    name: "AppHeader",
    data() {
      const validator = (rule, value, callback) => {
        let test = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,20}$/;
        if (value === '') {
          callback(new Error('请输入密码'));
        }else if (!(test.test(value))) {
          callback(new Error('密码长度为8-20位，必须包括字母、数字'));
        } else {
          callback();
        }
      };
      return {
        active: '1',
        userImg:userImg,
        modifyPasswordDialog: false,
        passwordForm: {
          oldPassword:'',
          newPassword:'',
          confirmPassword: ''
        },
        passwordRules: {
          newPassword: [
            { validator, trigger: 'blur' }
          ],
          confirmPassword: [
            { validator, trigger: 'blur' }
          ],
        },
        passwordErrors: {
          oldPassword: '',
          newPassword: '',
          confirmPassword: '',
        },
        activeRead:'unread',
        listOrder: 'TrustId desc',
        listFilter: 'IsConcerned=1',
        showTips: false,
        showColorsEgg: false,
        versionName : 'Kookaburra',
        total: 0,
        currentPage: 1,
        pagesize: 10,
        filterCheckType: '',
        tableData: [],
        CUSTOMER: process.env.VUE_APP_CUSTOMER,
        showFollows: false
      }
    },
    components:{
      // dataGrid
    },
    computed: {
      ...mapState('user',['userName', 'isRoot']),
      ConcernTrust() {
        return this.$store.state.productInfo.ConcernTrust
      }
    },
    watch:{
      ConcernTrust(v) {
        if(this.$refs.refDataGrid) this.$refs.refDataGrid.refresh()
      }
    },
    created() {
      this.ConcernTrust_Get()
    },
    methods: {
      // ...mapMutations('productInfo', ['setProductDetail','setConcernTrust'],['setLoginStatus']),
      ...mapMutations(['setLoginStatus', 'productInfo/setProductDetail','productInfo/setConcernTrust']),
      ConcernTrust_Get() {
        var self = this;
        var svc = this.$http('PortfolioManagement', 'DV.UserConcernTrust_Get');
        svc.AddParam({
          Name: 'UserName',
          Value: self.userName,
          DBType: 'string'
        });
        svc.ExecTable().then(res => {
          self['productInfo/setConcernTrust'](res)
        })
      },
      handleModifyUserPassword() {
        const $form = this.$refs.passwordForm;
        $form.validate((valid) => {
          if(valid) {
            const {
              oldPassword,
              newPassword,
              confirmPassword
            } = this.passwordForm;
            if(oldPassword === newPassword) {
              this.passwordErrors.newPassword = '请设置一个新的密码!';
              return;
            }
            if(newPassword !== confirmPassword) {
              this.passwordErrors.confirmPassword = '两次输入的密码不一致!';
              return;
            }

            let svc = this.$http(
              'UserManagement',
              'QuickFrame.usp_ChangePasswordWithResult'
            );
            svc.AddParam({
              Name: "UserName",
              Value: this.userName,
              DBType: "string"
            });
            svc.AddParam({
              Name: "OldPassword",
              Value: md5(oldPassword),
              DBType: "string"
            });
            svc.AddParam({
              Name: "NewPassword",
              Value: md5(newPassword),
              DBType: "string"
            });
            svc.ExecResult().then(res => {
              if (res == 1) {
                this.passwordErrors.oldPassword = '原密码不正确!';
              }else{
                this.$message.success('恭喜您，密码修改成功!');
                this.modifyPasswordDialog = false;
                $form.resetFields();
                $form.clearValidate();
              }
            });
          }
        })
      },
      handleSetting(type) {
        switch (type) {
          case 'admin':
            this.$router.push('/Admin');
            break;
          case 'logout':
            this.$store.dispatch('user/handleUserLogout').then(()=>{
              this.$router.push('/login');
              this.setLoginStatus(false);
            });
            break;
          case 'modifyPassword':
            this.modifyPasswordDialog = true
        }
        //alert(type)
      },
    handleSizeChange(size) {
      this.pagesize = size;
      let currentPage=this.currentPage;
      let pagesize= this.pagesize;
      this.tableData = this.$allTableData.slice((currentPage-1)*pagesize,currentPage*pagesize);
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      let currentPage=this.currentPage;
      let pagesize= this.pagesize;
      this.tableData = this.$allTableData.slice((currentPage-1)*pagesize,currentPage*pagesize);
    },
         moreFocusFun() {
        this.$router.push({
          path:'/ProductFocus/ProductList'
        })
      },

    }
  }
</script>
