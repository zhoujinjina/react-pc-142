//封装axios
//实例化 请求拦截器  响应拦截器
import axios from "axios";
import { getToken } from "./index";
import { history } from "./history";
import {removeToken}from "./token"
const http=axios.create({
    baseURL: 'http://geek.itheima.net/v1_0',
    timeout: 10000,
})

//添加请求拦截器
http.interceptors.request.use((config)=>{
    //if not login token
    const token=getToken()
    if(token){
        //作为用户标识 http请求头部Authorization字段
        config.headers.Authorization=`Bearer ${token}`
    }
    return config
},(error)=>{
    return Promise.reject(error)
}
)
// 添加响应拦截器
http.interceptors.response.use((response)=> {
    // 2xx 范围内的状态码都会触发该函数。
    // 对响应数据做点什么
    return response.data
  }, (error)=> {
   try {
    if(error.response.status&&error.response.status===401){
        //
        // window.location.href="/login"
         // 删除token
         removeToken()
        history.push('/login')
        }
        // 超出 2xx 范围的状态码都会触发该函数。
        // 对响应错误做点什么
   } catch (error) {
    
   }
        return Promise.reject(error)
})

export { http }