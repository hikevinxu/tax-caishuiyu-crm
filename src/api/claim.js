import { fetchPost, fetchGet } from './request'
import qs from 'qs'

/**
 * 认领企业列表
 * @function claimList
 * @type 'GET'
 * @param pageNum Number
 * @param pageSize Number
 */
export function claimList(params) {
  return fetchGet('/claim/list', params)
}

/**
 * 入驻企业详情
 * @function claimInfo
 * @type 'GET'
 * @param pageNum Number
 * @param pageSize Number
 */
export function claimInfo(params) {
  return fetchPost('/claim/info', params)
}

/**
 * 入驻企业监测
 * @function claimCheck
 * @type 'GET'
 * @param pageNum Number
 * @param pageSize Number
 */
export function claimCheck(params) {
  return fetchPost('/claim/check', params)
}

/**
 * 入驻企业保存
 * @function serviceTagList
 * @type 'POST'
 * @param pageNum Number
 * @param pageSize Number
 */
export function claimSave(params) {
  return fetchPost('/claim/save_update', params)
}

/**
 * 入驻企业修改
 * @function serviceTagList
 * @type 'POST'
 * @param pageNum Number
 * @param pageSize Number
 */
export function claimUpdate(params) {
  return fetchPost('/claim/update', params)
}
