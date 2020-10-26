import { useState } from "react";
import routesConfig from "@/config/routes";
import { resolve } from "@reach/router/es/lib/utils";
import _ from "lodash";

const useAppRoute = (defRoutes = routesConfig) => {
  const [rmtConfig] = useState(() => loadRoutes(defRoutes));
  return rmtConfig;
};

// 根据 @/config/routes.js 里的格式，解析出全局的路由。构造好路由结构。
function loadRoutes(rConfig) {
  let menuTabs = null;
  const generRmtConfig = (config, curRootPath) => {
    if (!config) return;
    const routeArrary = [];
    config.forEach(conf => {
      (!menuTabs && conf.menuTabs) ? (menuTabs = conf.menuTabs) : 0; // 确保只添加一次。
      const resolvePath = resolve(conf.path, curRootPath);
      // 有routes说明是个路由，加到路由配置中
      // 未作配置正确性检测。有需要再加
      const curPath = conf.routes || conf.menuTabs? (resolvePath + (_.endsWith(resolvePath, "/") ? "*" : "/*")) : resolvePath;
      // const curPath =  resolvePath + (_.endsWith(resolvePath, '/') ? '*' : '/*');
      // console.log('resolvePath:', resolvePath, 'curPath:', curPath);
      conf.page && conf.path ? routeArrary.push({
        value: conf.page,
        path: curPath,
        // authority: conf.authority,
        name: conf.name,
        access: conf.access,
        routes: generRmtConfig(conf.routes, resolvePath)
      }) : 0;
    })
    return routeArrary;
  }

  const routes = generRmtConfig(rConfig, "/");
  return { routes, menuTabs }
}



export default useAppRoute;
