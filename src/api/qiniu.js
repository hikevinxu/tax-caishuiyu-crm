import { fetchGet, fetchPost } from './request'

export function getToken() {
  return fetchGet('/qiniu/upload/token')
}

export function upLoadPicFromWeApp(params) {
  return fetchPost('/fileupload/upload', params)
}