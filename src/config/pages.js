// import React, { lazy, Suspense } from 'react';
// react lazy suspense 没成功，暂用loadable/component
import { lazy } from "react";
import memoized from "nano-memoize";
import MicroApp from "@/components/MicroApp";
import { Outlet } from 'react-router-dom'
// import loadable from "@loadable/component";
import _ from "lodash";
import { isHttp } from "@/utils/is";
import Access from "@/components/Access";
import AccessResult from "@/components/AccessResult";


const Dashboard = lazy(() => import("@/pages/dashboard"));
const Test1 = lazy(() => import("@/pages/test1"));
const Test2 = lazy(() => import("@/pages/test2"));
const Test3 = lazy(() => import("@/pages/test3"));

const UserRegister = lazy(() => import("@/pages/user/register"));
const UserLogin = lazy(() => import("@/pages/user/login"));

const BasicLayout = lazy(() => import("@/layouts/BasicLayout"));
const SecurityLayout = lazy(() => import("@/layouts/SecurityLayout"));
const BlankLayout = lazy(() => import("@/layouts/BlankLayout"));
const UserLayout = lazy(() => import("@/layouts/UserLayout"));



// 用于route.js中，没有配置component的路径
const Default = () => {
  return <Outlet />
}

const pages = new Map([
  ['Dashboard',<Dashboard />],
  ['Test1',<Test1 />],
  ['Test2',<Test2 />],
  ['Test3',<Test3 />],
  ['UserRegister',<UserRegister />],
  ['UserLogin',<UserLogin />],
  ['BasicLayout',<BasicLayout />],
  ['SecurityLayout',<SecurityLayout />],
  ['BlankLayout',<BlankLayout />],
  ['UserLayout',<UserLayout />],
  ['Default',<Default />] //default microapp
])





const getPage = memoized((pageStr,access) => {
  const upperFirstPageStr = _.upperFirst(pageStr);
  let page = pages.get(upperFirstPageStr);
  if(isHttp(pageStr)){
    return <MicroApp entry={pageStr} />
  }
  if(access){
    return (
        <Access accessible={access} fallback={<AccessResult code="403" />}>
          {page}
        </Access>
    );
  }else{
    return (
      <>
        {page}
      </>
    )
  }
});

export default getPage;


