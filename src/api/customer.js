import { fetchGet, fetchPost } from './request'
import qs from 'qs'

/**
 * 需求预审接口 
 * @function intentionReview
 * @type 'Post'
 */
export function intentionReview(params) {
  return fetchPost('/intention/review', params)
}

/**
 * 回访列表接口
 * @function intentionReturnVisit
 * @type 'Post'
 */
export function intentionReturnVisit(params) {
  return fetchPost('/intention/returnVisit', params)
}

/**
 * 回访需求详情接口
 * @function intentionDetail
 * @type 'Post'
 */
export function intentionDetail(params) {
  return fetchPost('/intention/detail', params)
}
