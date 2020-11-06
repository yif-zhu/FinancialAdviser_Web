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
      <!-- <div v-if="fields.length > 0" class="condition">
        <div v-for="field in fields" :key="field.Title" v-show="field.ChosenTitles.length>0"
             class="chosen-fields">
          <span class="field-titles"><span class="title">{{field.Title}}：</span>{{field.UIFormat?field.ChosenTitles.join(" - "):field.ChosenTitles.join(", ")}}</span>
          <span class="field-remove" v-if="!field.Must" @click="removeFieldChosen(field)">
            <i class="el-icon-close"></i>
          </span>
        </div>
        <span @click="removeAll()" class="colorPrimary ml-15 clear-condition" v-show="removeShow">清除筛选</span>
      </div> -->
      <el-scrollbar>
        <template v-if="fields.length > 0">
          <div v-for="(field,indexs) in fields" :key="field.Title"
               class="filter-condition-row" :class="{'pb-5':field.UIFormat}">
            <div class="filter-label text-ellipsis">
              {{field.Title}}
            </div>
            <div v-if="!field.UIFormat">
              <el-tag v-for="(option,index) in field.Options"
                      @click.native="toogleOptionChosen(field, option)" :class="{active: option.Chosen }"
                      :key="option.Text" class="filter-tag">{{option.Text}} </el-tag>

              <i class="iconfont icon-zhankai cursorP fr colorPrimary more" :class="conditionAr[indexs]?'transformRotate180':''" :title="conditionAr[indexs]?'收起':'展开'" v-if="field.Options.length>100" @click="conditionOpen(indexs)"></i>
            </div>
            <template v-else-if="field.UIFormat === 'select'">
              <el-select size="mini" v-model="field.value" popper-class="max-width" style="width: 100%;" filterable @change="handleSearch">
                <el-option label="全部" value="0"></el-option>
                <el-option v-for="(option, index) in field.Options" :label="option.Text" :value="option.Value" :key="indexs+'-'+index"></el-option>
              </el-select>
            </template>
            <template v-else-if="field.UIFormat === 'date'">
              <el-row class="date-interval">
                <el-col :span="11">
                  <el-date-picker v-model="field.value"
                                  type="date"
                                  size="mini"
                                  placeholder="起始"
                                  style="width: 100%"
                                  @change="handleSearch"
                                  :value-format="'yyyy-MM-dd'">
                  </el-date-picker>
                </el-col>
                <el-col :span="2" class="spea-center">-</el-col>
                <el-col :span="11">
                  <el-date-picker v-model="field.value1"
                                  type="date"
                                  size="mini"
                                  placeholder="终止"
                                  style="width: 100%"
                                  @change="handleSearch"
                                  :value-format="'yyyy-MM-dd'">
                  </el-date-picker>
                </el-col>
              </el-row>
            </template>
            <template v-else v-for="option in field.Options">
              <div class="text-center line" v-if="option.Text">{{option.Text}}</div>
              <div>
                <el-input v-model="option.Value" size="mini" @change="formatUIValueChange(field)"
                          clearable placeholder="请输入查询关键字"></el-input>
              </div>
              <div class="text-center line"  style="font-weight: bold;color: rgba(0, 0, 0, 0.85); margin: 5px 0 10px 0;">证券代码</div>
             <div v-if="field.Field === 'TrustName'">
                <el-input v-model="bondCode" size="mini" @change="formatUIValueChange(field)"
                          clearable placeholder="请输入证券代码"></el-input>
              </div>
            </template>
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
    name: "AdvanceFilter",
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
    }),
    mounted() {

    },
    created() {
      this.filterOptions = []
      this.tooglePanel()
    },
    methods: {
      bondCodeClear() {
        this.bondCode = '';
        this.handleSearch()
      },
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
      removeAll() {

        for (var i = 0; i < this.fields.length; i++) {
          this.fields[i].ChosenTitles = []
          for (var ii = 0; ii < this.fields[i].Options.length; ii++) {
            this.fields[i].Options[ii].Chosen = false;
            if (!this.fields[i].UIFormat) {
              this.fields[i].Options[ii].Chosen = false;
            } else {
              this.fields[i].Options[ii].Value = '';
            }
          }
        }
        this.handleSearch()
      },
      conditionOpen(index) {
        if (!this.conditionAr[index]) {
          this.$set(this.conditionAr,index,true)
        }else{
          this.$set(this.conditionAr,index,false)
        }
        // console.log(this.conditionAr)
      },
      loadFiledsAndInit() {
        if (this.conName === undefined || this.templateName === undefined) {
          return;
        }
        var svc = this.$http(this.conName, 'DV.AdvanceFilter_GetSettingByName', true);
        svc.AddParam({
          Name: 'TemplateName',
          Value: this.templateName,
          DBType: 'string'
        });
        svc.ExecTables().then((response) => {
          if (!response || response.length < 1) {
            return;
          }
          this.filterOptions = JSON.parse(JSON.stringify(response[1]));
          let fields = JSON.parse(JSON.stringify(response[0]));
          fields.map((field) => {
            this.conditionAr.push(false)
            field.ChosenTitles = (field.ChosenTitles) ? field.ChosenTitles.split(';') : [];
            let fieldOptions = this.filterOptions.filter((o) => (o.Field === field.Field));
            if (field.UIFormat === 'select') {
              field.value = '0';
              fieldOptions = fieldOptions.filter(v => v.Text !== null);
            }
            if(field.UIFormat === 'date') {
              field.value = '';
              field.value1 = '';
            }

            fieldOptions.forEach((v) => {
              if (field.UIFormat && field.UIFormat === 'input') {
                v.ValueExpress = v.Value;
                v.Value = '';
              }
            });
            field.Options = fieldOptions;
          });

          this.fields = fields;
        });
      },
      removeFieldChosen(field) {
        let isInput = field.UIFormat;
        for (let i = 0, length = field.Options.length; i < length; i++) {
          if (!isInput) {
            field.Options[i].Chosen = false;
          } else {
            field.Options[i].Value = '';
          }
        }
        field.ChosenTitles = [];
        // console.log(this.fields)
        this.handleSearch()
      },
      toogleOptionChosen(field, option) {
        console.log('d', field);
        if (option.Chosen && field.Must) {
          return;
        }
        if (option.Chosen) {
          for (var i = 0; i < field.ChosenTitles.length; i++) {
            if (field.ChosenTitles[i] == option.Text) {
              field.ChosenTitles.splice(i, 1);
            }
          }
          option.Chosen = false;
        } else {
          if (field.Radio) {
            field.ChosenTitles = [option.Text];
            for (var i = 0, length = field.Options.length; i < length; i++) {
              field.Options[i].Chosen = false;
            }
          } else {
            field.ChosenTitles.push(option.Text);
          }
          option.Chosen = true;
        }
        this.handleSearch()
        this.advanceFilterUnfold = true
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
        var ary = [];var num = 0;
        for (var i = 0, length = this.fields.length; i < length; i++) {
          var fld = this.fields[i];
          if(fld.UIFormat === 'date' && fld.value && fld.value1) {
            if(this.compareDate(fld.value, fld.value1)) {
              this.$message.error('起始日期不能大于终止日期！');
              return;
            }
            ary.push(`(${fld.Field} between '${fld.value}' and '${fld.value1}')`)
          }
          if(fld.UIFormat === 'select' && fld.value !== '0') {
            ary.push(`${fld.Field} = N'${fld.value}'`);
          }
          if (fld.ChosenTitles.length < 1) {
            num++
            continue;
          }
          var optary = [];
          if(fld.UIFormat !== 'date' && fld.UIFormat !== 'select') {
            for (var j = 0, jlen = fld.Options.length; j < jlen; j++) {
              var opt = fld.Options[j];
              if (!opt.Chosen) {
                continue;
              }
              if (!fld.OptionUsing) {
                if (!fld.UIFormat) {
                  if (opt.Value === 'is null') {
                    optary.push('{0} {1}'.Format(fld.Field, opt.Value));
                  } else {
                    if (opt.Value.indexOf(',')>-1) {
                      for (var a = 0; a < opt.Value.split(',').length; a++) {
                        optary.push('{0}=N\'{1}\''.Format(fld.Field, opt.Value.split(',')[a]));
                      }
                    }else{
                      optary.push('{0}=N\'{1}\''.Format(fld.Field, opt.Value));
                    }
                  }
                } else {
                  optary.push(opt.ValueExpress.replace(/#PH#/g, opt.Value));
                }
              } else { //using option value as filter condition directly
                if (opt.Value) {
                  optary.push(opt.Value);
                }
              }
            }
            if (optary.length == 1) {
              ary.push(optary.join(' '));
            } else if (optary.length > 1) {
              var cnct = fld.UIFormat ? ' and ' : ' or ';
              ary.push('(' + optary.join(cnct) + ')');
            }
          }
        }
        if (num == this.fields.length) {
          this.removeShow = false
        }else{
          this.removeShow = true
        }
        this.$emit('handleSearch', ary.join(' and '),this.bondCode);
        // this.advanceFilterUnfold = false;
        if (this.$parent.isOpenFilter !== undefined) {
          this.$parent.isOpenFilter = false;
        }
        this.$emit('handleSearchCon',this.fields,this.removeShow)
      },
      // 刷新数据
      refresh() {
        this.loadFiledsAndInit();
      }
    },
  };

</script>
