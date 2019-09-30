import { fetchGet, fetchPost } from './request'

/**
 * 地区编码接口
 * @function addressTrees
 * @type 'get'
 */
export function addressTrees() {
  return fetchGet('/address/trees')
}

/**
 * 获取所有省市列表
 * @function getAddressCityTrees
 * @type 'Get'
 */
export function getAddressCityTrees (params) {
  return fetchGet('/intention/city_trees', params)
}

/**
 * 服务类目列表接口
 * @function intentionTrees
 * @type 'get'
 */
export function intentionTrees() {
  return fetchGet('/intention/trees')
}


/**
 * 服务类目下额外字段列表
 * @function intentionServiceExtend
 * @type 'get'
 */
export function intentionServiceExtend(params) {
  return fetchGet('/intention/service/extend', params)
}

