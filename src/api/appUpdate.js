import { fetchPost } from './request'
import qs from 'qs'

/**
 * 获取android版本列表
 * @function androidList
 * @type 'post'
 * @param pageNum Number 页码
 * @param pageSize Number 一页多少条
 */
export function androidList(params) {
  return fetchPost('/app/release/android_list', params)
}

/**
 * 获取ios版本列表
 * @function iosList
 * @type 'post'
 * @param pageNum Number 页码
 * @param pageSize Number 一页多少条
 */
export function iosList(params) {
  return fetchPost('/app/release/ios_list', params)
}

/**
 * 撤回新版本
 * @function releaseRecall
 * @type 'post'
 * @param id String 版本id
 */
export function releaseRecall(params) {
  const paramsString = qs.stringify(params)
  return fetchPost('/app/release/recall', paramsString)
}

/**
 * 发布新版本
 * @function releaseRelease
 * @type 'post'
 * @param id String 版本id
 */
export function releaseRelease(params) {
  const paramsString = qs.stringify(params)
  return fetchPost('/app/release/release', paramsString)
}

/**
 * 新建版本
 * @function releaseSave
 * @type 'post'
 * @param deviceType String 终端
 * @param downloadUrl String 下载地址
 * @param forceUpdateVersion String 最低强更版本
 * @param remark String 备注
 * @param updateContent String 更新内容
 * @param appVersion String 新版本号
 * @param channels String 更新渠道
 */
export function releaseSave(params) {
  return fetchPost('/app/release/save', params)
}
