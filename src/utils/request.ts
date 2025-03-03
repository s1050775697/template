import Axios from 'axios'
import { GET_ITEM } from '@/utils/storage'
function dealParams (params: any) {
    if (!params) return null
    // eslint-disable-next-line no-proto
    if (params.__proto__.toString() === '[object FormData]') return params
    if (Array.isArray(params)) return params
    const copyParams = { ...params }
    Object.keys(copyParams).forEach(v => {
        if (typeof copyParams[v] === 'string') {
            copyParams[v] = copyParams[v].trim()
        }
    })
    return copyParams
}

// 创建 axios 实例
const request = Axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    // timeout: 60000 // 请求超时时间
})

request.interceptors.request.use(config => {
    let token = GET_ITEM("token") as string;
    if (token.startsWith('"')) {
        token = JSON.parse(token);
    }
    config.headers['Authorization'] = `Bearer ${token}`
    return config
})

request.interceptors.response.use((response) => {
    return new Promise((resolve, reject) => {
        resolve(response.data)
    })
}, error => {
    if (error.status === 401) {
        location.href="/sign-in"
    }
})

export default request
