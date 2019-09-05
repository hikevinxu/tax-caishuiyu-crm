import { fetchPost, fetchGet } from './request'
import qs from 'qs'

/**
 * 服务类目列表
 * @function serviceTagList
 * @type 'GET'
 * @param pageNum Number
 * @param pageSize Number
 */
export function serviceTypeList(params) {
  return fetchGet('/serviceType/list/now', params)
}

/**
 * 服务类目详情
 * @function serviceTagList
 * @type 'GET'
 * @param pageNum Number
 * @param pageSize Number
 */
export function serviceTypeInfo(params) {
  return fetchGet('/serviceType/info', params)
}

/**
 * 服务类目保存
 * @function serviceTagList
 * @type 'POST'
 * @param pageNum Number
 * @param pageSize Number
 */
export function serviceTypeSave(params) {
  return fetchPost('/serviceType/save', params)
}

/**
 * 服务类目上架
 * @function serviceTagList
 * @type 'POST'
 * @param pageNum Number
 * @param pageSize Number
 */
export function serviceTypeDown(params) {
  return fetchPost('/serviceType/shelf/down', params)
}

/**
 * 服务类目下架
 * @function serviceTagList
 * @type 'POST'
 * @param pageNum Number
 * @param pageSize Number
 */
export function serviceTypeUp(params) {
  return fetchPost('/serviceType/shelf/up', params)
}

/**
 * 服务类目下降
 * @function serviceTypeDecr
 * @type 'POST'
 * @param pageNum Number
 * @param pageSize Number
 */
export function serviceTypeDecr(params) {
  return fetchPost('/serviceType/sort/decr', params)
}

/**
 * 服务类目上升
 * @function serviceTypeIncr
 * @type 'POST'
 * @param pageNum Number
 * @param pageSize Number
 */
export function serviceTypeIncr(params) {
  return fetchPost('/serviceType/sort/incr', params)
}

/**
 * 服务类目编辑
 * @function serviceTagList
 * @type 'POST'
 * @param pageNum Number
 * @param pageSize Number
 */
export function serviceTypeUpdate(params) {
  return fetchPost('/serviceType/update', params)
}

/**
 * 新业务申请列表
 * @function serviceTagList
 * @type 'POST'
 * @param pageNum Number
 * @param pageSize Number
 */
export function businessList(params) {
  return fetchGet('/apply/business/list', params)
}