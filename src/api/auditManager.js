import { fetchGet, fetchPost } from './request'
import qs from 'qs'

/**
 * 管理员需求列表接口 
 * @function intentionIndex
 * @type 'Post'
 */
export function intentionIndex(params) {
  return fetchPost('/intention/v2/index', params)
}


/**
 * 新增需求接口 
 * @function intentionSave
 * @type 'Post'
 */
// export function intentionSave(params) {
//   return fetchPost('/intention/save', params)
// }

/**
 * 管理员需求详情接口
 * @function intentionManageDetail
 * @type 'Post'
 */
export function intentionManageDetail(params) {
  return fetchPost('/intention/v2/manage/detail', params)
}
