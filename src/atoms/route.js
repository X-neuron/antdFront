import { atom,selector } from 'recoil';
import {staticRoute,dynamicRoute,mergeRouteFromFlags} from '../utils/route-utils'

// 通常权限只更新menu的route 故 在此做区分。
// 基本不变的路由为 staticRoute.
// 根据用户角色改变而发生变化的为 dynamicRoute
// 两者的集合为appRoute
 export const staticRouteAtom = atom({
    key: 'staticRouteAtom',
    default: staticRoute,
  });


  export const dynamicRouteAtom = atom({
    key: 'dynamicRouteAtom',
    default: dynamicRoute,
  });


  export const appRouteAtom = selector({
    key:'appRouteAtom',
    get:({get}) => {
        // 寻找menuTabs标志
        return mergeRouteFromFlags(get(staticRouteAtom),get(dynamicRouteAtom));
    }
});
