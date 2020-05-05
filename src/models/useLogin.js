import { useState } from 'react';
import { createModel } from 'hox';

function useLogin() {
  const [isLogin, setIsLogin] = useState();


  return {
    isLogin
  }
}

export default createModel(useLogin);
