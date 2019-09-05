import { fetchPost, fetchGet } from './request'
import qs from 'qs'

/**
 * App商户广告位配置 - 广告位管理列表
 * @function advertPositionList
 * @type 'GET'
 */
export function advertPositionList(params) {
  return fetchGet('/advert/position/list', params)
}

/**
 * App商户广告位配置 - 启用广告位
 * @function advertPositionEnable
 * @type 'GET'
 */
export function advertPositionEnable(params) {
  return fetchGet('/advert/position/enable', params)
}

/**
 * App商户广告位配置 - 禁用广告位
 * @function advertPositionDisable
 * @type 'GET'
 */
export function advertPositionDisable(params) {
  return fetchGet('/advert/position/disable', params)
}

/**
 * 商业广告管理 - 广告位下的管理列表
 * @function advertPositionInfoList
 * @type 'get'
 * @param pageNum 当前页码
 * @param pageSize 	每页条数
 * @param positionNo 广告位置类型
 * @param status 状态
 */
export function advertPositionInfoList(params) {
  return fetchGet('/advert/position/info/list', params)
}

/**
 * 商业广告管理 - 广告位下的管理列表
 * @function advertInfo
 * @type 'get'
 */
export function advertInfo(params) {
  return fetchGet('/advert/info', params)
}

/**
 * 商业广告管理 - 广告主体上架
 * @function advertPublish
 * @type 'get'
 * @param adId String 广告id
 */
export function advertPublish(params) {
  return fetchGet('/advert/publish', params)
}

/**
 * 商业广告管理 - 广告主体下架
 * @function advertUnpublish
 * @type 'get'
 * @param adId String 广告id
 */
export function advertUnpublish(params) {
  return fetchGet('/advert/unpublish', params)
}

/**
 * 商业广告管理 - 广告主体删除
 * @function advertDelete
 * @type 'get'
 * @param adId String 广告id
 */
export function advertDelete(params) {
  return fetchGet('/advert/delete', params)
}

/**
 * 商业广告管理 - 选择投放服务类型
 * @function serviceTypeList
 * @type 'get'
 * @param parentCode String 
 */
export function serviceTypeList(params) {
  return fetchGet('/serviceType/list', params)
}

/**
 * 商业广告管理 - 保存广告信息
 * @function advertDelete
 * @type 'post'
 * @param adId String 广告id
 */
export function advertInfoSave(params) {
  let paramsString = qs.stringify(params)
  return fetchPost('/advert/info/save', paramsString)
}

/**
 * 商业广告管理 - 修改广告信息
 * @function advertInfoUpdate
 * @type 'post'
 * @param adId String 广告id
 */
export function advertInfoUpdate(params) {
  let paramsString = qs.stringify(params)
  return fetchPost('/advert/info/update', paramsString)
}


/**
 * 商业广告投放列表 - 查询广告下完整的投放记录-复杂查询条件
 * @function advertPositionFullinfoList
 * @type 'get'
 * @param adId String 广告id
 */
export function advertPositionFullinfoList(params) {
  return fetchGet('/advert/position/fullinfo/list', params)
}

/**
 * 商业广告投放列表 - 检测广告位-城市-广告类型-时间段下位置是否可用
 * @function advertRecordIndexCheck
 * @type 'get'
 */
export function advertRecordIndexCheck(params) {
  return fetchGet('/advert/record/index/check', params)
}


/**
 * 商业广告管理 - 保存广告投放信息
 * @function advertRecordSave
 * @type 'post'
 * @param adId String 广告id
 */
export function advertRecordSave(params) {
  let paramsString = qs.stringify(params)
  return fetchPost('/advert/record/save', paramsString)
}

/**
 * 商业广告管理 - 保存广告投放信息
 * @function advertRecordUpdate
 * @type 'post'
 */
export function advertRecordUpdate(params) {
  let paramsString = qs.stringify(params)
  return fetchPost('/advert/record/update', paramsString)
}

/**
 * 商业广告管理 - 查询广告下的投放记录
 * @function advertRecordList
 * @type 'post'
 * @param adId String 广告id
 */
export function advertRecordList(params) {
  return fetchGet('/advert/record/list', params)
}

/**
 * 商业广告管理 - 批量上架广告下的投放记录
 * @function advertRecordPublish
 * @type 'post'
 * @param id String 广告id
 */
export function advertRecordPublish(params) {
  return fetchGet('/advert/record/publish', params)
}

/**
 * 商业广告管理 - 批量下架广告下的投放记录
 * @function advertRecordUnpublish
 * @type 'post'
 * @param id String 广告id
 */
export function advertRecordUnpublish(params) {
  return fetchGet('/advert/record/unpublish', params)
}

/**
 * 商业广告管理 - 删除广告下的投放记录
 * @function advertRecordDelete
 * @type 'post'
 * @param id String 广告id
 */
export function advertRecordDelete(params) {
  return fetchGet('/advert/record/delete', params)
}

/**
 * 商业广告投放列表 - 公司搜索
 * @function companySearch
 * @type 'post'
 */
export function companySearch(params) {
  return fetchPost('/company/search', params)
}