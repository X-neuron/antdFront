import { useState } from "react";
import { createModel } from "hox";

import { usePersistFn, useCreation } from "@umijs/hooks";
import { navigate } from "@reach/router"
import { pick, resolve, match } from "@reach/router/es/lib/utils";
import Lru from "@/utils/lru";
import memoized from "nano-memoize";
import { isHttp } from "@/utils/is";
// import rConfig from '@/config/routes';
import useAppRoute from "@/hooks/useAppRoute";
// const id = nanoid(10);
const memoizedPickRoute = memoized((routeConfig, route) => pick(routeConfig, route).route);


function useTabRoute() {
  // 25个记忆标签已经改足够了吧。LRU算法，更人性点，仅此而已
  // 一个 route 可以对应很多页面
  // const location = useLocation();
  const rmtConfig = useAppRoute();

  // route 分两个hook 主要支持 menu的动态设置。而不重复渲染。
  const [menuTabConfig, setMenuTabConfig] = useState(() => getMenuTabfromConfig(rmtConfig.menuTabs));
  console.log(menuTabConfig)
  const [tabList, setTabList] = useState([]);
  // activkey，即为当前选中的key
  // 默认的key为 首页key '/'
  const [activeKey, setActiveKey] = useState();

  // value { path,page } path为真是路由。因为存在动态路由配置,虽然感觉基本用不到。
  // Lru缓存记录的信息为：
  /* menu激活route时，key为@/config/routes里配置的page 路由。可为动态路由写法。
    key: {
      page: //显示route的 component eg:'test'
      name: // 页面的 title eg:'pageTitile'
      curRoute: // 微端可能修改当前的route。  默认curRoute=Key
      access: pickRoute.access, // 为@/config/routes里配置的组件对应权限
      params  // 动态路由与当前页面路径解析出的参数
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

  const openRoute = (route) => {
    // 调用@reach/router的匹配函数，获取匹配路由的组件
    console.log(route);
    const pickRoute = memoizedPickRoute(menuTabConfig.tabRoutes, route);
    console.log(pickRoute);
    const result = match(pickRoute.path, route);
    console.log(result);
    // 参数作为组件的props输入?
    const params = result
      ? {
        ...result.params,
        uri: result.uri,
        path: pickRoute.path
      }
      : null;
    if (keyLruSquence.get(route)) {
      setActiveKey(route);
    } else {
      const tab = {
        name: pickRoute.name,
        key: route,
        page: pickRoute.value,
        curRoute: route,
        access: pickRoute.access,
        params
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
      setActiveKey(null);
      memoizedPickRoute.clear();
      setTabList([]);
      navigate("/");
    }
  });

  const selectTab = usePersistFn((selectKey) => {
    // 记录原真实路由
    keyLruSquence.newest.value.curRoute = window.location.pathname
    navigate(keyLruSquence.get(selectKey).curRoute);
    setActiveKey(selectKey);
  });

  const closeOtherTab = usePersistFn((selectKey) => {

  });

  // 返回当前路由路径，供切换使用。
  const closeAllTab = usePersistFn(() => {
    memoizedPickRoute.clear();
    keyLruSquence.clear();
    setTabList([]);
  });

  const refreshTab = usePersistFn(() => {

  });

  const changeMenuTabConfig = usePersistFn((newRouteConfig) => {
    setMenuTabConfig(getMenuTabfromConfig(newRouteConfig))
  });


  return {
    activeKey,
    tabList,
    menuTabConfig,
    closeTab,
    openRoute,
    selectTab,
    closeOtherTab,
    closeAllTab,
    changeMenuTabConfig
  }
}


// 读取 routeConfig 配置。s
function getMenuTabfromConfig(aMenuTabConfig) {
  const tabRoutes = [];
  // const routes = [];
  // count用于 非页面的menu的key
  let count = 0;
  // 递归解析submenu
  const generMenuTabConfigFromConfig = (config, curRootPath) => {
    if (!config) return;
    const menuArrays = [];
    config.forEach(conf => {
      const curPath = resolve(conf.path, curRootPath)
      // 有page说明是个路由，加到路由配置中
      // 未作配置正确性检测。有需要再加
      conf.page && !conf.subs ? tabRoutes.push({
        value: conf.page,
        path: curPath,
        // authority: conf.authority,
        name: conf.name,
        access: conf.access
      }) : 0;
      // 加入menuConfig 过滤动态路由
      isHttp(conf.page) || !conf.page?.includes(":") ? menuArrays.push({
        name: conf.name,
        // root目录中，path 不带 / 则自动加上。但在子menu中，则使用根root+path
        key: conf.subs ? curPath + count : curPath,
        icon: conf.icon,
        // page: conf.page,  page 统一放在openRoute里防止泄露页面。
        subs: generMenuTabConfigFromConfig(conf.subs, curPath)
      }) : 0;
      count++;
    });
    return menuArrays
  }

  const menus = generMenuTabConfigFromConfig(aMenuTabConfig, "/");

  return { menus, tabRoutes }
}


export default createModel(useTabRoute);
