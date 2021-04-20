
import { useRoutes } from "react-router-dom";
// import { setConfig } from 'react-hot-loader';
import Locale from "@/components/Locale";

import { useFavicon } from "ahooks";
import { useRecoilValue } from 'recoil';
import { appRouteAtom } from '@/atoms/route';


function App() {

  useFavicon("./public/favicon.ico");

  // 父路由伟/* 子路由为/ 无法导航 至子组件 是个bug


  const appRoute = useRecoilValue(appRouteAtom);

  let element = useRoutes(appRoute);

  return (
    <Locale>
      {element}
    </Locale>
  )
}

export default App;
