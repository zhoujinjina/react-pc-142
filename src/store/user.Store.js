import { makeAutoObservable } from "mobx";
import { http } from "../utils";

class UserStore{
    userinfo={}
    constructor(){
        makeAutoObservable(this)
    }
    getUserInfo=async()=>{
        //调用接口数据
        const res=await http.get('user/profile')
        this.userinfo=res.data
    }

}
const userStore=new UserStore();
export default userStore