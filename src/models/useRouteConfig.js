// import { useCreation } from '@umijs/hooks';
import { useState } from 'react';
import route from '@/config/routes';
// 分离出来主要为了test
import loadRouteConfig from '@/utils/loadRouteConfig';
// 引入 hox支持动态改变菜单，不需要可关闭
import { createModel } from 'hox';
import { usePersistFn } from '@umijs/hooks';
// 需要重config中，解析出 @reach/router的config 和 sidemenu and Router用于单页面
// 这个应该是提供给 相关的组件，避免每次生成。
// 支持route 动态调整。
function useRouteConfig(routeConfig = route) {
  // useCreation 避免重复计算。
  // const config = useCreation(() => loadRouteConfig(routeConfig), routeConfig);
  const [config, setConfig] = useState(() => loadRouteConfig(routeConfig));
  const changeRoute = usePersistFn((newConfig) => {
    setConfig(loadRouteConfig(newConfig))
  });

  return { config, changeRoute }
}


export default createModel(useRouteConfig);
