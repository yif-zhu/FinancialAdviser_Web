<template>
  <div class="productDetail">
    <div class="contentBox">
      <div class="contentBoxMain">
        <ul class="leftMenu" :class="!aflodS?'noShow':''">
          <li class="title"><span>系统设置</span></li>
          <li>
            <router-link to="UserManage">用户管理
              <i class="iconfont icon-arr-left"></i></router-link>
          </li>
          <li>
            <router-link to="RoleManage">角色管理
              <i class="iconfont icon-arr-left"></i></router-link>
          </li>
          <li>
            <router-link to="Privilege">企业权限
              <i class="iconfont icon-arr-left"></i></router-link>
          </li>
          <li>
            <router-link to="OperateLog">操作日志
              <i class="iconfont icon-arr-left"></i></router-link>
          </li>
        </ul>
        <div class="rightRouter">
          <i class="iconfont icon-Group- aflod" @click="aflodS = !aflodS" :class="!aflodS?'noShow':''" :title="!aflodS?'展开左侧菜单':'收起左侧菜单'"></i>
          <keep-alive>
            <router-view ref="assetPooldisRou"></router-view>
          </keep-alive>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import {mapState, mapMutations} from 'vuex';
import dataGrid from '@/components/common/DataGrid.vue';
import { BasePath } from '@/utils/config.js';
export default {
  data() {
    return {
      listOrder: 'ItemId asc,TrustStartDate asc',
      listFilter:'',
      checkedData:[],
      tableAssetS:false,
      searchProduct:'',
      aflodS:true
    }
  },
  components: {
    dataGrid,
  },
  created() {

  },
  mounted() {
    this.handleScroll()
  },
  computed:{
    ...mapState('productInfo',['productDetail']),
    trustId() {
      return this.$route.params.id;
    },
    AssetType() {
      console.log(this.productDetail)
      return this.productDetail.AssetType
    },

  },
  watch:{
    $route(to,from){
      this.handleScroll()
    },
  },
  beforeRouteUpdate(to,from,next) {
    var box = document.getElementsByClassName('contentBox')[0]
    if (to.name == 'AssetPoolDistributions') {
      box.addEventListener('scroll', this.$refs.assetPooldisRou.listenerFun,true)
    }else{
      console.log('remove')
      box.removeEventListener("scroll", this.$refs.assetPooldisRou.listenerFun, true);
    }
    next()
  },
  methods:{
    ...mapMutations('productInfo',['setProductDetail', 'setTrustId']),
    doListSortChange(orderBy) {
      this.listOrder = orderBy ? orderBy : 'TrustId desc';
    },
    //选中产品
    selectionChange(data){
      console.log(data)
      this.checkedData = data

    },
    row_key(row) {
      //console.log(row)
      return row.TrustId
    },
    handleScroll () {
      this.$nextTick(() => {
        var box = document.getElementsByClassName('contentBox')[0]
        if (document.getElementsByClassName('assetPooldis')[0]) {
          box.addEventListener('scroll', this.$refs.assetPooldisRou.listenerFun,true)
        }else{
          box.removeEventListener("scroll", this.$refs.assetPooldisRou.listenerFun, true);
        }
      })
    },
  }
}
</script>

<style lang="scss" scoped>
.productDetail{
  display: flex;
  flex: 1;
  flex-direction: column;
  padding-left:0;
  border-radius: 3px;
  position: relative;
  height: 100%;
  .baseInfo{
    padding: 10px 20px;
    position: relative;
    background: #f1f2fb url("../../assets/images/info-bg.jpg") no-repeat center;
    border-bottom: 1px solid #e6e9f0;

    .text{
      margin:10px 0;
      span{
        margin-right: 20px;
        color: #444;
        font-size: 12px;
        &.name{
          font-size: 15px;
          font-weight: bold;
          border-right: 1px solid #bbb;
          display: inline-block;
          padding-right: 20px;
        }
        &.datatate{
          font-size: 14px;
        }
      }
    }
  }
  .contentBox{
    flex:1;
    background-color: #fff;
    overflow: auto;
    .contentBoxMain{
      width: 100%;
      display: flex;
      min-height: 100%;
    }
    .leftMenu{
      flex:0 0 210px;
      background-color: #fff;
      max-height:100%;
      border-right: 1px solid $--color-grey-border;
      box-shadow: #f5f9ff 1px 2px 0px 1px;
      padding: 20px;
      &.noShow{
        display: none;
      }
      li{
        text-align: left;
        margin-bottom: 5px;
        &.title{
          padding: 10px 0;
          color: $--color-grey;
          font-size: 13px;
          position: relative;
          &:before{
            display: inline-block;
            content: '';
            width: 55%;
            height: 1px;
            background-color:$--color-grey-border;
            position: absolute;
            right: 0;
            top: 50%;
          }
        }
        a{
          display: inline-block;
          width: 100%;
          padding:8px 15px;
          color: rgba($--color-black, 0.8);
          position: relative;
          &:hover{
            color: $--color-black;
          }
          i{
            font-size:14px;
            position: absolute;
            top: 9px;
            right: 15px;
            display: none;
          }
          &.router-link-exact-active.router-link-active{
            background-color: $--color-grey-border;
            color: $--color-black;
            border-radius: 5px;
            i{
              display: inline-block;
            }
          }
        }
      }
    }
    .rightRouter{
      flex:1;
      width:0;
      position: relative;
      .aflod{
        font-size: 22px;
        color: #5264d9;
        cursor: pointer;
        position: absolute;
        top: 200px;
        left: 0;
        font-weight: bold;
        transform: rotate(90deg);
        animation:move 1s infinite;
        &.noShow{
          transform: rotate(270deg);
        }
      }
    }
  }

}
@keyframes move
{
  0% {opacity: 1;}
  50%{opacity: 0.2;}
  100% {opacity: 1;}
}
/deep/.el-table tr.noShow{
  background-color: #ededed;
  .link{
    color: #bbb;
  }
  .cell{
    color: #bbb;
  }
}
/deep/ .tool-bar .tool-filter{
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
}
</style>
