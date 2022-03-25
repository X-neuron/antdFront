// import { setConfig } from 'react-hot-loader';
import { useFavicon } from "ahooks";
import React, { Suspense } from "react";
import { useRoutes } from "react-router-dom";
import { useRecoilValue } from "recoil";

import { appRouteAtom } from "@/atoms/route";
import Locale from "@/components/Locale";
import PageLoading from "@/components/PageLoading";

const App: React.FC = () => {
  useFavicon("./public/favicon.ico");

  // 父路由伟/* 子路由为/ 无法导航 至子组件 是个bug

  const appRoute = useRecoilValue(appRouteAtom);

  const element = useRoutes(appRoute);

  return (
    <Suspense fallback={<PageLoading />}>
      <Locale>{element}</Locale>
    </Suspense>
  );
};

export default App;
