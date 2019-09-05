import { fetchPost, fetchGet } from './request'
import qs from 'qs'

/**
 * 获取banner列表
 * @function systemBannerList
 * @type 'post'
 * @param pageNum Number 页码
 * @param pageSize Number 一页多少条
 * @param status 0(待上架) 1(已上架) -1(已下架)
 */
export function systemBannerList(params) {
  return fetchPost('/system/banner/list', params)
}

/**
 * 新增banner
 * @function systemBannerSave
 * @type 'post'
 */
export function systemBannerSave(params) {
  return fetchPost('/system/banner/save', params)
}

/**
 * 上架banner
 * @function systemBannerPublish
 * @type 'post'
 * @param id String 版本id
 */
export function systemBannerPublish(params) {
  const paramsString = qs.stringify(params)
  return fetchPost('/system/banner/publish', paramsString)
}

/**
 * 下架banner
 * @function systemBannerDown
 * @type 'post'
 * @param id String 版本id
 */
export function systemBannerDown(params) {
  const paramsString = qs.stringify(params)
  return fetchPost('/system/banner/down', paramsString)
}

/**
 * 删除banner
 * @function systemBannerDelete
 * @type 'post'
 * @param id String 版本id
 */
export function systemBannerDelete(params) {
  const paramsString = qs.stringify(params)
  return fetchPost('/system/banner/delete', paramsString)
}

/**
 * 获取热门标签列表
 * @function systemTagList
 * @type 'post'
 * @param pageNum Number 页码
 * @param pageSize Number 一页多少条
 * @param status 0(待上架) 1(已上架) -1(已下架)
 */
export function systemTagList(params) {
  return fetchPost('/system/tag/list', params)
}

/**
 * 新增热门标签
 * @function systemTagSave
 * @type 'post'
 */
export function systemTagSave(params) {
  return fetchPost('/system/tag/save', params)
}

/**
 * 上架热门标签
 * @function systemTagPublish
 * @type 'post'
 * @param id String 版本id
 */
export function systemTagPublish(params) {
  const paramsString = qs.stringify(params)
  return fetchPost('/system/tag/publish', paramsString)
}

/**
 * 下架热门标签
 * @function systemTagDown
 * @type 'post'
 * @param id String 版本id
 */
export function systemTagDown(params) {
  const paramsString = qs.stringify(params)
  return fetchPost('/system/tag/down', paramsString)
}

/**
 * 删除热门标签
 * @function systemTagDelete
 * @type 'post'
 * @param id String 版本id
 */
export function systemTagDelete(params) {
  const paramsString = qs.stringify(params)
  return fetchPost('/system/tag/delete', paramsString)
}

/**
 * 热门城市列表
 * @function hotCityList
 * @type 'get'
 */
export function hotCityList() {
  return fetchGet('/hot_city/list')
}

/**
 * 新增热门城市
 * @function hotCitySave
 * @type 'post'
 * @param provinceName String 省份名字
 * @param provinceCode Number 省份code
 * @param cityCode Number 城市code
 * @param cityName String 城市名字
 * @param sortIndex Number 排序
 */
export function hotCitySave(params) {
  return fetchPost('/hot_city/save', params)
}

/**
 * 删除热门城市
 * @function hotCityDelete
 * @type 'post'
 * @param id String 版本id
 */
export function hotCityDelete(params) {
  const paramsString = qs.stringify(params)
  return fetchPost('/hot_city/delete', paramsString)
}

/**
 * 服务类目选择列表
 * @function businessTypeList
 * @type 'get'
 */
export function businessTypeList(params) {
  return fetchGet('/serviceType/list', params)
}


