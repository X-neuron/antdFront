import { useState } from "react";
import { Navigate  } from "react-router-dom";
// import { redirectTo } from '@reach/router';
// import PageLoading from '@/components/PageLoading';
import { stringify } from "qs";
import {  Outlet } from "react-router-dom";
import { loginStateAtom } from '@/atoms/login';
import { useRecoilValue } from 'recoil';



const SecurityLayout = ({ children }) => {
  // const [isReady] = useState(false);
  // const { children, loading, currentUser } = props; // You can replace it to your authentication rule (such as check token exists)
  // 你可以把它替换成你自己的登录认证规则（比如判断 token 是否存在）


  // const isLogin = currentUser && currentUser.userid;
  const login = useRecoilValue(loginStateAtom);
  
  const queryString = stringify({
    redirect: window.location.href,
  });

  // if ((Login.isLogin && loading) || !isReady) {
  //   return <PageLoading />;
  // }

  if (!login.isLogin && window.location.pathname !== "/user/login") {
    return <Navigate to={`/user/login?${queryString}`} replace={true} />;
    // return <Redirect from="window.location.href" to="/user/login" />;
    // redirectTo(`/user/login?${queryString}`);
  }


  return (
    <>
      <Outlet />
    </>
  );
}

export default SecurityLayout;
