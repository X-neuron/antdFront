import { Suspense } from "react";
import { useRoutes } from "react-router-dom";
// import { setConfig } from 'react-hot-loader';

import { useFavicon,useMount} from "ahooks";
import { useRecoilValue,useRecoilState } from "recoil";
import Locale from "@/components/Locale";
import PageLoading from "@/components/PageLoading";
import { appRouteAtom } from "@/atoms/route";
import { loginStateAtom } from "@/atoms/login";

const App = function() {
  useFavicon("./public/favicon.ico");

  // 父路由伟/* 子路由为/ 无法导航 至子组件 是个bug

  const appRoute = useRecoilValue(appRouteAtom);

  const element = useRoutes(appRoute);

  const [login,setLogin] = useRecoilState(loginStateAtom);

  // 免账号登陆逻辑...
  // useMount(async () => {
  //   if(!login.isLogin){
  //     // const res = await fastLogin();
  //     if(res.data?.jwt){
  //       const { route,permission} = res.data;
  //       setLogin({
  //         ...res.data,
  //         route,
  //         permission,
  //         isLogin:true,
  //       });
  //     }
  //   }
  // });

  return (
    <Suspense fallback={<PageLoading />}>
      <Locale>{element}</Locale>
    </Suspense>
  );
}

export default App;
