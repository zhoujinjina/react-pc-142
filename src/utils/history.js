import { createBrowserHistory } from "history";
//解决不在组件中不能使用navigate实现跳转
const history=createBrowserHistory()

export {history}