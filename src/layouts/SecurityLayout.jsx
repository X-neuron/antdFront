import { useState } from "react";
import { Redirect } from "@reach/router";
// import { redirectTo } from '@reach/router';
// import PageLoading from '@/components/PageLoading';
import { stringify } from "qs";
import useLoginModel from "@/models/useLogin";






const SecurityLayout = ({ children }) => {
  // const [isReady] = useState(false);
  // const { children, loading, currentUser } = props; // You can replace it to your authentication rule (such as check token exists)
  // 你可以把它替换成你自己的登录认证规则（比如判断 token 是否存在）


  // const isLogin = currentUser && currentUser.userid;
  const { login } = useLoginModel();
  const queryString = stringify({
    redirect: window.location.href,
  });

  // if ((Login.isLogin && loading) || !isReady) {
  //   return <PageLoading />;
  // }

  // if (!login.isLogin && window.location.pathname !== "/user/login") {
  //   return <Redirect from="window.location.href" to={`/user/login?${queryString}`} noThrow />;
  //   // return <Redirect from="window.location.href" to="/user/login" />;
  //   // redirectTo(`/user/login?${queryString}`);
  // }


  return children;
}

export default SecurityLayout;
