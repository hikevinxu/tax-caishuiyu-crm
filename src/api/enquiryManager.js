import { fetchGet, fetchPost } from './request'
import qs from 'qs'

/**
 * 询价单列表
 * @function intentionManageList
 * @type 'Post'
 */
export function intentionManageList(params) {
  return fetchPost('/intention/manage/list', params)
}

/**
 * 询价单列表详情
 * @function intentionManageDetail
 * @type 'Post'
 */
export function enquiryManageDetail(params) {
  return fetchPost('/intention/manage/detail', params)
}

/**
 * 询价单列表详情下一条
 * @function intentionNextManage
 * @type 'Post'
 */
export function intentionNextManage(params) {
  return fetchPost('/intention/next/manage', params)
}
