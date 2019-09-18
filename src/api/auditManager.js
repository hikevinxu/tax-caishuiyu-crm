import { fetchGet, fetchPost } from './request'
import qs from 'qs'

/**
 * 管理员需求列表接口 
 * @function intentionIndex
 * @type 'Post'
 */
export function intentionIndex(params) {
  return fetchPost('/intention/index', params)
}


/**
 * 新增需求接口 
 * @function intentionSave
 * @type 'Post'
 */
export function intentionSave(params) {
  return fetchPost('/intention/save', params)
}

/**
 * 管理员需求详情接口
 * @function intentionManageDetail
 * @type 'Post'
 */
export function intentionManageDetail(params) {
  return fetchPost('/intention/manage/detail', params)
}

/**
 * 跟进列表
 * @function intentionFollowUp
 * @type 'Get'
 */
export function intentionFollowUp(params) {
  return fetchGet('/intention/followUp', params)
}

/**
 * 添加跟进
 * @function intentionSaveFollowUp
 * @type 'Post'
 */
export function intentionSaveFollowUp(params) {
  return fetchPost('/intention/save/followUp', params)
}

/**
 * 用户数据编辑
 * @function userSave
 * @type 'Post'
 */
export function userSave(params) {
  return fetchPost('/user/save', params)
}


/**
 * 需求分发接口
 * @function intentionDistribute
 * @type 'Post'
 */
export function intentionDistribute(params) {
  return fetchPost('/intention/v1/distribute', params)
}