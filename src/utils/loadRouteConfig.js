import { startsWith } from '@reach/router/es/lib/utils';
import _ from 'lodash';

const mergePath = (path, curRootPath) => {
  if (curRootPath === '/') {
    return startsWith(path, '/') ? path : curRootPath + path;
  }
  return startsWith(path, '/') ? curRootPath + path : `${curRootPath}/${path}`;
}

// 读取routeConfig 配置。
function getMenuRoutefromConfig(Rconfig) {
  // 应该是menuConfig的逻辑缓存版
  const routeConfig = [];
  // 用于menu 非路由菜单 生成key。
  let count = 0;
  // 递归解析submenu
  function generMenuRouteConfigFromArray(config, curRootPath) {
    if (!config) return;
    const menuConfigArray = [];
    config.forEach(conf => {
      const curPath = mergePath(conf.path, curRootPath)
      // 有page说明是个路由，加到路由配置中
      // 未作配置正确性检测。有需要再加
      conf.page && !conf.subs ? routeConfig.push({
        value: conf.page,
        path: curPath,
        authority: conf.authority,
      }) : 0;
      // 加入menuConfig
      menuConfigArray.push({
        title: conf.name,
        // root目录中，path 不带 / 则自动加上。但在子menu中，则使用根root+path
        key: conf.subs ? curPath + count : curPath,
        icon: conf.icon,
        authority: conf.authority,
        subs: generMenuRouteConfigFromArray(conf.subs, curPath)
      });
      count++;
    });
    return menuConfigArray
  }

  const menuConfig = generMenuRouteConfigFromArray(Rconfig, '/');


  return { menuConfig, routeConfig }
}

// getMenuRoutefromConfig(route);

export default getMenuRoutefromConfig;
