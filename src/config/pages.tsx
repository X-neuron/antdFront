import _ from "lodash";
import memoized from "nano-memoize";
import React, { lazy } from "react";
import { Outlet } from "react-router-dom";

import Access from "@/components/Access";
import AccessResult from "@/components/AccessResult";
import { isHttp } from "@/utils/is";

const Dashboard = lazy(() => import("@/pages/dashboard"));
const Test1 = lazy(() => import("@/pages/test1"));
const Test2 = lazy(() => import("@/pages/test2"));
const Test3 = lazy(() => import("@/pages/test3"));
const Test4 = lazy(() => import("@/pages/test4"));

const UserRegister = lazy(() => import("@/pages/user/register"));
const UserLogin = lazy(() => import("@/pages/user/login"));

const BasicLayout = lazy(() => import("@/layouts/BasicLayout"));
const SecurityLayout = lazy(() => import("@/layouts/SecurityLayout"));
const BlankLayout = lazy(() => import("@/layouts/BlankLayout"));
const UserLayout = lazy(() => import("@/layouts/UserLayout"));

const MicroApp = lazy(() => import("@/components/MicroApp"));

const pages: Map<string, React.ReactElement> = new Map([
  ["Dashboard", <Dashboard />],
  ["Test1", <Test1 />],
  ["Test2", <Test2 />],
  ["Test3", <Test3 />],
  ["Test4", <Test4 />],
  ["UserRegister", <UserRegister />],
  ["UserLogin", <UserLogin />],
  ["BasicLayout", <BasicLayout />],
  ["SecurityLayout", <SecurityLayout />],
  ["BlankLayout", <BlankLayout />],
  ["UserLayout", <UserLayout />],
  ["Default", <Outlet />], // default microapp
]);

const getPage = memoized((pageStr: string, access?: string | boolean , fullPath = "") => {
  const page = isHttp(pageStr) ? (
    <MicroApp entry={pageStr} fullPath={fullPath} />
  ) : (
    pages.get(_.upperFirst(pageStr))
  );
  if (access) {
    return (
      <Access accessible={access as string} fallback={<AccessResult code="403" />}>
        {page}
      </Access>
    );
  }
  return page;
});

export default getPage;
