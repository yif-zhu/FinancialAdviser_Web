export default {
  path: '/Admin',
  name: 'AdminIndex', // 这里必须与组件名一致
  meta: {
    title: '系统设置',
    requiresAuth: true
  },
  component: () => import(/* webpackChunkName: "admin" */ '../views/admin/Index.vue'),
  redirect: '/Admin/AdminList',
  children: [{
      path: 'AdminList',
      name: 'AdminDetail', // 这里必须与组件名一致
      meta: {
        title: '系统设置',
        requiresAuth: true
      },
      component: () => import(/* webpackChunkName: "admin" */'../views/admin/Detail.vue'),
      redirect: '/Admin/AdminList/UserManage',
      children: [{
          path: 'UserManage',
          name: 'UserManage', // 命名规则 [模块名+文件名]
          meta: {
            title: '用户管理',
            requiresAuth: true
          },
          component: () => import(/* webpackChunkName: "admin" */'../views/admin/UserManage.vue'),
        },
        {
          path: 'RoleManage',
          name: 'RoleManage', // 命名规则 [模块名+文件名]
          meta: {
            title: '角色管理',
            requiresAuth: true
          },
          component: () => import(/* webpackChunkName: "admin" */'../views/admin/RoleManage.vue'),
        },
        {
          path: 'Privilege',
          name: 'Privilege', // 命名规则 [模块名+文件名]
          meta: {
            title: '企业权限',
            requiresAuth: true
          },
          component: () => import(/* webpackChunkName: "admin" */'../views/admin/Privilege.vue'),
        },
        {
          path: 'OperateLog',
          name: 'OperateLog', // 命名规则 [模块名+文件名]
          meta: {
            title: '操作日志',
            requiresAuth: true
          },
          component: () => import(/* webpackChunkName: "admin" */'../views/admin/OperateLog.vue'),
        },
      ]

    }
  ]
};
