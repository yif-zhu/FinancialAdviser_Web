export default {
  path: '/Enterprise',
  name: 'EnterpriseIndex', // 这里必须与组件名一致
  meta: { title: '产品信息', requiresAuth: true },
  component: () => import('../views/enterprise/Index.vue'),
  redirect: '/Enterprise/EnterpriseList',
  children:[
    {
      path: 'EnterPriseList',
      name: 'EnterPriseIndex', // 这里必须与组件名一致
      meta: { title: '产品信息', requiresAuth: true },
      component: () => import('../views/enterprise/EnterpriseList.vue'),
    },
    {
      path: 'Detail/:id',
      name: 'EnterPriseDetail', // 命名规则 [模块名+文件名]
      meta:{
        title: '产品详情',
        requiresAuth: true
      },
      redirect:'Detail/:id/ProductInformation',
      component: () => import('../views/enterprise/Detail.vue'),
      children:[
        {
          path: 'EnterPriseInformation',
          name: 'EnterPriseInformation', // 命名规则 [模块名+文件名]
          meta:{
            title: '基本信息',
            requiresAuth: true
          },
          component: () => import('../views/enterprise/EnterpriseInformation.vue'),
        },
        {
          path: 'EnterPriseReport',
          name: 'EnterPriseReport', // 命名规则 [模块名+文件名]
          meta:{
            title: '日期信息',
            requiresAuth: true
          },
          component: () => import('../views/enterprise/EnterpriseReport.vue'),
        },
        {
          path: 'financialDataInformation',
          name: 'financialDataInformation', // 命名规则 [模块名+文件名]
          meta:{
            title: '财务数据',
            requiresAuth: true
          },
          component: () => import('../views/enterprise/financialDataInformation.vue'),
          children:[
          ]
        },
      ]

    }
  ]
};
