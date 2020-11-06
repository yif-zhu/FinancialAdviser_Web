<template>
    <el-aside width="220px" id="layout-aside" v-if="!isIFrame">
        <el-scrollbar class="height-fill">
            <el-menu :default-active="$route.path" unique-opened>
                <template v-for="item of menu">
                    <template v-if="!item.children">
                        <el-menu-item-group v-if="item.group && item.group.length>0"
                                            v-for="group of item.group"
                                            :key="group.name">
                            <template slot="title">{{group.name}}</template>
                            <el-menu-item v-if="group.children && group.children.length > 0"
                                          v-for="item of group.children"
                                          :key="item.title"
                                          :index="item.path">
                                <router-link :to="item.path">
                                    {{item.title}}
                                </router-link>
                            </el-menu-item>
                        </el-menu-item-group>
                        <el-menu-item v-if="!item.group" :index="item.path">
                            <router-link slot="title" :to="item.path">
                                <i v-if="item.icon" :class="item.icon"></i>
                                <span>{{item.title}}</span>
                            </router-link>
                        </el-menu-item>
                    </template>
                    <el-submenu v-else :index="item.title">
                        <template slot="title">
                            <router-link v-if="item.path" :to="item.path">
                                <i v-if="item.icon" :class="item.icon"></i>
                                <span v-text="item.title"></span>
                            </router-link>
                            <template v-else>
                                <i v-if="item.icon" :class="item.icon"></i>
                                <span v-text="item.title"></span>
                            </template>
                        </template>
                        <template v-for="child of item.children">
                            <el-menu-item-group v-if="child.group && child.group.length>0"
                                                v-for="group of child.group"
                                                :key="group.name">
                                <template slot="title">{{group.name}}</template>
                                <el-menu-item v-if="group.children && group.children.length > 0"
                                              v-for="item of group.children"
                                              :key="item.title"
                                              :index="item.path">
                                    <router-link :to="item.path">
                                        {{item.title}}
                                    </router-link>
                                </el-menu-item>
                            </el-menu-item-group>
                            <el-submenu v-if="child.children" :index="child.title">
                                <template slot="title">
                                    <router-link v-if="child.path" :to="child.path">
                                        {{child.title}}
                                    </router-link>
                                    <template v-else>
                                        {{child.title}}
                                    </template>
                                </template>
                                <el-menu-item v-for="item of child.children"
                                              :key="item.title"
                                              :index="item.path">
                                    <router-link :to="item.path">
                                        {{item.title}}
                                    </router-link>
                                </el-menu-item>
                            </el-submenu>
                            <el-menu-item v-if="!child.children && !child.group" :index="child.path">
                                <router-link :to="child.path">
                                    {{child.title}}
                                </router-link>
                            </el-menu-item>
                        </template>
                    </el-submenu>
                </template>
            </el-menu>
        </el-scrollbar>
    </el-aside>
</template>

<script>
    // 暂只支持三级菜单 ，后续有需求再做递归
    export default {
        name: "BaseAside",
        props:{
          menu: {
              type: Array,
              default: () => []
          }
        },
        computed: {
            isIFrame() {
                return this.$store.state.isIFrame;
            }
        }
    };
</script>
