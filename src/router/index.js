import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/views/layout/Layout'
/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirect in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    roles: ['admin','editor']     will control the page roles (you can set multiple roles)
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
    noCache: true                if true ,the page will no be cached(default is false)
  }
**/
export const constantRouterMap = [
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path*',
        component: () => import('@/views/redirect/index')
      }
    ]
  },
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/auth-redirect',
    component: () => import('@/views/login/authredirect'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/errorPage/404'),
    hidden: true
  },
  {
    path: '/401',
    component: () => import('@/views/errorPage/401'),
    hidden: true
  },
  {
    path: '',
    component: Layout,
    redirect: 'dashboard',
    children: [
      {
        path: 'dashboard',
        component: () => import('@/views/dashboard/index'),
        name: 'Dashboard',
        meta: { title: 'dashboard', icon: 'dashboard', noCache: true }
      }
    ]
  }
]

export default new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})

export const asyncRouterMap = [
  {
    path: '/userManager',
    component: Layout,
    redirect: '/userManager/index',
    name: 'merchants',
    meta: {
      title: '用户管理',
      icon: 'table',
      roles: ['USER_MA', 'ROLE_MA']
    },
    children: [
      {
        path: 'index',
        component: () => import('@/views/userManager/userManager'),
        name: 'userManager',
        meta: { title: '用户管理', noCache: true, roles: ['USER_MA'] }
      },
      {
        path: 'roleManager',
        component: () => import('@/views/userManager/roleManager'),
        name: 'roleManager',
        meta: { title: '角色权限', noCache: true, roles: ['ROLE_MA'] }
      },
      {
        path: 'agentPerformanceData',
        component: () => import('@/views/userManager/agentPerformanceData'),
        name: 'agentPerformanceData',
        hidden: true,
        meta: { title: '客服绩效', noCache: true, roles: ['CUSTOMER_PER'] }
      },
      {
        path: 'detail',
        component: () => import('@/views/userManager/performanceDetail'),
        name: 'userManagerPerformanceDetail',
        hidden: true,
        meta: { title: '绩效详情', noCache: true, roles: ['CUSTOMER_PER'], path: '/userManager/agentPerformanceData' }
      }
    ]
  },
  {
    path: '/auditManager',
    component: Layout,
    redirect: '/auditManager/demand',
    name: 'auditManager',
    meta: {
      title: '审核管理',
      icon: 'table',
      roles: ['DEMAND_CLUE_POOL']
    },
    children: [
      {
        path: 'demand',
        component: () => import('@/views/auditManager/demandList'),
        name: 'demandList',
        meta: { title: '需求线索池', noCache: true, roles: ['DEMAND_CLUE_POOL'] }
      },
      {
        path: 'merchants',
        component: () => import('@/views/auditManager/merchantsList'),
        name: 'merchantsList',
        hidden: true,
        meta: { title: '商户线索池', noCache: true, roles: ['MERCHANT_CLUES_POOL'] }
      },
      {
        path: 'applyList',
        component: () => import('@/views/auditManager/applyList'),
        name: 'applyList',
        hidden: true,
        meta: { title: '申请列表', noCache: true, roles: ['APPLY_LIST'] }
      },
      {
        path: 'detail',
        component: () => import('@/views/auditManager/demandDetail'),
        name: 'auditManagerDemandDetail',
        hidden: true,
        meta: { title: '需求详情', noCache: true, path: '/auditManager/demand' }
      }
    ]
  },
  {
    path: '/financial',
    component: Layout,
    redirect: '/financial/auditList',
    name: 'financial',
    meta: {
      title: '财务管理',
      icon: 'table'
    },
    hidden: true,
    children: [
      {
        path: 'auditList',
        component: () => import('@/views/financial/auditList'),
        name: 'auditList',
        meta: { title: '审核管理', noCache: true, roles: ['AUDIT_MA'] }
      },
      {
        path: 'auditDetail',
        component: () => import('@/views/financial/auditDetail'),
        name: 'auditDetail',
        meta: { title: '审核详情', noCache: true, roles: ['AUDIT_MA']},
        hidden: true,
      },
      {
        path: 'moneyManagement',
        component: () => import('@/views/financial/moneyManagement'),
        name: 'moneyManagement',
        meta: { title: '资金管理', noCache: true, roles: ['FUNDS_MA'] }
      },
      {
        path: 'moneyDetail',
        component: () => import('@/views/financial/moneyDetail'),
        name: 'moneyDetail',
        meta: { title: '资金详情', noCache: true, roles: ['FUNDS_MA'] },
        hidden: true,
      }
    ]
  },
  {
    path: '/customer',
    component: Layout,
    redirect: '/customer/myPerformance',
    name: 'customer',
    meta: {
      title: '客服管理',
      icon: 'table',
      roles: ['PERSON_PER', 'PRE_AUDIT', 'REVISIT_MA']
    },
    children: [
      {
        path: 'myPerformance',
        component: () => import('@/views/customer/myPerformance'),
        name: 'myPerformance',
        hidden: true,
        meta: { title: '我的业绩', noCache: true, roles: ['PERSON_PER'] }
      },
      {
        path: 'demand',
        component: () => import('@/views/customer/demand'),
        name: 'demand',
        meta: { title: '需求预审', noCache: true, roles: ['PRE_AUDIT'] }
      },
      {
        path: 'review',
        component: () => import('@/views/customer/review'),
        name: 'review',
        meta: { title: '历史回访记录', noCache: true, roles: ['REVISIT_MA'] }
      },
      {
        path: 'reviewTask',
        component: () => import('@/views/customer/reviewTask'),
        name: 'reviewTask',
        meta: { title: '限时回访任务', noCache: true, roles: ['REVISIT_MA'] }
      },
      {
        path: 'reviewDetail',
        component: () => import('@/views/customer/reviewDetail'),
        name: 'reviewDetail',
        hidden: true,
        meta: { title: '回访详情', noCache: true, roles: ['REVISIT_MA'], path: '/customer/review' }
      },
      {
        path: 'taskDetail',
        component: () => import('@/views/customer/reviewTaskDetail'),
        name: 'taskDetail',
        hidden: true,
        meta: { title: '回访详情', noCache: true, roles: ['REVISIT_MA'], path: '/customer/reviewTask' }
      }
    ]
  },
  {
    path: '/customerManager',
    component: Layout,
    redirect: '/customerManager/index',
    name: 'merchants',
    meta: {
      title: '客户管理',
      icon: 'table',
      roles: ['USER_MA', 'ROLE_MA']
    },
    children: [
      {
        path: 'index',
        component: () => import('@/views/customerManager/customerList'),
        name: 'customerList',
        meta: { title: '客户管理列表', noCache: true, roles: ['USER_MA'] }
      },
      {
        path: 'detail',
        component: () => import('@/views/customerManager/customerManager'),
        name: 'customerManager',
        hidden: true,
        meta: { title: '客户详情', noCache: true, roles: ['USER_MA'], path: '/customerManager/index' }
      }
    ]
  },
  { path: '*', redirect: '/404', hidden: true }
]
