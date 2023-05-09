//Login module

import { http, removeToken, setToken } from "../utils";

const { makeAutoObservable, runInAction } = require("mobx");

class LoginStore {
  token = this.getToken || "";
  constructor() {
    //响应式
    makeAutoObservable(this);
  }
  getToken = async ({ mobile, code }) => {
    //调用登录接口
    //验证身份
    const res = await http.post("http://geek.itheima.net/v1_0/authorizations", {
      mobile,
      code,
    });
    console.log("res:" + res.data.token);
    //存入token
    ///mobx中只能在acrion中重新赋值,异步导致赋值操作被加载到队列中,在action外面了,
    // runInAction 函数将赋值操作包裹在action内部
    runInAction(() => {
      this.token = res.data.token;
    });

    setToken(this.token);
  };
  //退出登录
  loginOut = () => {
    this.token = "";
    removeToken();
  };
}

const loginStore = new LoginStore();
export default loginStore;
