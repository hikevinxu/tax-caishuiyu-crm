import { asyncRouterMap, constantRouterMap } from '@/router'
import Layout from '@/views/layout/Layout'
import { advertPositionList } from '@/api/adManager'

/**
 * 通过meta.role判断是否与当前用户权限匹配
 * @param roles
 * @param route
 */
function hasPermission(roles, route) {
  if (route.meta && route.meta.roles) {
    return roles.some(role => route.meta.roles.includes(role))
  } else {
    return true
  }
}

/**
 * 递归过滤异步路由表，返回符合用户角色权限的路由表
 * @param routes asyncRouterMap
 * @param roles
 */
function filterAsyncRouter(routes, roles) {
  const res = []
  routes.forEach(route => {
    const tmp = { ...route }
    if (hasPermission(roles, tmp)) {
      if (tmp.children) {
        tmp.children = filterAsyncRouter(tmp.children, roles)
      }
      res.push(tmp)
    }
  })

  return res
}

const permission = {
  state: {
    routers: constantRouterMap,
    addRouters: []
  },
  mutations: {
    SET_ROUTERS: (state, routers) => {
      state.addRouters = routers
      state.routers = constantRouterMap.concat(routers)
    }
  },
  actions: {
    GenerateRoutes({ commit }, data) {
      return new Promise(resolve => {
        const { roles } = data
        let accessedRouters
        if (roles.includes('admin')) {
          try {
            // 以下是 动态 获取的 路由
            advertPositionList().then(res => {
              if(res.code == 0){
                let arr = []
                for(let i=0;i<res.data.length;i++){
                  arr.push({
                    path: 'adPosition' + (i + 1),
                    component: () => import('@/views/Admanager/index.vue'), // Parent router-view
                    name: 'adPosition' + (i + 1),
                    meta: { title: res.data[i].positionName },
                    redirect: '/adManagerList/adPosition' + (i + 1) + '/businessAdManager' + (i + 1) + '-1',
                    children: [
                      {
                        path: 'businessAdManager' + (i + 1) + '-1/params='+ res.data[i].positionNo +',' + res.data[i].elementNum + ','+ res.data[i].elementType + ',' + res.data[i].relateType + ',2',
                        component: () => import('@/views/Admanager/admanagerList/BussinessAdManager.vue'),
                        name: 'adPosition1-1' + (i + 1),
                        meta: { title: '商业广告管理', roles: ['admin'] }
                      },
                      {
                        path: 'fullInfoList' + (i + 1) + '-2/params='+ res.data[i].positionNo +',' + res.data[i].elementNum + ','+ res.data[i].elementType + ',' + res.data[i].relateType,
                        component: () => import('@/views/Admanager/admanagerList/BussinessAdPut.vue'),
                        name: 'adPosition1-2' + (i + 1),
                        meta: { title: '商业广告投放列表', roles: ['admin'] }
                      },
                      {
                        path: 'systemAd' + (i + 1) + '-3/params='+ res.data[i].positionNo +',' + res.data[i].elementNum + ','+ res.data[i].elementType + ',' + res.data[i].relateType + ',1',
                        component: () => import('@/views/Admanager/admanagerList/SystemAdManager.vue'),
                        name: 'adPosition1-3' + (i + 1),
                        meta: { title: '系统默认广告管理', roles: ['admin'] }
                      }
                    ]
                  })
                }
                const nestedRouter = {
                  path: '/adManagerList',
                  component: Layout,
                  redirect: '/adManagerList/adPosition1',
                  name: 'adManagerList',
                  meta: {
                    title: '广告投放',
                    icon: 'table'
                  },
                  children: arr
                }
                asyncRouterMap.splice(1, 0, nestedRouter)
                // 以上是 动态 获取的 路由
                accessedRouters = asyncRouterMap
                commit('SET_ROUTERS', accessedRouters)
                resolve()
              }
            }).catch(err => {
              accessedRouters = asyncRouterMap
              commit('SET_ROUTERS', accessedRouters)
              resolve()
            })
          }
          catch(err) {
            accessedRouters = asyncRouterMap
            commit('SET_ROUTERS', accessedRouters)
            resolve()
          }
        } else {
          accessedRouters = filterAsyncRouter(asyncRouterMap, roles)
          commit('SET_ROUTERS', accessedRouters)
          resolve()
        }
        // commit('SET_ROUTERS', accessedRouters)
        // resolve()
      })
    }
  }
}

export default permission
