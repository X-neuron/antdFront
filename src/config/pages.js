/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable react/jsx-key */
import { lazy } from "react";
import memoized from "nano-memoize";
import { Outlet } from "react-router-dom";
// import loadable from "@loadable/component";
import _ from "lodash";
import { isHttp } from "@/utils/is";
import Access from "@/components/Access";
import AccessResult from "@/components/AccessResult";
// import { PageLoading } from "@ant-design/pro-layout";

const Dashboard = lazy(() => import("@/pages/dashboard"));
const Test1 = lazy(() => import("@/pages/test1"));
const Test2 = lazy(() => import("@/pages/test2"));
const Test3 = lazy(() => import("@/pages/test3"));
const Test4 = lazy(() => import("@/pages/test4"));

const UserRegister = lazy(() => import("@/pages/user/register"));
const UserLogin = lazy(() => import("@/pages/user/login"));

// eslint-disable-next-line import/no-cycle
const BasicLayout = lazy(() => import("@/layouts/BasicLayout"));
const SecurityLayout = lazy(() => import("@/layouts/SecurityLayout"));
const BlankLayout = lazy(() => import("@/layouts/BlankLayout"));
const UserLayout = lazy(() => import("@/layouts/UserLayout"));

const MicroApp = lazy(() => import("@/components/MicroApp"));

// 用于route.js中，没有配置component的路径
const Default = function() {
  return <Outlet />;
}

const pages = new Map([
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
  ["Default", <Default />], // default microapp
]);

// fullpath = /micro/vue/*
const getPage = memoized((pageStr, access, fullPath) => {
  // if(isHttp(pageStr)){
  //   return <MicroApp entry={pageStr} fullPath={fullPath} />
  // }
  const page = isHttp(pageStr) ? (
    <MicroApp entry={pageStr} fullPath={fullPath} />
  ) : (
    pages.get(_.upperFirst(pageStr))
  );
  if (access) {
    return (
      <Access accessible={access} fallback={<AccessResult code="403" />}>
        {/* <Suspense fallback={<PageLoading />}> */}
        {page}
        {/* </Suspense> */}
      </Access>
    );
  }
  return <>{page}</>;

});

export default getPage;
