import { fetchPost, fetchGet } from './request'
import qs from 'qs'

/**
 * 公司信息维护列表
 * @function firmList
 * @type 'post'
 * @param pageNum Number
 * @param pageSize Number
 */
export function firmList(params) {
  return fetchPost('/firm/list', params)
}

/**
 * 公司信息上架
 * @function firmUp
 * @type 'post'
 * @param id Number 公司ID
 */
export function firmUp(params) {
  const paramsString = qs.stringify(params)
  return fetchPost('/firm/up', paramsString)
}

/**
 * 公司信息下架
 * @function firmDown
 * @type 'post'
 * @param id Number 公司ID
 */
export function firmDown(params) {
  const paramsString = qs.stringify(params)
  return fetchPost('/firm/down', paramsString)
}

/**
 * 新增公司信息
 * @function firmSave
 * @type 'post'
 * @param id Number 公司ID
 * @param firmName String 公司名称
 * @param firmAddress String 公司地址
 * @param provinceCode String 公司所属地区省编码
 * @param provinceName String 公司所属地区省名字
 * @param cityCode String 公司所属地区市编码
 * @param cityName String 公司所属地区市名字
 * @param areaCode String 公司所属地区区编码
 * @param areaName String 公司所属地区区名字
 * @param firmContactTell String 公司联系电话
 * @param firmDesc String 公司简介
 * @param lngLat String 公司经纬度
 * @param saveAndUp boolean 保存并上架
 */
export function firmSave(params) {
  return fetchPost('/firm/save', params)
}

/**
 * 删除公司信息
 * @function hotDelete
 * @type 'post'
 * @param id Number 公司ID
 */
export function firmDelete(params) {
  const paramsString = qs.stringify(params)
  return fetchPost('/firm/delete', paramsString)
}

/**
 * 获取公司信息
 * @function firmDetail
 * @type 'post'
 * @param id Number 公司ID
 */
export function firmDetail(params) {
  return fetchGet('/firm/detail', params)
}

/**
 * 服务类目选择列表
 * @function businessTypeList
 * @type 'get'
 */
export function businessTypeList() {
  return fetchGet('/firm/business_type/list')
}
