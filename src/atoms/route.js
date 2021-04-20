import { atom,selector } from 'recoil';
import {staticConfig,dynamicConfig,generateRouteAndProlayoutMenus,mergeRoute} from '@/utils/route-utils';
import { curLangAtom } from '@/atoms/locale';
// import { i18n } from "@lingui/core";
// import memoized from "nano-memoize";

// 通常权限只更新menu的route 故 在此做区分。
// 基本不变的路由为 staticRoute.
// 根据用户角色改变而发生变化的为 dynamicRoute
// 两者的集合为appRoute

 export const staticConfigAtom = atom({
    key: 'staticConfigAtom',
    default: staticConfig,
  });


  export const dynamicConfigAtom = atom({
    key: 'dynamicConfigAtom',
    default: dynamicConfig,
  });

  // 触发不了prolayout 的menu更新
  // export const transDynamicConfigAtom = selector({
  //   key:'transDynamicConfigAtom',
  //   get:({get}) => {
  //     return transConfigName(get(dynamicConfigAtom),get(curLangAtom));
  //   }
  // });

  const rmtConfigAtom = selector({
    key: 'rmtConfigAtom',
    get: ({get}) => {
      // return generateRouteAndProlayoutMenus(get(staticConfigAtom),get(transDynamicConfigAtom));
      return generateRouteAndProlayoutMenus(get(staticConfigAtom),get(dynamicConfigAtom));
    },
  });


  export const staticRouteAtom = selector({
    key: 'staticRouteAtom',
    get: ({get}) => {
      return get(rmtConfigAtom).staticRoute;
    },
  });

  export const dynamicRouteAtom = selector({
    key: 'dynamicRouteAtom',
    get: ({get}) => {
      return get(rmtConfigAtom).menuTabs;
    },
  });
  // 翻译name，方便后续使用
  // export const transDynamicRouteAtom = selector({
  //   key: 'transDynamicRouteAtom',
  //   get:({get}) => {
  //     return translateNameProperty(get(dynamicRouteAtom),get(curLangAtom));
  //   }
  // });

  export const appRouteAtom = selector({
    key:'appRouteAtom',
    get:({get}) => {
        // 寻找menuTabs标志
        return mergeRoute(get(staticRouteAtom),get(dynamicRouteAtom));
    }
 });
