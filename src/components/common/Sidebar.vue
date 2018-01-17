<template>
    <div class="sidebar">
        <el-menu :default-active="onRoutes" class="el-menu-vertical-demo" theme="dark" unique-opened router>
            <template v-for="item in items">
                <template v-if="item.subs">
                    <el-submenu :index="item.index">
                        <template slot="title"><i :class="item.icon"></i>{{ item.title }}</template>
                        <el-menu-item v-for="(subItem,i) in item.subs" :key="i" :index="subItem.index">{{ subItem.title
                            }}
                        </el-menu-item>
                    </el-submenu>
                </template>
                <template v-else>
                    <el-menu-item :index="item.index">
                        <i :class="item.icon"></i>{{ item.title }}
                    </el-menu-item>
                </template>
            </template>
        </el-menu>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                items: [
                    {
                        icon: 'el-icon-setting',
                        index: 'systemManage',
                        title: '系统管理'
                    },
                    {
                        // icon: 'el-icon-setting',
                        icon: 'iconfont icon-user',
                        index: '',
                        title: '账户角色管理',
                        subs: [
                            {
                                // icon: 'el-icon-setting',
                                index: 'partManage',
                                title: '角色管理'
                            },
                            {
                                // icon: 'el-icon-setting',
                                index: 'userMange',
                                title: '账户管理',
                            }
                        ]
                    },
                    {
                        icon: 'el-icon-document',
                        index: 'newsManage',
                        title: '新闻管理'
                    },
                    {
                        icon: 'el-icon-message',
                        index: 'AnnouncementManage',
                        title: '公告管理'
                    },
                    {
                        icon: 'el-icon-time',
                        index: 'inAbeyanceManage',
                        title: '待办管理'
                    },
                ]
            }
        },
        computed: {
            onRoutes() {
                return this.$route.path.replace('/', '');
            }
        }
    }
</script>

<style scoped>
    .sidebar {
        display: block;
        position: absolute;
        width: 250px;
        left: 0;
        top: 70px;
        bottom: 0;
        background: #2E363F;
    }

    .sidebar > ul {
        height: 100%;
    }
    .iconfont{
        margin-right: 10px;
    }
</style>
