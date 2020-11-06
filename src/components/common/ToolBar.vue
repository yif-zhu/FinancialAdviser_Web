<style lang="scss" scoped>
    .tool-bar{
        position: relative;
        padding: 0 15px;
        height: 45px;
        border-bottom: 1px solid #eee;
        flex-shrink: 0;
        &.has-filter{
            padding-left: 70px;
        }
        .tool-filter{
            position: absolute;
            left: 0;
            top: 0;
            right: 0;
            bottom: 0;
            z-index: 8;
        }
        .tool-inner{
            display: flex;
            align-items: center;
            justify-content: space-between;
        }
        .tool-left{
            display: flex;
            align-items: center;
            height: 45px;
            .tool-title{
                font-size: 16px;
                font-weight: 500;
                color: $--color-black;
                margin-right: 10px;
            }
            .el-select.el-select--small{
                max-width: 150px;
                .el-input--small .el-input__inner{
                    height: 30px;
                    line-height: 30px;
                }
            }
        }
        .tool-right{
            display: flex;
            align-items: center;
            height: 45px;
        }
        .tool-left,.tool-right{
            z-index: 8;
        }
    }
</style>

<template>
    <div class="tool-bar" :class="{'has-filter':showFilter}">
        <div class="tool-filter" v-if="showFilter">
            <slot name="tool-filter"></slot>
        </div>
        <div class="tool-inner" v-show="!isOpenFilter">
            <div class="tool-left">
                <div class="tool-title" v-if="title!==''">{{title}}</div>
                <slot name="tool-left"></slot>
            </div>
            <div class="tool-right">
                <slot name="tool-right"></slot>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "ToolBar",
        props: {
            title:{
                type: [String, Boolean],
                default: '全部'
            },
            showFilter:{
                type: Boolean,
                default: false
            },
        },
        data: () => ({
            isOpenFilter: false
        })
    };
</script>