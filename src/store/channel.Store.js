import { makeAutoObservable, runInAction } from "mobx";
import { http } from "../utils";

class ChannelStore{
    //用来存储列表
    channelList=[]
    constructor(){
        makeAutoObservable(this)
    }
    loadChannelList=async()=>{
        const res=await http.get('channels')
     runInAction(()=>{
        this.channelList=res.data.channels
     })
    }
}
const channelStore=new ChannelStore();
export default channelStore