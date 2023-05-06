import * as React from "react";
import userStore from "./user.Store";
const {default: loginStore } = require("./login.Store");
const { useContext } = require("react");
class RootStore {
  constructor() {
    this.loginStore = loginStore;
    this.userStore=userStore
  }
}
const rootStore = new RootStore();

const context = React.createContext(rootStore);

const useStore = () => useContext(context);

export default useStore;