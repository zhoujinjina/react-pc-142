import * as React from "react";
import userStore from "./user.Store";
import channelStore from "./channel.Store";
const {default: loginStore } = require("./login.Store");
const { useContext } = require("react");
class RootStore {
  constructor() {
    this.loginStore = loginStore;
    this.userStore=userStore
    this.channelStore=channelStore
  }
}
const rootStore = new RootStore();
// 用context包裹，但是没有privider，使用时会找到初始值
const context = React.createContext(rootStore);

const useStore = () => useContext(context);

export default useStore;
