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
 * 完善需求接口new
 * @function serviceUpdate
 * @type 'Post'
 */
export function serviceUpdate(params) {
  return fetchPost('/service/update', params)
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
 * 用户数据编辑
 * @function userSave
 * @type 'Post'
 */
export function userSave(params) {
  return fetchPost('/user/save', params)
}

/**
 * 根据手机号获取商户信息
 * @function merchantGetByPhone
 * @type 'get'
 */
export function merchantGetByPhone(params) {
  return fetchGet('/merchant/getByPhone', params)
}

/**
 * 需求分发接口new
 * @function intentionDistribute
 * @type 'Post'
 */
export function intentionDistribute(params) {
  return fetchPost('/intention/v2/distribute', params)
}

/**
 * 需求一键分发接口new
 * @function intentionDistributeGroup
 * @type 'Post'
 */
export function intentionDistributeGroup(params) {
  return fetchPost('/intention/v2/distributeGroup', params)
}

/**
 * 查询操作员列表
 * @function opUserIndex
 * @type 'Post'
 */
export function opUserIndex(params) {
  return fetchPost('/opUser/index', params)
}
