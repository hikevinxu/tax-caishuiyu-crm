import { fetchGet, fetchPost } from './request'
import qs from 'qs'

/**
 * 客户管理列表
 * @function customerList
 * @type 'Post'
 */
export function customerList(params) {
  return fetchPost('/customer/list', params)
}

/**
 * 客户管理详情
 * @function customerDetail
 * @type 'Post'
 */
export function customerDetail(params) {
  return fetchPost('/customer/detail', params)
}

/**
 * 客户管理详情-查看需求详情
 * @function customerDetailManage
 * @type 'Post'
 */
export function customerDetailManage(params) {
  return fetchPost('/customer/detail/manage', params)
}

/**
 * 客户管理详情-下一条
 * @function customerDetailManage
 * @type 'Post'
 */
export function customerNext(params) {
  return fetchPost('/customer/next', params)
}

/**
 * 创建客户
 * @function userCrmRegister
 * @type 'Post'
 */
export function userCrmRegister(params) {
  return fetchPost('/user/crm/register', params)
}