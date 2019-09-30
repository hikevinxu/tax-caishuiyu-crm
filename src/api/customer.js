import { fetchGet, fetchPost } from './request'
import qs from 'qs'

/**
 * 需求预审接口 
 * @function intentionReview
 * @type 'Post'
 */
export function intentionReview(params) {
  return fetchPost('/intention/v2/review', params)
}

/**
 * 回访列表接口
 * @function intentionReturnVisit
 * @type 'Post'
 */
export function intentionReturnVisit(params) {
  return fetchPost('intention/v2/returnVisit', params)
}

/**
 * 回访需求详情接口
 * @function intentionDetail
 * @type 'Post'
 */
export function intentionDetail(params) {
  return fetchPost('/intention/v2/detail', params)
}

/**
 * 客服个人绩效详情
 * @function performancePersonDetail
 * @type 'Get'
 */
export function performancePersonDetail(params) {
  return fetchGet('/performance/person/detail', params)
}

/**
 * 客服个人绩效列表（统计）
 * @function performancePersonIndex
 * @type 'post'
 */
export function performancePersonIndex(params) {
  return fetchPost('/performance/person/index', params)
}