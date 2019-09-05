import { fetchPost } from './request'
import qs from 'qs'

/**
 * 获取词条列表
 * @function hotWordList
 * @type 'post'
 * @param pageNum Number
 * @param pageSize Number
 */
export function hotWordList(params) {
  return fetchPost('/hot_word/list', params)
}

/**
 * 词条上下架
 * @function hotStatus
 * @type 'post'
 * @param id Number 词条ID
 * @param up Boolean true(上架) false(下架)
 */
export function hotStatus(params) {
  const paramsString = qs.stringify(params)
  return fetchPost('/hot_word/upOrDown', paramsString)
}

/**
 * 新增词条
 * @function hotSave
 * @type 'post'
 * @param word String 词条名称
 */
export function hotSave(params) {
  return fetchPost('/hot_word/save', params)
}

/**
 * 删除词条
 * @function hotDelete
 * @type 'post'
 * @param id Number 词条ID
 */
export function hotDelete(params) {
  const paramsString = qs.stringify(params)
  return fetchPost('/hot_word/delete', paramsString)
}
