import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            redirect: '/login'
            // redirect: '/basetable'
        },
        {
            path: '/home',
            component: resolve => require(['../components/common/Home.vue'], resolve),
            redirect: '/newsManage',

            children:[
                {
                    path: '/systemManage',
                    component: resolve => require(['../components/page/systemManage.vue'], resolve)
                },
                {
                    path: '/AnnouncementManage',
                    component: resolve => require(['../components/page/AnnouncementManage.vue'], resolve)
                },
                {
                    path: '/newsManage',
                    component: resolve => require(['../components/page/newsManage.vue'], resolve)    // 拖拽列表组件
                },
                {
                    path: '/inAbeyanceManage',
                    component: resolve => require(['../components/page/inAbeyanceManage.vue'], resolve)    // 拖拽列表组件
                },
                {
                    path: '/partManage',
                    component: resolve => require(['../components/page/partManage.vue'], resolve)    // 拖拽列表组件
                },
                {
                    path: '/userMange',
                    component: resolve => require(['../components/page/userManage.vue'], resolve)    // 拖拽列表组件
                }
            ]
        },
        {
            path: '/login',
            component: resolve => require(['../components/page/Login.vue'], resolve)
        },
    ]
})
