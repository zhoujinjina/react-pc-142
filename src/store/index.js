import * as React from "react";
const {default: loginStore } = require("./login.Store");
const { useContext } = require("react");
class RootStore {
  constructor() {
    this.loginStore = loginStore;
  }
}
const rootStore = new RootStore();

const context = React.createContext(rootStore);

const useStore = () => useContext(context);

export default useStore;
