import { fetchPost, fetchGet } from './request'
import qs from 'qs'

/**
 * 获取商户入驻列表
 * @function channelPageObtainPaging
 * @type 'post'
 */
export function channelPageObtainPaging(params) {
  return fetchGet('/api/channelPage/obtainPaging', params)
}

/**
 * 获取商户入驻列表
 * @function channelPageAddition
 * @type 'post'
 */
export function channelPageAddition(params) {
  let paramsString = qs.stringify(params)
  return fetchPost('/api/channelPage/addition', paramsString)
}

/**
 * 获取商户入驻列表
 * @function channelPageCopy
 * @type 'post'
 */
export function channelPageCopy(params) {
  let paramsString = qs.stringify(params)
  return fetchPost('/api/channelPage/copy', paramsString)
} 

/**
 * 获取商户入驻列表
 * @function channelPageObtainDetail
 * @type 'post'
 */
export function channelPageObtainDetail(params) {
  return fetchGet('/api/channelPage/obtainDetail', params)
}

/**
 * 获取商户入驻列表
 * @function channelPageDelete
 * @type 'post'
 */
export function channelPageDelete(params) {
  let paramsString = qs.stringify(params)
  return fetchPost('/api/channelPage/delete', paramsString)
} 

/**
 * 获取商户入驻列表
 * @function channelPageAddition
 * @type 'post'
 */
export function channelPageModify(params) {
  let paramsString = qs.stringify(params)
  return fetchPost('/api/channelPage/modify', paramsString)
}

/**
 * 获取商户入驻列表
 * @function channelPageRecord
 * @type 'get'
 */
export function channelPageRecord(params) {
  return fetchGet('/api/channelPage/record', params)
}
