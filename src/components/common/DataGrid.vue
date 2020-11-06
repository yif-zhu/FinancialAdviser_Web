<template>
  <div class="data-grid" :class="{'data-grid--fixed':isFixed}">
    <tool-bar :title="title" :showFilter="showFilter" ref="data-grid-toolbar" v-if="showFilter">
      <template slot="tool-filter">
          <slot name="toolbar-filter"></slot>
      </template>
      <template slot="tool-right">
          <slot name="toolbar-right"></slot>
      </template>
    </tool-bar>
    <el-table :data="gridData" v-show="showTable" v-bind="$attrs" v-on="$listeners"
      v-loading="loading" :height="tableHeight" @selection-change="handleSelectionChange"
      @sort-change="handleSortChange" size="mini" ref="table">
      <slot name="table-column"></slot>
    </el-table>
    <template v-if="conName && tableName">
      <div class="grid-pager-control" v-show="showPager">
        <pager :conname="conName" :procname="procName" :tablename="tableName" :order="order" :dataloaded="loadGridData" :trustId="trustId"
          :loadingswitcher="loadingSwitcher":needUserName="needUserName" :filter="filter" :pageSize="pageSize" ref="pager"
          @tableScroll="tableScroll">
        </pager>
      </div>
    </template>
    <template v-else>
      <slot name="pager"></slot>
    </template>
  </div>
</template>

<script>
  import ToolBar from './ToolBar.vue';
  import Pager from './Pager.vue';
  export default {
    name: "DataGrid",
    inheritAttrs: false,
    props: {
      // data-table 参数
      // 固定高度（基于当前页面高度固定）
      isFixed: {
        type: Boolean,
        default: false
      },
      // toolbar 参数
      title: {
          type: String,
          default: ''
      },
      // pager 参数）
      conName: String,
      procName:String,
      tableName: String,

      order: String,

      filter: String,

			needUserName:{
				type: Boolean,
				default: false
      },
      bondCode:{
        type:String,
        default:''
      },
      showFilter:{
          type: Boolean,
          default: false
      },
      // table 参数 (不通过pager组件去取数据，直接给表格填充数据)
      data: {
        type: Array,
        default: function () {
          return [];
        }
      },

      height: [String, Number],

      showHeader: {
        type: Boolean,
        default: true
      },

      showTable: {
        type: Boolean,
        default: true
      },

      // 显示分页 默认显示
      showPager: {
        type: Boolean,
        default: true
      },
      pageSize: {
        type: Number,
        default: 20
      },
      //是否允许多选
      multiSelection: {
        type: Boolean,
        default: false
      },
      //是否显示loading
      showLoading: {
        type: Boolean,
        default: true
      },
      trustId:{
        type: [Number,String],
        default: 0
      }
    },
    components: {
      Pager,ToolBar
    },
    data: () => ({
      gridData: [],
      loading: true,
    }),
    computed: {
      tableHeight() {
        return (this.height) ? this.height : this.isFixed ? 'auto' : undefined;
      }
    },
    watch: {
      data(v) {
        if (v && Array.isArray(v)) {
          this.gridData = v;
        }
        this.$emit('listDataChanged', v);
        this.loading = false;
      }
    },
    methods: {
      tableScroll() {
        this.$refs.table.bodyWrapper.scrollTop = 0
      },
      loadGridData(data) {
        this.gridData = data;
        this.$emit('listDataChanged', data);
      },
      loadingSwitcher(isDisplay) {
        this.loading = isDisplay;
      },
      // 对Element @selection-change 事件的封装，
      // 在使用时，建议使用此方式 @selectionChange
      handleSelectionChange(data) {
        if (this.multiSelection) {
          this.$emit('selectionChange', data);
        } else {
          if (data.length > 1) {
            this.$emit('selectionChange', data.splice(1, 1));
            this.$refs.table.toggleRowSelection(data[0])
          } else {
            this.$emit('selectionChange', data);
          }
        }
      },
      handleSortChange(sorter) {
        if (!sorter.prop || !sorter.order) {
          this.$emit('sortChange', null);
          return;
        }
        let order = ' asc';
        if (sorter.order === 'descending') {
          order = ' desc';
        }

        let targetOrder = sorter.prop + order;
        if (targetOrder === this.order) {
            return;
        }
        this.$emit('sortChange', targetOrder);
      },
      // 刷新数据
      refresh() {
        this.$refs.pager.getListWithPager();
      },
      clearSelection() {
        this.$refs.table.clearSelection();
      }
    },
    mounted() {
      if (this.data) this.gridData = this.data;
      this.loading = this.showLoading;
    }
  };

</script>
