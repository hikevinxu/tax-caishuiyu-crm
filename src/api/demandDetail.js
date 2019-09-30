import { fetchGet, fetchPost } from './request'

/**
 * 结束需求接口
 * @function intentionEndService
 * @type 'Post'
 */
export function intentionEndService(params) {
  return fetchPost('/intention/endService', params)
}

/**
 * 需求转移接口
 * @function intentionTransform
 * @type 'Post'
 */
export function intentionTransform(params) {
  return fetchPost('/intention/transform', params)
}

/**
 * 下一条需求
 * @function intentionNext
 * @type 'Post'
 */
export function intentionNext(params) {
  return fetchPost('/intention/next', params)
}

/**
 * 新增询价单接口
 * @function serviceSaveIntention
 * @type 'Post'
 */
export function serviceSaveIntention(params) {
  return fetchPost('/service/save/intention', params)
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
 * 新增需求接口new
 * @function servicesSave
 * @type 'Post'
 */
export function servicesSave(params) {
  return fetchPost('/service/save', params)
}

/**
 * 根据手机号获取商户信息
 * @function merchantGetByPhone
 * @type 'get'
 */
export function merchantGetByPhone(params) {
  return fetchGet('/merchant/getByPhone', params)
}