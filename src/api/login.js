import { fetchPost } from './request'
import qs from 'qs'

/**
 * 登录
 * @function loginByUsername
 * @type 'post'
 * @param username String
 * @param password String
 */
export function loginByUsername(params) {
  return fetchPost('/auth/login', params)
}

/**
 * 退出登录
 * @function logout
 * @type 'post'
 */
export function logout() {
  // return request({
  //   url: '/login/logout',
  //   method: 'post'
  // })
  // return fetchPost('/auth/login_ldap', paramsString)
}
