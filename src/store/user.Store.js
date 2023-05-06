import { makeAutoObservable } from "mobx";

class UserStore{
    constructor(){
        makeAutoObservable(this)
    }

}
const userStore=new UserStore();
export default userStore