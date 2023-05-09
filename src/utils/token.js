//封装ls存取token
const key = "pc-key";

const setToken = (token) => {
  return window.localStorage.setItem(key, token);
};

const getToken = () => {
  return window.localStorage.getItem(key);
};

const removeToken = () => {
  console.log("清除token")
  return window.localStorage.removeItem(key);
};
export{
    setToken,getToken,removeToken
}