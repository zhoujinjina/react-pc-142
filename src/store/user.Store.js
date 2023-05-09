import { makeAutoObservable, runInAction } from "mobx";
import { http } from "../utils";

class UserStore {
  userinfo = {};
  constructor() {
    makeAutoObservable(this);
  }
  getUserInfo = async () => {
    //调用接口数据
    const res = await http.get("user/profile");
    //mobx中只能在acrion中重新赋值,异步导致赋值操作被加载到队列中,在action外面了,
    // runInAction 函数将赋值操作包裹在action内部
    runInAction(() => {
      this.userinfo = res.data;
    });
  };
}
const userStore = new UserStore();
export default userStore;
