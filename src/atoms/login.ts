import { atom } from "recoil";
import routes, { DynamicRouteType } from "@/config/routes";
import { extractRouteConfig } from "@/utils/route-utils"
// can use request result to instead it~

export interface LoginStateAtomType {
  role?: string | null,
  id?: string | null,
  account: string,
  avatar: string | null,
  isLogin: boolean,
  token: string | null,
  permission: object,
  route: DynamicRouteType[],
}

export const loginStateAtom = atom({
  key: "loginStateAtom",
  default: {
    role: null,
    id: null,
    account: "test",
    isLogin: false,
    avatar: null,
    // isLogin: true,
    token: null,
    permission: {},
    route: extractRouteConfig(routes).dynamicConf,
  } as LoginStateAtomType,
});

