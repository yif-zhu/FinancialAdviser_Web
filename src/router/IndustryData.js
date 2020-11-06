export default {
  path: '/IndustryData',
  name: 'IndustryDataIndex', // 这里必须与组件名一致
  meta: { title: '产品信息', requiresAuth: true },
  component: () => import('../views/IndustryData/Index.vue'),
  redirect: '/IndustryData/IndustryDataList',
  children:[
    {
      path: 'IndustryDataList',
      name: 'IndustryDataIndex', // 这里必须与组件名一致
      meta: { title: '产品信息', requiresAuth: true },
      component: () => import('../views/IndustryData/IndustryDataList.vue'),
    },
    {
      path: 'Detail/:id',
      name: 'ProductDetail', // 命名规则 [模块名+文件名]
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
