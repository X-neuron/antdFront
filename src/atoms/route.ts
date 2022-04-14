import { atom, selector } from "recoil";

import { curLocaleLoadAtom } from "@/atoms/locale";
import { loginStateAtom } from "./login";
import {
  generateRouteWithMenuTypes,
  mergeRoute,
  staticConfig,
  translateNameProperty,
} from "@/utils/route-utils";

// 通常权限只更新menu的route 故 在此做区分。
// 基本不变的路由为 staticRoute.
// 根据用户角色改变而发生变化的为 dynamicRoute
// 两者的集合为appRoute

export const staticConfigAtom = atom({
  key: "staticConfigAtom",
  default: staticConfig,
});

export const dynamicConfigAtom = selector({
  key: "dynamicConfigAtom",
  get: ({ get }) => get(loginStateAtom).route
});

const rmtConfigAtom = selector({
  key: "rmtConfigAtom",
  get: ({ get }) =>
    generateRouteWithMenuTypes(
      get(staticConfigAtom) ?? [],
      get(dynamicConfigAtom) ?? [],
    ),
});

export const staticRouteAtom = selector({
  key: "staticRouteAtom",
  get: ({ get }) => get(rmtConfigAtom)?.staticRoute,
});

export const dynamicRouteAtom = selector({
  key: "dynamicRouteAtom",
  get: ({ get }) => get(rmtConfigAtom)?.menuTabs,
});
// 翻译name，方便后续使用
export const transDynamicRouteAtom = selector({
  key: "transDynamicRouteAtom",
  get: ({ get }) => {
    // 依赖 curLocaleLoadAtom,切换语言需要翻译左侧菜单
    get(curLocaleLoadAtom);
    return translateNameProperty(get(dynamicRouteAtom) ?? []);
  },
});

export const appRouteAtom = selector({
  key: "appRouteAtom",
  get: ({ get }) =>
    // 寻找menuTabs标志
    mergeRoute(get(staticRouteAtom) ?? [], get(dynamicRouteAtom) ?? []),
});
