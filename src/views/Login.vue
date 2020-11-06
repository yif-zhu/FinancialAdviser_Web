<style lang="scss">
  .login-page{
    width: 100%;
    height: 100vh;
    overflow: auto;
    padding-right: 15px;
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
    &-content{
      display: flex;
      flex: 1;
      align-items: center;
      justify-content: center;
      height: 100%;
    }
  }
  .dv-logo{
    height: 42px;
  }
  .cardWarp{
    width: 700px;
    display: flex;
    box-shadow: 0 6px 13px rgba(50, 63, 148, 0.985);
    border-radius: 8px;
    position: relative;
  }
  .login-card{
    width: 350px;
    height: 370px;
    background-color: #fff;
    border-radius: 8px;
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
    position: relative;
    perspective: 1500px;
    .login-card-wrapper{
      transform-style: preserve-3d;
      transition: all 1s ease;
      transform-origin: left;
      background-color: #fff;
      position: absolute;top: 0;
      z-index: 9;
      width: 100%;
      height: 100%;
      opacity: 1;
      border-radius: 8px;
    }
    .transZ{
      transform: rotateY(-180deg);
      opacity: 0;
    }
    &-wrapper{
      padding: 40px;
    }
    .el-form-item--small.el-form-item{
      margin-bottom: 17px;
    }
  }
  .rightName{
    color: #fff;
    padding-left: 30px;
    border-radius: 0;
    border-top-left-radius: 8px;
    border-bottom-left-radius: 8px;
    background: linear-gradient(-60deg,rgba(#593ce6,1) 24%,rgba(#5264D9,0.2)  );
    h4{
      font-size: 28px;
      margin-top: 10px;
    }
    h2{
      font-size: 28px;
      margin-top: 120px;
    }
  }

  .login-logo{
    text-align: center;
    line-height: 50px;
    height: 50px;
    color: $--color-primary;
    font-weight: normal;
    font-size: 20px;
  }
.registerDom {
    width: 100%;
    padding: 15px 25px!important;
    background-color: #fff;
    border-radius: 8px;
    z-index: 1!important;
    .el-form-item--small.el-form-item{
      margin-bottom: 17px;
    }
    .el-form-item__label{
      font-size: 12px;
    }
    .login-logo{
      height: 10px;
      line-height: 0;
      font-size: 16px;
    }
  }
  .login-button{
    width: 100%;
  }
</style>

<template>
  <div class="login-page" :style="backgroundDiv">
    <div class="login-page-content">
      <div class="cardWarp" >
      <div class="rightName login-card">
        <h2><img src="@/assets/images/dv_login.svg" alt="" class="dv-logo"></h2>
      </div>
      <div class="login-card">
        <div class="login-card-wrapper" :class="isLoginT?'':'transZ'">
          <div v-if="CUSTOMER === 'xiaomi' && showLogo == 1" style="width:60px;height:60px;margin:0 auto;margin-bottom: 20px;">
            <img src="@/assets/images/mi.png" alt="">
          </div>
          <h1 class="login-logo" v-else>登 录</h1>
          <el-form ref="form" :model="form" :rules="rules" autocomplete="off" >
            <el-form-item prop="email">
              <el-input type="text" id="Input_UserName" prefix-icon="el-icon-message" v-model="form.email"
                        auto-complete="email" @keyup.enter.native="handleSubmit" placeholder="用户名/邮箱">
              </el-input>
            </el-form-item>
            <el-form-item prop="password" :error="errorMsg">
              <el-input type="password" id="Input_Password" prefix-icon="el-icon-lock" v-model="form.password"
                        auto-complete="new-password" @keyup.enter.native="handleSubmit" placeholder="密码">
              </el-input>
            </el-form-item>
            <el-form-item v-if="isSimple == '0'">
              <el-col :span="12">
                <el-form-item prop="captcha" style="margin-bottom: 0" :error="captionErrorMsg">
                  <el-input v-model="form.captcha" @keyup.enter.native="handleSubmit" placeholder="验证码"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item style="margin-bottom: 0">
                  <img :src="captcha" @click="refreshCaptcha" style="cursor: pointer"/>
                </el-form-item>
              </el-col>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" id="Button_Login" class="login-button" :disabled="submitStatus" @click="handleSubmit">
                确 定
              </el-button>
              <p v-if="CUSTOMER === 'xiaomi' && isSimple == '0'" style="text-align:center;font-size:12px;"><span style="cursor: pointer;" @click="dvRegister">注册账号</span></p>
            </el-form-item>
          </el-form>
        </div>
<!--        <div class="registerDom login-card-wrapper">
          <h1 class="login-logo">注 册</h1>
          <el-form ref="createUserForm" :model="createUserForm" :rules="createUserRules" key="createUser" label-width="60px">
            <el-form-item label="用户名" prop="userName" :error="createUserErrors.userName">
              <el-input type="text" v-model="createUserForm.userName" auto-complete="off" placeholder="用户名由字母、数字及下划线组成"></el-input>
            </el-form-item>
            <el-form-item label="手机号" prop="phone" :error="createUserErrors.userName">
              <el-input type="text" v-model="createUserForm.userName" auto-complete="off" placeholder="请输入手机号码"></el-input>
            </el-form-item>
            <el-form-item label="邮箱" prop="eMail" :error="createUserErrors.EMail">
              <el-input type="text" v-model="createUserForm.EMail" auto-complete="off" placeholder="请输入邮箱地址"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
              <el-input type="password" v-model="createUserForm.password" auto-complete="off" placeholder="请输入不少于8位字符的密码"></el-input>
            </el-form-item>
            <el-form-item label="确认密码" prop="passwordConfirm">
              <el-input type="password" v-model="createUserForm.passwordConfirm" auto-complete="off" placeholder="请输入确认密码"></el-input>
            </el-form-item>
            <p style="text-align:center;">
              <el-button type="primary" @click="handleCreateUser" class="login-button">确 定</el-button>
              <p style="text-align:center;font-size:12px;margin-top:7px;"><span style="cursor: pointer;" @click="isLoginT = true">已有账号，去登录</span></p>
            </p>
          </el-form>
        </div> -->
      </div>
      </div>

    </div>
  </div>
</template>

<script>
  import md5 from 'js-md5';
  import cookie from '@/utils/cookie.js';
  import keys from '@/utils/keys.js';
  import {
    mapState,
    mapGetters,
    mapActions
  } from 'vuex';
  import { BasePath } from '@/utils/config.js';
  const captchaUrl = BasePath + 'Services/AuthenticationService.svc/Captcha';
  export default {
    name: "Login",
    data() {
      const validator = (rule, value, callback) => {
        let test = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$/;
        if (value === '') {
          callback(new Error('请输入密码'));
        }else if (!(test.test(value))) {
          callback(new Error('密码长度为6-20位，必须包括字母、数字'));
        } else {
          callback();
        }
      };
      const validatorC = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入确认密码'));
        }else if (value != validator) {
          callback(new Error('确认密码与密码不相符'));
        } else {
          callback();
        }
      };
    const checkPhone = (rule, value, callback) => {
      let test = /^1[3456789]\d{9}$/;
      if(value === '') {
        callback(new Error('手机号码'));
      }else if(!test.test(value)){
        callback(new Error('请输入有效手机号'));
      }else{
        callback();
      }
    };
    const checkEMail = (rule, value, callback) => {
      let test = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
      if(value === '') {
        callback(new Error('请输入邮箱地址'));
      }else if(!test.test(value)){
        callback(new Error('请输入有效邮箱地址'));
      }else{
        callback();
      }
    };
    const checkUserName = (rule, value, callback) => {
      if(value === '') {
        callback(new Error('请输入用户名'));
      }else{
        callback();
      }
    };
      return {
        captcha: captchaUrl,
        form: {
          email: '',
          password: '',
          captcha: ''
        },
        isLoginT:true,
        rules: {
          email: [{
            required: true,
            message: '请输入用户名或邮箱',
            trigger: 'blur'
          }],
          password: [{
            required: true,
            message: '请输入密码',
            trigger: 'blur'
          },{
            type: 'string',
            min: 6,
            message: '密码不能少于6位',
            trigger: 'blur'
          }],
          captcha: [{
            required: true,
            message: '请输入验证码',
            trigger: 'blur'
          }]
        },
        errorMsg: '',
        captionErrorMsg: '',
        submitStatus: false,
        backgroundDiv: {
            backgroundImage: 'url(' + require('@/assets/images/loginBg.jpg') + ')'
        },
        createUserForm: {
          userName: '',
          phone:'',
          password: '',
          passwordConfirm: '',
          EMail:''
        },
        createUserRules: {
        userName: [
          { validator: checkUserName, trigger: 'blur' }
        ],
        password: [
          { validator, trigger: 'blur' }
        ],
        passwordConfirm: [
          { validatorC, trigger: 'blur' }
        ],
        phone: [
          { validator: checkPhone, trigger: 'blur' }
        ],
        EMail: [
          { validator: checkEMail, trigger: 'blur' }
        ],
      },
      createUserErrors: {
        userName: '',
        EMail:'',
        password:'',
        passwordConfirm:'',
        phone:''
      },
      CUSTOMER: process.env.VUE_APP_CUSTOMER,
      showLogo: process.env.VUE_APP_ShowLogo,
      isSimple: process.env.VUE_APP_IsSimple
      };
    },
    created() {
      this.$title('登录');
    },
    computed: {
      ...mapGetters(['isLogin']),
      ...mapState(['siteTitle'])
    },
    methods: {
      ...mapActions('user', ['handleUserLogin']),
      dvRegister() {
        window.location.href = '/Community/#/register?appPath='+ encodeURIComponent('/DealViewer/#/login');
      },
      handleCreateUser() {
        const $form = this.$refs.createUserForm;
        // $form.validate((valid) => {
        //   if(valid) {
        //     const {userName, password, passwordConfirm, EMail,phone} = this.createUserForm;

        //     let item = `<item>`;
        //      item += `<UserName>${userName}</UserName>`;
        //      item += `<Email>${EMail}</Email>`;
        //      item += `<DisplayName>${displayName}</DisplayName>`;
        //      item += `<LoweredUserName>${userName.toLocaleLowerCase()}</LoweredUserName>`;
        //      item += `<Password>${md5(password)}</Password>`;
        //      item += `<Password>${md5(password)}</Password>`;
        //      item += `</item>`;
        //     let svc = this.$http(
        //       'UserManagement',
        //       'QuickFrame.usp_AddUser'
        //     );
        //     svc.AddParam({
        //       Name: "item",
        //       Value: item,
        //       DBType: "string"
        //     });
        //     svc.ExecResult().then(res=>{
        //       if(res === 3) {
        //         this.createUserErrors.userName = '账号已存在，换一个试试';
        //       }else{
        //         this.$message.success('账号创建成功!');
        //         $form.resetFields();
        //         $form.clearValidate();
        //       }
        //     });
        //   }
        // });
      },
      handleSubmit() {
        this.$refs.form.validate((valid) => {
          if (valid) {
            this.submitStatus = true;
            if (this.errorMsg !== '') {
              this.errorMsg = '';
            }
            if (this.captionErrorMsg !== '') {
              this.captionErrorMsg = '';
            }
            // let param = {
            //   loginName: "'"+this.form.email.trim()+"'",
            //   Password: "'"+this.form.password+"'"
            //   //captcha: '1E6046FC-5C78-43D4-9409-3F62BB2979EC',
            //   //captcha: this.isSimple == '0' ? this.form.captcha : '1E6046FC-5C78-43D4-9409-3F62BB2979EC'
            // };
            let param = {
              username: this.form.email.trim(),
              password: md5(this.form.password),
              //captcha: '1E6046FC-5C78-43D4-9409-3F62BB2979EC',
              captcha: this.isSimple == '0' ? this.form.captcha : '1E6046FC-5C78-43D4-9409-3F62BB2979EC'

            };
            this.handleUserLogin(param).then((data) => {
              this.submitStatus = false;
              if(!data) {
                this.captionErrorMsg = '您输入的验证码不正确！';
                this.refreshCaptcha();
                return;
              }
              let redirectURL = this.$route.query.redirectURL;

              if (redirectURL !== undefined) {
                this.$router.replace(redirectURL);
              } else {
                this.$router.push(this.isSimple == '0' ? "/Product/ProductList" : "/quotation-analysis/index");
              }
              cookie.set(keys.userInfo, JSON.stringify(data), {
                path: '/'
              });
            }, () => {
              this.errorMsg = '您输入的密码和账户名不匹配！';
              this.captionErrorMsg = '';
              this.refreshCaptcha();
              this.submitStatus = false;
            });
          }
        });
      },
      refreshCaptcha() {
        this.captcha = captchaUrl + '?' +(Math.random() * 100)
      }
    },
  };

</script>
