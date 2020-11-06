<style lang="scss" scoped>
  .advance-filter {
    height: 100%;
    border-right: 1px solid $--color-grey-border;
    &-header {
      height: 39px;
      line-height: 39px;
      border-bottom: 1px solid $--color-grey-border;
      .left{

        i{
          font-size: 14px;
          margin-right: 5px;
          color: $--color-primary;
        }
      }
    }

    .condition{
      line-height: 20px;
      font-size: 12px;
    }
    .clear-condition{
      font-size: 12px;
    }
    .filter-button {
      font-weight: 500;
      color: #777;
      padding: 0;

      i.icon-searchlist {
        font-size: 25px;
        vertical-align: -4px;
      }

      &.is-unfold,
      &:hover {
        color: $--color-primary;
      }
    }

    &-body{
      padding: 10px 10px 10px 20px;
      padding-left: 0;
      font-size: 12px;
      height: calc(100% - 47px);
      overflow: auto;
      padding-right: 0;

      /deep/ >.el-scrollbar {
        height: 100%;
        .el-scrollbar__wrap {
          overflow-x: hidden;
        }
      }
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
      }
    }

    .filter-condition-row {
      margin-bottom: 5px;
      padding-right: 15px;
      &:last-child {
        border-bottom: none;
        padding-bottom: 0;
        margin-bottom: 0;
      }
    }

    .filter-label {
      min-width: 100px;
      font-weight: bold;
      color: $--color-black;
      margin-bottom: 10px;
    }

    .filter-title {
      font-weight: 500;
      font-size: 16px;
      color: grey;
      /*$--color-gray;*/
      display: inline-block;
      margin-right: 10px;
    }

    .filter-tag {
      height: 26px;
      line-height: 24px;
      margin: 0 10px 5px 0;
      padding: 0 10px;
      border-color: $--color-grey-border;
      border-radius: 3px;
      color: $--color-grey;

      &:hover {
        border-color: $--color-primary;
        color: $--color-primary;
        cursor: pointer;
      }

      &.active {
        border-color: $--color-primary;
        color: #fff;
        background-color: $--color-primary;
      }
    }

    .more{
      margin-top: 5px;
      margin-right: 8px;
    }

    .spea-center{
      text-align: center;
      line-height: 26px;
    }

  }

  .loading-preload{
    width: 35%;
    height: 20px;
    margin-bottom: 10px;
    border-radius: 2px;
    &:nth-child(2) {
      width: 60%;
    }
    &:nth-child(3) {
      width: 42%;
    }
  }
  .date-interval{
    /deep/ .el-input--suffix .el-input__inner{
      padding-right: 10px;
    }
  }
</style>
<style lang="scss">
  $--load-color: #e1e3ef;
  $--load-living-color: #e6e8f5;

  /* 数据加载 占位显示效果 */

  .loading {
    background-color: $--load-color;
  }
  .max-width{
    max-width: 300px;
  }
</style>

<template>
  <div class="advance-filter">
    <div class="advance-filter-header">
      <span class="left"><i class="iconfont icon-shaixuan"></i>筛选条件</span>
    </div>
    <div class="advance-filter-body">
      <el-scrollbar>
        <template v-if="fields.length > 0">
          <div class="filter-condition-row">
            <div class="text-center line"  style="font-weight: bold;color: rgba(0,0,0,0.85); margin: 5px 0 10px 0;">企业名称</div>
            <el-input v-model="bondCode" size="mini" @change="handleSearch"
                      clearable placeholder="请输入企业名称"></el-input>

            <div class="filter-label text-ellipsis">所属行业</div>
            <el-select size="mini" v-model="industy" popper-class="max-width" style="width: 100%;" filterable @change="handleSearch">
              <el-option label="全部" value="0"></el-option>
              <el-option v-for="(option, index) in fields" :label="option.TrustName" :value="option.TrustName" :key="index"></el-option>
            </el-select>
            <div class="filter-label text-ellipsis">所属经营机构</div>
            <el-select size="mini" v-model="organ" popper-class="max-width" style="width: 100%;" filterable @change="handleSearch">
              <el-option label="全部" value="0"></el-option>
              <el-option v-for="(option, index) in fields" :label="option.TrustNameShort" :value="option.TrustNameShort" :key="index"></el-option>
            </el-select>
          </div>
        </template>
        <template v-else>
          <!--数据加载效果-->
          <div class="loading-preload loading"></div>
          <div class="loading-preload loading"></div>
          <div class="loading-preload loading"></div>
        </template>
      </el-scrollbar>
    </div>
  </div>
</template>

<script>
  export default {
    name: "EnterpriseFilter",
    props: {
      conName: String,
      templateName: String
    },
    data: () => ({
      advanceFilterUnfold: false,
      fields: [],
      conditionAr:[],
      removeShow:false,
      bondCode:'',
      industy:'',
      organ:'',
    }),
    mounted() {

    },
    created() {
      this.filterOptions = []
      this.tooglePanel()
    },
    methods: {
      compareDate(s1, s2){
        if(s1.indexOf('-') > 0) {
          s1 = s1.replace(/-/g,"\/");
        }else if(!/\/|-/.test(s1)) {
          s1 = s1.slice(0, 4) + '/' + s1.slice(4,6) + '/' + s1.slice(6,8);
        }
        if(s2.indexOf('-') > 0) {
          s2 = s2.replace(/-/g,"\/");
        }else if(!/\/|-/.test(s2)) {
          s2 = s2.slice(0, 4) + '/' + s2.slice(4,6) + '/' + s2.slice(6,8);
        }
        return ((new Date(s1)) > (new Date(s2)));
      },
      loadFiledsAndInit() {
        if (this.conName === undefined || this.templateName === undefined) {
          return;
        }
        var svc = this.$http(this.conName, 'DV.AdvanceFilter_GetSettingByEnterPrise1', true);
        svc.AddParam({
          Name: 'TemplateName',
          Value: this.templateName,
          DBType: 'string'
        });
        svc.ExecTables().then((response) => {
          if (!response || response.length < 1) {
            return;
          }
          this.fields = JSON.parse(JSON.stringify(response[0]));
        });
      },
      formatUIValueChange(field) {
        var chosenTitles = [];
        for (var i = 0, length = field.Options.length; i < length; i++) {
          var option = field.Options[i];
          if (option.Value) {
            //var title = option.Text ? '{0} {1}'.Format(option.Text, option.Value) : option.Value;
            chosenTitles.push(option.Value);
            option.Chosen = true;
          } else {
            option.Chosen = false;
          }
        }
        field.ChosenTitles = chosenTitles;
        this.handleSearch()
      },
      tooglePanel() {
        this.advanceFilterUnfold = !this.advanceFilterUnfold;
        if (this.$parent.isOpenFilter !== undefined) {
          this.$parent.isOpenFilter = this.advanceFilterUnfold;
        }
        if (this.advanceFilterUnfold &&
          this.fields.length === 0 &&
          this.filterOptions.length === 0) {

          this.loadFiledsAndInit();
        }
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
        // // this.advanceFilterUnfold = false;
        if (this.$parent.isOpenFilter !== undefined) {
          this.$parent.isOpenFilter = false;
        }
        // this.$emit('handleSearchCon',this.conditionAr,this.removeShow)
      },
      // 刷新数据
      refresh() {
        this.loadFiledsAndInit();
      }
    },
  };

</script>
