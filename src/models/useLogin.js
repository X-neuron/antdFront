import { useRef } from 'react';
import { createModel } from 'hox';


const useLogin = () => {
  const login = useRef({
    role:null,
    userId:null,
    userName:null,
    isLogin:false,
    token:null,
    ssKey:null
  }); // 可默认读取cookie 或者localStorage

  const setLogin = (newState) => {
    login.current = {
      ...login.current,
      ...newState
    }
  }

  return [login.current, setLogin];
}

export default createModel(useLogin);
