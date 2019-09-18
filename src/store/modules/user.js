import { loginByUsername } from '@/api/login'
import { getToken, setToken, removeToken } from '@/utils/auth'

const user = {
  state: {
    user: '',
    status: '',
    code: '',
    token: getToken(),
    name: '',
    avatar: '',
    introduction: '',
    roles: [],
    permissions: [],
    userRolesPermissions: {},
    setting: {
      articlePlatform: []
    }
  },

  mutations: {
    SET_CODE: (state, code) => {
      state.code = code
    },
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_INTRODUCTION: (state, introduction) => {
      state.introduction = introduction
    },
    SET_SETTING: (state, setting) => {
      state.setting = setting
    },
    SET_STATUS: (state, status) => {
      state.status = status
    },
    SET_NAME: (state, name) => {
      state.name = name
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    },
    SET_PERMISSIONS: (state, permissions) => {
      state.permissions = permissions
    },
    SET_USER_ROLES_PERMISSIONS: (state, userRolesPermissions) => {
      state.userRolesPermissions = userRolesPermissions
    }
  },

  actions: {
    refreshToken({ commit }, token) {
      commit('SET_TOKEN', token)
    },
    // 用户名登录
    LoginByUsername({ commit }, userInfo) {
      const username = userInfo.username.trim()
      return new Promise((resolve, reject) => {
        const params = {
          username: username,
          password: userInfo.password
        }
        loginByUsername(params).then(response => {
          const data = response.data
          commit('SET_TOKEN', data.accessToken)
          commit('SET_NAME', data.authInfo.username)
          // commit('SET_ROLES', data.authInfo.roles)
          // commit('SET_PERMISSIONS', data.permissions)
          // commit('SET_USER_ROLES_PERMISSIONS', data.userRolesPermissions)
          // commit('SET_USER_ROLES_PERMISSIONS', data.permissions)
          localStorage.setItem('SET_USER_ROLES_PERMISSIONS', JSON.stringify(data))
          setToken(response.data.accessToken)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 获取用户信息
    GetUserInfo({ commit, state }) {
      return new Promise((resolve, reject) => {
        console.log(JSON.parse(localStorage.getItem('SET_USER_ROLES_PERMISSIONS')))
        const userMap = {
          admin: {
            roles: JSON.parse(localStorage.getItem('SET_USER_ROLES_PERMISSIONS')).permissions,
            avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
            name: JSON.parse(localStorage.getItem('SET_USER_ROLES_PERMISSIONS')).authInfo.username,
            
          }
        }
        const response = {
          data: userMap.admin
        }
        const data = response.data
        commit('SET_ROLES', data.roles)
        commit('SET_NAME', data.name)
        commit('SET_AVATAR', data.avatar)
        resolve(response)
      })
    },

    // 第三方验证登录
    // LoginByThirdparty({ commit, state }, code) {
    //   return new Promise((resolve, reject) => {
    //     commit('SET_CODE', code)
    //     loginByThirdparty(state.status, state.email, state.code).then(response => {
    //       commit('SET_TOKEN', response.data.token)
    //       setToken(response.data.token)
    //       resolve()
    //     }).catch(error => {
    //       reject(error)
    //     })
    //   })
    // },

    // 登出
    LogOut({ commit, state }) {
      return new Promise((resolve, reject) => {
        commit('SET_TOKEN', '')
        commit('SET_ROLES', [])
        removeToken()
        resolve()
        // logout(state.token).then(() => {
        //   commit('SET_TOKEN', '')
        //   commit('SET_ROLES', [])
        //   removeToken()
        //   resolve()
        // }).catch(error => {
        //   reject(error)
        // })
      })
    },

    // 前端 登出
    FedLogOut({ commit }) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '')
        commit('SET_ROLES', [])
        removeToken()
        resolve()
      })
    }
  }
}

export default user
