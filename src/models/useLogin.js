import { useState } from 'react';
import { createModel } from 'hox';

function useLogin() {
  const [isLogin, setIsLogin] = useState();

}

export default createModel(useLogin);
