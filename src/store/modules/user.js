import { loginByUsername, userPermissions } from '@/api/login'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { Message } from 'element-ui'

const user = {
  state: {
    user: '',
    userId: localStorage.getItem('userId'),
    status: '',
    code: '',
    token: getToken(),
    name: '',
    avatar: '',
    introduction: '',
    currentRoles: [],
    roles: [],
    permissions: [],
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
    SET_USERID: (state, userId) => {
      state.userId = userId
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
    SET_CURRENT_ROLES: (state, currentRoles) => {
      state.currentRoles = currentRoles
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
          if (response.data.permissions != 0) {
            const data = response.data
            commit('SET_TOKEN', data.accessToken)
            // localStorage.setItem('SET_USER_ROLES_PERMISSIONS', JSON.stringify(data))
            setToken(response.data.accessToken)
            commit('SET_USERID', data.authInfo.id)
            localStorage.setItem('userId', data.authInfo.id)
            resolve()
          } else {
            Message({
              message: '您没有任何权限，请通知管理员修改权限！',
              type: 'error',
              duration: 2 * 1000
            })
          }
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 获取用户信息
    GetUserInfo({ commit, state }) {
      return new Promise((resolve, reject) => {
        userPermissions().then(res => {
          if(res.code == 0) {
            if (res.data.permissions.length == 0) {
              commit('SET_TOKEN', '')
              commit('SET_ROLES', [])
              removeToken()
              resolve()
            }
            const userMap = {
              admin: {
                roles: res.data.permissions,
                avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
                name: res.data.userName,
                currentRoles: res.data.roles
              }
            }
            const response = {
              data: userMap.admin
            }
            const data = response.data
            commit('SET_ROLES', data.roles)
            commit('SET_NAME', data.name)
            commit('SET_AVATAR', data.avatar)
            commit('SET_CURRENT_ROLES', data.currentRoles)
            resolve(response)
          }
        })
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
