import axios from 'axios'
import { Message, MessageBox } from 'element-ui'
import store from '@/store'
import { getToken, setToken } from '@/utils/auth'

// create an axios instance
const service = axios.create({
  baseURL: process.env.BASE_API, // api 的 base_url
  timeout: 150000 // request timeout
})

// 请求拦截
service.interceptors.request.use(
  config => {
    // Do something before request is sent
    if (getToken()) {
      // 让每个请求携带token-- ['X-Token']为自定义key 请根据实际情况自行修改
      config.headers.Authorization = getToken()
    }
    return config
  },
  error => {
    // Do something with request error
    Message({
      message: '系统异常',
      type: 'error',
      duration: 2 * 1000
    })
    Promise.reject(error)
  }
)

// 返回拦截
service.interceptors.response.use(
  res => {
    // 对响应数据做些事
    if (res.status !== 200) {
      Message({
        message: '系统异常',
        type: 'error',
        duration: 2 * 1000
      })
      return Promise.reject(res)
    } else if (res.data.code !== 0) {
      let info = '系统异常'
      if (res.data.code === 10000) {
        MessageBox.confirm('你已被登出，可以取消继续留在该页面，或者重新登录', '确定登出', {
          confirmButtonText: '重新登录',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          store.dispatch('FedLogOut').then(() => {
            location.reload() // 为了重新实例化vue-router对象 避免bug
          })
        })
      }
      if (res.data.msg) {
        info = res.data.msg
      }
      Message({
        message: info,
        type: 'error',
        duration: 2 * 1000
      })
      return Promise.reject(res)
    }
    return Promise.resolve(res)
  },
  error => {
    console.log('err' + error) // for debug
    Message({
      message: error.message,
      type: 'error',
      duration: 2 * 1000
    })
    return Promise.reject(error)
  }
)

// 返回一个Promise(发送post请求)
export function fetchPost(url, params) {
  return new Promise((resolve, reject) => {
    service.post(url, params)
      .then(response => {
        if (response.headers.authorization) {
          setToken(response.headers.authorization)
          store.dispatch('refreshToken', response.headers.authorization)
        }
        resolve(response.data)
      }, err => {
        reject(err)
      })
      .catch((error) => {
        reject(error)
      })
  })
}

// 返回一个Promise(发送get请求)
export function fetchGet(url, param) {
  return new Promise((resolve, reject) => {
    service.get(url, { params: param })
      .then(response => {
        if (response.headers.authorization) {
          setToken(response.headers.authorization)
          store.dispatch('refreshToken', response.headers.authorization)
        }
        resolve(response.data)
      }, err => {
        reject(err)
      })
      .catch((error) => {
        reject(error)
      })
  })
}
