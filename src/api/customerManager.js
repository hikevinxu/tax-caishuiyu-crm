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
