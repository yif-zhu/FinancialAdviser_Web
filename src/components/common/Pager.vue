<template>
  <el-pagination @size-change="pageSizeChange" @current-change="pageIndexChange"
    :current-page="current" :page-size="size" :page-sizes="[10,20,50,100]" :pager-count="5"
    :total="total" layout="total, sizes, prev, pager, next">
  </el-pagination>
</template>

<script>
  import {
    mapState
  } from 'vuex';
  export default {
    name: 'Pager',
    props: {
      conname: {
        type: String,
        required: true
      },
      procname:{
        type: String,
        required:true
      },
      tablename: {
        type: String,
        required: true
      },
      filter: {
        type: String
      },
      order: {
        type: String
      },
      dataloaded: {
        type: Function,
        required: true
      },
      loadingswitcher: {
        type: Function
      },
      pageSize: {
        type: Number,
        default: 20
      },
			needUserName:{
				type: Boolean,
				default: false
			},
      trustId:{
        type: [Number,String],
        default: 0
      }
    },
    data() {
      return {
        current: 1,
        total: 0,
        size: 0
      };
    },
    computed: {
      ...mapState(['locale']),
			...mapState('user',['userName']),
    },
    watch: {
      filter(newValue, oldValue) {
        if (this.loadingswitcher && typeof this.loadingswitcher === 'function') {
          this.loadingswitcher(true);
        }
        this.current = 1;
        this.getListWithPager();
      },
      order(newValue, oldValue) {
        if (this.loadingswitcher && typeof this.loadingswitcher === 'function') {
          this.loadingswitcher(true);
        }
        this.getListWithPager();
      },
      pageSize(v) {
        this.size = v;
      }
    },
    mounted() {
      this.size = this.pageSize;
      this.getListWithProduct()
      // switch (this.procname){
      //   case 'Product': this.getListWithProduct(); break;
      //   case 'Industry': this.getListWithIndustry(); break;
      //   case 'Report': this.getListWithReport(); break;
      //   case 'User': this.getListWithUser(); break;
      //   case 'Role': this.getListWithRole(); break;
      //   case 'Enterprise': this.getListWithEnterprise(); break;
      //   case 'Log': this.getListWithLog(); break;
      //   default: this.getListWithProduct();
      // }
    },
    methods: {
      getListWithProduct() {
        var self = this;

        var start = (this.current - 1) * this.size + 1;
        var end = this.current * this.size;

        var whstring = '';
        if (this.filter) {
          whstring += whstring ? ' and ' + this.filter : this.filter;
        }
				var svc='';
        svc = this.$http(self.conname, "QuickFinance.usp_GetDataWithPager");

        svc.AddParam({
          Name: "tableOrView",
          Value: self.tablename,
          DBType: "string"
        });
        svc.AddParam({
          Name: "start",
          Value: start,
          DBType: "int"
        });
        svc.AddParam({
          Name: "end",
          Value: end,
          DBType: "int"
        });
        if (self.order) {
          svc.AddParam({
            Name: "orderby",
            Value: self.order,
            DBType: "string"
          });
        }
        svc.AddParam({
          Name: "where",
          Value: whstring,
          DBType: "string"
        });
        svc.ExecTable().then((ress) => {
          if (ress) {
            let res = {};
            if (this.trustId) {
              res.data = ress.data.filter((item) => {
                return item.TrustId !== Number(this.trustId)
              })
              res.total = ress.total>0?ress.total - 1:ress.total
            }else{
              res = ress
            }
            //console.log(res)
            self.total = parseInt(res.total);
            self.dataloaded(res.data, res.total);
            if (self.loadingswitcher && typeof self.loadingswitcher === 'function') {
              self.loadingswitcher(false);
            }
            self.$emit('tableScroll')
          }
        });
      },
      getListWithIndustry() {
        var self = this;

        var start = (this.current - 1) * this.size + 1;
        var end = this.current * this.size;

        var whstring = '';
        //var whstring = "AliasSet=N'" + this.locale + "'";
        if (this.filter) {
          whstring += whstring ? ' and ' + this.filter : this.filter;
        }
        var svc='';
          svc = this.$http(self.conname, "QuickFinance.usp_GetDataWithPager");

        svc.AddParam({
          Name: "tableOrView",
          Value: self.tablename,
          DBType: "string"
        });
        svc.AddParam({
          Name: "start",
          Value: start,
          DBType: "int"
        });
        svc.AddParam({
          Name: "end",
          Value: end,
          DBType: "int"
        });
        if (self.order) {
          svc.AddParam({
            Name: "orderby",
            Value: self.order,
            DBType: "string"
          });
        }
        svc.AddParam({
          Name: "where",
          Value: whstring,
          DBType: "string"
        });
        svc.ExecTable().then((ress) => {
          if (ress) {
            let res = {};
            if (this.trustId) {
              res.data = ress.data.filter((item) => {
                return item.TrustId !== Number(this.trustId)
              })
              res.total = ress.total>0?ress.total - 1:ress.total
            }else{
              res = ress
            }
            //console.log(res)
            self.total = parseInt(res.total);
            self.dataloaded(res.data, res.total);
            if (self.loadingswitcher && typeof self.loadingswitcher === 'function') {
              self.loadingswitcher(false);
            }
            self.$emit('tableScroll')
          }
        });
      },
      getListWithReport() {
        var self = this;
        var start = (this.current - 1) * this.size + 1;
        var end = this.current * this.size;
        var whstring = '';
        if (this.filter) {
          whstring += whstring ? ' and ' + this.filter : this.filter;
        }
        var svc='';
        svc = this.$http(self.conname, "QuickFinance.usp_GetDataWithPager");

        svc.AddParam({
          Name: "tableOrView",
          Value: self.tablename,
          DBType: "string"
        });
        svc.AddParam({
          Name: "start",
          Value: start,
          DBType: "int"
        });
        svc.AddParam({
          Name: "end",
          Value: end,
          DBType: "int"
        });
        if (self.order) {
          svc.AddParam({
            Name: "orderby",
            Value: self.order,
            DBType: "string"
          });
        }
        svc.AddParam({
          Name: "where",
          Value: whstring,
          DBType: "string"
        });
        svc.ExecTable().then((ress) => {
          if (ress) {
            let res = {};
            if (this.trustId) {
              res.data = ress.data.filter((item) => {
                return item.TrustId !== Number(this.trustId)
              })
              res.total = ress.total>0?ress.total - 1:ress.total
            }else{
              res = ress
            }
            //console.log(res)
            self.total = parseInt(res.total);
            self.dataloaded(res.data, res.total);
            if (self.loadingswitcher && typeof self.loadingswitcher === 'function') {
              self.loadingswitcher(false);
            }
            self.$emit('tableScroll')
          }
        });
      },
      getListWithUser() {
        var self = this;

        var start = (this.current - 1) * this.size + 1;
        var end = this.current * this.size;

        var whstring = '';
        //var whstring = "AliasSet=N'" + this.locale + "'";
        if (this.filter) {
          whstring += whstring ? ' and ' + this.filter : this.filter;
        }
        var svc='';

        svc = this.$http(self.conname, "QuickFinance.usp_GetDataWithPager");
        svc.AddParam({
          Name: "tableOrView",
          Value: self.tablename,
          DBType: "string"
        });
        svc.AddParam({
          Name: "start",
          Value: start,
          DBType: "int"
        });
        svc.AddParam({
          Name: "end",
          Value: end,
          DBType: "int"
        });
        if (self.order) {
          svc.AddParam({
            Name: "orderby",
            Value: self.order,
            DBType: "string"
          });
        }
        svc.AddParam({
          Name: "where",
          Value: whstring,
          DBType: "string"
        });
        svc.ExecTable().then((ress) => {
          if (ress) {
            let res = {};
            if (this.trustId) {
              res.data = ress.data.filter((item) => {
                return item.TrustId !== Number(this.trustId)
              })
              res.total = ress.total>0?ress.total - 1:ress.total
            }else{
              res = ress
            }
            //console.log(res)
            self.total = parseInt(res.total);
            self.dataloaded(res.data, res.total);
            if (self.loadingswitcher && typeof self.loadingswitcher === 'function') {
              self.loadingswitcher(false);
            }
            self.$emit('tableScroll')
          }
        });
      },
      getListWithRole() {
        var self = this;

        var start = (this.current - 1) * this.size + 1;
        var end = this.current * this.size;

        var whstring = '';
        //var whstring = "AliasSet=N'" + this.locale + "'";
        if (this.filter) {
          whstring += whstring ? ' and ' + this.filter : this.filter;
        }
        var svc='';
        svc = this.$http(self.conname, "QuickFinance.usp_GetDataWithPager");

        svc.AddParam({
          Name: "tableOrView",
          Value: self.tablename,
          DBType: "string"
        });
        svc.AddParam({
          Name: "start",
          Value: start,
          DBType: "int"
        });
        svc.AddParam({
          Name: "end",
          Value: end,
          DBType: "int"
        });
        if (self.order) {
          svc.AddParam({
            Name: "orderby",
            Value: self.order,
            DBType: "string"
          });
        }
        svc.AddParam({
          Name: "where",
          Value: whstring,
          DBType: "string"
        });
        svc.ExecTable().then((ress) => {
          if (ress) {
            let res = {};
            if (this.trustId) {
              res.data = ress.data.filter((item) => {
                return item.TrustId !== Number(this.trustId)
              })
              res.total = ress.total>0?ress.total - 1:ress.total
            }else{
              res = ress
            }
            //console.log(res)
            self.total = parseInt(res.total);
            self.dataloaded(res.data, res.total);
            if (self.loadingswitcher && typeof self.loadingswitcher === 'function') {
              self.loadingswitcher(false);
            }
            self.$emit('tableScroll')
          }
        });
      },
      getListWithEnterprise() {
        var self = this;

        var start = (this.current - 1) * this.size + 1;
        var end = this.current * this.size;

        var whstring = '';
        //var whstring = "AliasSet=N'" + this.locale + "'";
        if (this.filter) {
          whstring += whstring ? ' and ' + this.filter : this.filter;
        }
        var svc='';

        svc = this.$http(self.conname, "QuickFinance.usp_GetDataWithPager");

        // svc.AddParam({tableOrView: "'"+self.tablename+"'"});
        // svc.AddParam({start:start});
        // svc.AddParam({end:end});
        // svc.AddParam({orderby:''});
        // svc.AddParam({where:''});
        // svc.AddParam({login_user:'0'});

        svc.AddParam({
          Name: "tableOrView",
          Value: self.tablename,
          DBType: "string"
        });
        svc.AddParam({
          Name: "start",
          Value: start,
          DBType: "int"
        });
        svc.AddParam({
          Name: "end",
          Value: end,
          DBType: "int"
        });
        if (self.order) {
          svc.AddParam({
            Name: "orderby",
            Value: '',
            DBType: "string"
          });
        }
        svc.AddParam({
          Name: "where",
          Value: '',
          DBType: "string"
        });
        svc.AddParam({
          Name: 'login_user',
          Value: '0',
          DBType: 'string',
        });
        svc.AddParam({
          Name: 'total',
          Value: '0',
          DBType: 'int',
          IsOutput: true,
          Size: 100
        });
        svc.ExecTable().then((ress) => {
          if (ress) {
            let res = {};
            if (this.trustId) {
              res.data = ress.data.filter((item) => {
                return item.TrustId !== Number(this.trustId)
              })
              res.total = ress.total>0?ress.total - 1:ress.total
            }else{
              res = ress
            }
            //console.log(res)
            self.total = parseInt(res.total);
            self.dataloaded(res.data, res.total);
            if (self.loadingswitcher && typeof self.loadingswitcher === 'function') {
              self.loadingswitcher(false);
            }
            self.$emit('tableScroll')
          }
        });
      },
      getListWithLog() {
        var self = this;

        var start = (this.current - 1) * this.size + 1;
        var end = this.current * this.size;

        var whstring = '';
        //var whstring = "AliasSet=N'" + this.locale + "'";
        if (this.filter) {
          whstring += whstring ? ' and ' + this.filter : this.filter;
        }
        var svc='';

        svc = this.$http(self.conname, "QuickFinance.usp_GetDataWithPager");

        svc.AddParam({
          Name: "tableOrView",
          Value: self.tablename,
          DBType: "string"
        });
        svc.AddParam({
          Name: "start",
          Value: start,
          DBType: "int"
        });
        svc.AddParam({
          Name: "end",
          Value: end,
          DBType: "int"
        });
        if (self.order) {
          svc.AddParam({
            Name: "orderby",
            Value: self.order,
            DBType: "string"
          });
        }
        svc.AddParam({
          Name: "where",
          Value: whstring,
          DBType: "string"
        });
        svc.AddParam({
          Name: 'total',
          Value: '0',
          DBType: 'int',
          IsOutput: true,
          Size: 100
        });
        if(self.needUserName){
          svc.AddParam({
            Name: "UserName",
            Value: self.userName,
            DBType: "string"
          });
        }
        if(self.bondCode.trim()){
          svc.AddParam({
            Name: "ItemValue",
            Value: self.bondCode,
            DBType: "string"
          });
        }
        svc.ExecTable().then((ress) => {
          if (ress) {
            let res = {};
            if (this.trustId) {
              res.data = ress.data.filter((item) => {
                return item.TrustId !== Number(this.trustId)
              })
              res.total = ress.total>0?ress.total - 1:ress.total
            }else{
              res = ress
            }
            //console.log(res)
            self.total = parseInt(res.total);
            self.dataloaded(res.data, res.total);
            if (self.loadingswitcher && typeof self.loadingswitcher === 'function') {
              self.loadingswitcher(false);
            }
            self.$emit('tableScroll')
          }
        });
      },
      pageSizeChange(size) {
        if (this.loadingswitcher && typeof this.loadingswitcher === 'function') {
          this.loadingswitcher(true);
        }
        this.size = size;
        this.current = 1;
        this.getListWithPager();
      },
      pageIndexChange(index) {
        if (this.loadingswitcher && typeof this.loadingswitcher === 'function') {
          this.loadingswitcher(true);
        }
        this.current = index;
        this.getListWithPager();
      }
    }
  };

</script>
