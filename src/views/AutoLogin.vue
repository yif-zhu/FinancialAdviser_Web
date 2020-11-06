<template>
  <div>
    自动登录中...
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
  export default {
    name: "AutoLogin",
    mounted() {
      let param = {
        username: 'huataiyonghu1',
        password: md5('Password01'),
        captcha: '1E6046FC-5C78-43D4-9409-3F62BB2979EC'
      };
      this.handleUserLogin(param).then((data) => {
        console.log('dddd')
        let redirectURL = this.$route.query.redirectURL;
        if (redirectURL !== undefined) {
          this.$router.replace(redirectURL);
        } else {
          this.$router.push("/Product/ProductList");
        }
        cookie.set(keys.userInfo, JSON.stringify(data), {
          path: '/'
        });
      }, err => {
        this.$message.error('自动登录失败！');
      });
    },
    methods: {
      ...mapActions('user', ['handleUserLogin']),
    },
  };
</script>
