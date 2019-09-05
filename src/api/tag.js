import { fetchPost, fetchGet } from './request'
import qs from 'qs'

/**
 * 获取标签列表
 * @function serviceTagList
 * @type 'post'
 * @param pageNum Number
 * @param pageSize Number
 */
export function serviceTagList(params) {
  return fetchGet('/serviceTag/list', params)
}

/**
 * 词条下架
 * @function serviceTagShelf
 * @type 'post'
 * @param id Number 词条ID
 * @param up Boolean true(下架) false(下架)
 */
export function serviceTagShelfDisable(params) {
  const paramsString = qs.stringify(params)
  return fetchPost('/serviceTag/shelf/down', paramsString)
}

/**
 * 词条下架
 * @function serviceTagShelfEnable
 * @type 'post'
 * @param id Number 词条ID
 * @param up Boolean true(上架) false(上架)
 */
export function serviceTagShelfEnable(params) {
  const paramsString = qs.stringify(params)
  return fetchPost('/serviceTag/shelf/up', paramsString)
}

/**
 * 词条排序升高
 * @function serviceTagSortIncr
 * @type 'post'
 * @param id Number 词条ID
 * @param up Boolean true(上架) false(下架)
 */
export function serviceTagSortIncr(params) {
  const paramsString = qs.stringify(params)
  return fetchPost('/serviceTag/sort/incr', paramsString)
}

/**
 * 词条排序降低
 * @function serviceTagSortDecr
 * @type 'post'
 * @param id Number 词条ID
 * @param up Boolean true(上架) false(下架)
 */
export function serviceTagSortDecr(params) {
  const paramsString = qs.stringify(params)
  return fetchPost('/serviceTag/sort/decr', paramsString)
}

/**
 * 添加标签
 * @function serviceTagAdd
 * @type 'post'
 * @param word String 词条名称
 */
export function serviceTagAdd(params) {
  return fetchPost('/serviceTag/add', params)
}

/**
 * 编辑标签
 * @function serviceTagUpdate
 * @type 'post'
 * @param word String 词条名称
 */
export function serviceTagUpdate(params) {
  return fetchPost('/serviceTag/update', params)
}

/**
 * 删除词条
 * @function serviceTagDelete
 * @type 'post'
 * @param id Number 词条ID
 */
export function serviceTagDelete(params) {
  const paramsString = qs.stringify(params)
  return fetchPost('/serviceTag/delete', paramsString)
}
