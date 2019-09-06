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
      icon: 'table'
    },
    children: [
      {
        path: 'index',
        component: () => import('@/views/userManager/userManager'),
        name: 'userManager',
        meta: { title: '权限管理', noCache: true, roles: ['admin'] }
      },
      {
        path: 'agentPerformanceData',
        component: () => import('@/views/userManager/agentPerformanceData'),
        name: 'agentPerformanceData',
        meta: { title: '客服绩效', noCache: true, roles: ['admin'] }
      },
      {
        path: 'detail',
        component: () => import('@/views/userManager/performanceDetail'),
        name: 'performanceDetail',
        hidden: true,
        meta: { title: '绩效详情', noCache: true, roles: ['admin'], path: '/userManager/agentPerformanceData' }
      }
    ]
  },
  { path: '*', redirect: '/404', hidden: true }
]
