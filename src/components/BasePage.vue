<style lang="scss">
    .page-wrap{
        display: flex;
        flex-direction: column;
        flex: 1;
        .page-header{
            position: relative;
            padding: 6px 15px 10px 15px;
            margin: -15px -15px 0 -15px;
            background-color: #fff;
            border-bottom: 1px solid #dfe3ea;
            .page-header-bg{
                position: absolute;
                top: 0;
                right: 0;
                left: 0;
                bottom: 0;
                overflow: hidden;
                > img{
                    position: absolute;
                    top: -15px;
                    right: 60px;
                    width: 145px;
                    z-index: 2;
                    opacity: .4;
                    &.gray{
                        opacity: .25;
                    }
                }
            }
            &.has-tab{
                border-bottom: none;
                padding-bottom: 0;
                .page-header-bg{
                    bottom: -30px;
                }
            }
            .page-row{
                height: 40px;
                .page-title{
                    font-size: 18px;
                    margin: 0;
                    color: $--color-black;
                }
            }
            .page-description{
                width: 75%;
                margin-bottom: 5px;
                .description-detail{
                    line-height: 1.5;
                    color: #999;
                }
            }
        }
        .page-header-tab.el-tabs--top{
            margin-left: -15px;
            margin-right: -15px;
            -webkit-box-flex: 1;
            -ms-flex: 1;
            flex: 1;
            min-height: 0;
            display: -webkit-box;
            display: -ms-flexbox;
            display: flex;
            -webkit-box-orient: vertical;
            -webkit-box-direction: normal;
            -ms-flex-direction: column;
            flex-direction: column;
            position: relative;
            > .el-tabs__header.is-top{
                padding-left: 20px;
                padding-right: 15px;
                margin: 0;
                background-color: #fff;
                //border-top: none;
                border-bottom: 1px solid #dfe3ea;
                > .el-tabs__nav-wrap::after{
                    background-color: transparent;
                }

                .el-tabs__item{
                    font-weight: normal;
                    height: 34px;
                    line-height: 28px;
                    color: #555;
                    &:hover{
                        color: $--color-primary;
                    }
                    &.is-active{
                        font-weight: 500;
                        color: $--color-primary;
                    }
                }
            }
            > .el-tabs__content{
                overflow: auto;
                -webkit-box-flex: 1;
                -ms-flex: 1;
                flex: 1;
                min-height: 0;
                display: -webkit-box;
                display: -ms-flexbox;
                display: flex;
                overflow-x: hidden;
                -webkit-box-orient: vertical;
                -webkit-box-direction: normal;
                -ms-flex-direction: column;
                flex-direction: column;
                position: absolute;
                top: 34px;
                left: 0;
                bottom: 0;
                right: 0;
                > .el-tab-pane{
                    padding: 15px;
                    box-sizing: border-box;

                }
            }
        }
        .page-content{
            display: flex;
            flex: 1;
            flex-direction: column;
            margin-left: -15px;
            margin-right: -15px;
            padding: 15px;
            overflow: auto;
        }
        .data-grid{
            margin-bottom: 0!important;
        }
    }
</style>
<template>
    <div class="page-wrap">
        <div class="page-header" v-if="title!==''" :class="{'has-tab':activeTab}">
            <div class="page-header-bg" v-if="description && showDesc">
                <img v-if="activeTab" src="@/assets/images/extraImg_02.png" alt="" class="gray">
                <img v-else src="@/assets/images/extraImg_01.png" alt="">
            </div>
            <el-row v-if="title" type="flex" justify="space-between" align="middle" class="page-row">
                <el-col>
                    <h3 class="page-title">
                        {{title}}
                    </h3>
                </el-col>
                <el-col class="text-right">
                    <slot name="page-header-right"></slot>
                </el-col>
            </el-row>
            <div class="page-description" v-if="description && showDesc">
                <div class="description-detail">
                    {{description}}
                </div>
            </div>
        </div>
        <el-tabs v-if="activeTab && !isDynamicTab"
                 v-model="activeName"
                 class="page-header-tab"
                 @tab-click="handleTabClick">
            <slot name="tab-content"></slot>
        </el-tabs>
        <dynamic-tab v-else-if="isDynamicTab"></dynamic-tab>
        <div v-if="!activeTab" class="page-content">
            <slot></slot>
        </div>
    </div>
</template>

<script>
    import DynamicTab from './common/DynamicTab.vue';
    export default {
        name: "BasePage",
        props: {
            // 页面标题
            title: {
                type: String,
                default: ''
            },
            // 页面描述
            description: String,
            // 焦点TAB
            activeTab: String,
            // 面包屑
            breadcrumb: {
                type: Array,
                default: () => []
            },
            // 是否是动态tab
            isDynamicTab:{
                type: Boolean,
                default: false
            },
            // 是否显示文字描述
            showDesc:{
                type: Boolean,
                default: false
            }
        },
        components: {DynamicTab},
        data: () => ({
            activeName: ''
        }),
        watch: {
            activeTab(v) {
                this.activeName = v;
            }
        },
        methods: {
            handleTabClick(tab, event) {
                this.$emit('tabClick', tab, event);
            },
        },
        mounted() {
            this.activeName = this.activeTab;
        }
    };
</script>
