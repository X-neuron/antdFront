import { useState } from "react";
import { createModel } from "hox";


const useLogin = () => {
  const [login, setLogin] = useState({
    role: null,
    userId: null,
    userName: null,
    isLogin: false,
    token: null,
    ssKey: null
  }); // 可默认读取cookie 或者localStorage

  const changeLogin = (newState) => {
    setLogin({
      ...login.current,
      ...newState
    })
  }

  return { login, changeLogin };
}

export default createModel(useLogin);
