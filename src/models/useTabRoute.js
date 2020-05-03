import { useState } from 'react';
// 分离出来主要为了test
// import loadRouteConfig from '@/utils/loadRouteConfig';
import { createModel } from 'hox';

import { usePersistFn, useCreation } from '@umijs/hooks';
import { navigate } from '@reach/router'
import { pick, resolve } from '@reach/router/es/lib/utils';
import Lru from '@/utils/lru';
import memoized from 'nano-memoize';
import { isHttp } from '@/utils/is';
import routesConfig from '@/config/routes';
// const id = nanoid(10);
const memoizedPickRoute = memoized((routeConfig, route) => pick(routeConfig, route).route);

function useTabRoute() {
  // 25个记忆标签已经改足够了吧。LRU算法，更人性点，仅此而已
  // 一个 route 可以对应很多页面
  // const location = useLocation();
  const [tabRouteConfig, setTabRouteConfig] = useState(() => getTabsRouterfromConfig(routesConfig));

  const [tabList, setTabList] = useState([]);
  // activkey，即为当前选中的key
  // 默认的key为 首页key '/'
  const [activeKey, setActiveKey] = useState();

  // value { path,page } path为真是路由。因为存在动态路由配置,虽然感觉基本用不到。
  /* Lru缓存记录的信息为：
  // menu激活route时，key为config/routes里配置的page 路由。可为动态。 当组件激活时，为系统nanoid自动分配
    key: {
      page: //显示route的 component
      name: // 页面的 title
      curRoute: // 微端可能修改当前的route。  默认curRoute=Key
   }
  */
  const keyLruSquence = useCreation(() => new Lru(25));

  // 应为有的时候 其他地方的按钮 也会触发新路由，openRoute 感觉更合适点。最重要的还是微前端。
  // page 参数为空，则开启 pick 路由，选择组件.
  // 微前端的情况，路由可能会变化。所以 点击 tab后 应当记录最新的地址。以记录其最新状态。
  // 有key一般是menu的方式，key为页面的路由配置 比如/dist/:user/role
  // 其他组件的调用，一般采用openRoute('/test');
  // 服务器渲染和 mobile的话 得改此处 目前暂只考虑 浏览器情况，使用window.location.pathname
  // access属性不应该存在具体的组件中..
  // const openRoute = usePersistFn((route, name, page) => {
  //   const apickRoute = pick(tabRouteConfig.routeConfig, route).route
  //   console.log('pick the route:', apickRoute);
  //   if (route) {
  //     // menu方式
  //     if (keyLruSquence.get(route)) {
  //       setActiveKey(route);
  //     } else {
  //       // 调用@reach/router的匹配函数，获取匹配的路由
  //       // menu中有page。其他组件激活 则没有page。
  //       const { curPage, curName } = page ? { curPage: page, curName: name } : pick(tabRouteConfig.routeConfig, route).route;
  //       keyLruSquence.set(route, {
  //         page: curPage,
  //         name: curName,
  //         curRoute: route
  //       });
  //       setActiveKey(route);
  //       setTabList([...tabList, {
  //         name,
  //         key: route,
  //         page: curPage
  //       }]);
  //     }
  //     navigate(route);
  //   }
  // });

  const openRoute = (route) => {
    // 调用@reach/router的匹配函数，获取匹配的路由，
    const pickRoute = memoizedPickRoute(tabRouteConfig.routeConfig, route);
    console.log(pickRoute);
    if (keyLruSquence.get(route)) {
      setActiveKey(route);
    } else {
      const tab = {
        name: pickRoute.name,
        key: route,
        page: pickRoute.value,
        access: pickRoute.access
      };
      setTabList([...tabList, tab]);
      keyLruSquence.set(route, tab);
      setActiveKey(route);
    }
    navigate(route);
  }


  const closeTab = usePersistFn((selectKey) => {
    keyLruSquence.delete(selectKey)
    if (keyLruSquence.newest) {
      setActiveKey(keyLruSquence.newest.key);
      setTabList(tabList.filter(tab => tab.key !== selectKey));
      navigate(keyLruSquence.newest.value.curRoute);
    } else {
      // 可以默认打开个欢迎界面
      // openRoute('/');
    }
  });

  const selectTab = usePersistFn((selectKey) => {
    setActiveKey(selectKey);
    // 记录原真实路由
    keyLruSquence.newest.value.curRoute = window.location.pathname
    keyLruSquence.get(selectKey);
    // 导航至新路由中 先导航过去避免出现配置无效的问题
    navigate(keyLruSquence.get(selectKey).curRoute);
  });

  const closeOtherTab = usePersistFn((selectKey) => {

  });

  // 返回当前路由路径，已供切换使用。
  const closeAllTab = usePersistFn(() => {
    memoizedPickRoute.clear();
    keyLruSquence.clear();
    setTabList([]);
  });

  const refreshTab = usePersistFn(() => {

  });

  const changeTabRouteConfig = usePersistFn((newMenuRouteConfig) => {
    setTabRouteConfig(getTabsRouterfromConfig(newMenuRouteConfig))
  });


  return {
    activeKey,
    tabList,
    tabRouteConfig,
    closeTab,
    openRoute,
    selectTab,
    closeOtherTab,
    closeAllTab,
    changeTabRouteConfig
  }
}


// 读取routeConfig 配置。
function getTabsRouterfromConfig(Rconfig) {
  const routeConfig = [];
  // count用于 非页面的menu的key
  let count = 0;
  // 递归解析submenu
  const generMenuRouteConfigFromConfig = (config, curRootPath) => {
    if (!config) return;
    const menuConfigArray = [];
    config.forEach(conf => {
      const curPath = resolve(conf.path, curRootPath)
      // 有page说明是个路由，加到路由配置中
      // 未作配置正确性检测。有需要再加
      conf.page && !conf.subs ? routeConfig.push({
        value: conf.page,
        path: curPath,
        // authority: conf.authority,
        name: conf.name,
        access: conf.access
      }) : 0;
      // 加入menuConfig 过滤动态路由
      isHttp(conf.page) || !conf.page?.includes(':') ? menuConfigArray.push({
        name: conf.name,
        // root目录中，path 不带 / 则自动加上。但在子menu中，则使用根root+path
        key: conf.subs ? curPath + count : curPath,
        icon: conf.icon,
        // page: conf.page,  page 统一放在openRoute里防止泄露页面。
        subs: generMenuRouteConfigFromConfig(conf.subs, curPath)
      }) : 0;
      count++;
    });
    return menuConfigArray
  }

  const menuConfig = generMenuRouteConfigFromConfig(Rconfig, '/');

  return { menuConfig, routeConfig }
}




export default createModel(useTabRoute);
