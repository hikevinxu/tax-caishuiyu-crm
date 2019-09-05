import { fetchGet, fetchPost } from './request'

/**
 * 获取省份列表
 * @function addressProvinces
 * @type 'get'
 */
export function addressProvinces() {
  return fetchGet('/address/provinces')
}

/**
 * 获取城市列表
 * @function addressCitys
 * @type 'get'
 * @param provinceCode String 省份code
 */
export function addressCitys(params) {
  return fetchGet('/address/citys', params)
}

/**
 * 获取区县列表
 * @function addressAreas
 * @type 'get'
 * @param provinceCode String 省份code
 * @param cityCode String 城市code
 */
export function addressAreas(params) {
  return fetchGet('/address/areas', params)
}