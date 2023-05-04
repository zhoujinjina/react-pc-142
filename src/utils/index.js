//先把所有工具函数导出的模块在这里导入
//统一导出
import {http} from "./http"
import {setToken,getToken,removeToken} from "./token"

export {http,setToken,getToken,removeToken}