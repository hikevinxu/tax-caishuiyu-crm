import { fetchGet, fetchPost } from './request'
import qs from 'qs'

/**
 * 需求预审接口 
 * @function intentionManageList
 * @type 'Post'
 */
export function intentionManageList(params) {
  return fetchPost('/intention/manage/list', params)
}

/**
 * 客户管理详情
 * @function intentionManageDetail
 * @type 'Post'
 */
export function intentionManageDetail(params) {
  return fetchPost('/intention/manage/detail', params)
}

/**
 * 客户管理详情
 * @function intentionNextManage
 * @type 'Post'
 */
export function intentionNextManage(params) {
  return fetchPost('/intention/next/manage', params)
}
