// import React, { lazy, Suspense } from 'react';
// react lazy suspense 没成功，暂用loadable/component
import memoized from "nano-memoize";
import MicroApp from "@/components/MicroApp";
import PageLoading from "@/components/PageLoading";
import loadable from "@loadable/component";
import _ from "lodash";
import { isHttp } from "@/utils/is";
import Access from "@/components/Access";
import AccessResult from "@/components/AccessResult";
// import litjsx from 'lit-jsx';  测试失败...
// 需要 引入 react jsx parser么？  app.jsx上测试失败...
// umi 这种类似的文件可以自动生成。减少手工配置的工作量，但我想一般的应用也就十几二十个功能好像也不复杂..
// 微前端的加载也放这合适..


const Dashboard = loadable(() => import("@/pages/dashboard"), {
  fallback: <PageLoading tip="组件加载中..." />,
});
const Test1 = loadable(() => import("@/pages/test1"), {
  fallback: <PageLoading tip="组件加载中..." />,
});
const Test2 = loadable(() => import("@/pages/test2"), {
  fallback: <PageLoading tip="组件加载中..." />,
});
const Test3 = loadable(() => import("@/pages/test3"), {
  fallback: <PageLoading tip="组件加载中..." />,
});

const getPage = memoized((pageStr, access, params) => {
  // const getPage = (pageStr, access, params) => {
  // 为每个组件 注入 动态路由解析的 params 参数。为了确保路由改变时候，不影响页面状态。采用props注入参数的方式
  const upperFirstPageStr = isHttp(pageStr) ? pageStr : _.upperFirst(pageStr);
  let page;
  switch (upperFirstPageStr) {
    case "Test3":
      // page = <Test3 path={path} params={params} />
      page = <Test3 params={params} />
      break;
    case "Test2":
      page = <Test2 params={params} />
      break;
    case "Dashboard":
      page = <Dashboard params={params} />
      break;
    case "Test1":
      page = <Test1 params={params} />
      break;
    // 默认没有，则用微端的方式加载试试。
    default:
      page = <MicroApp entry={pageStr} params={params} />
  }

  return (
    <>
      <Access accessible={access} fallback={<AccessResult code="403" />}>
        {page}
      </Access>
    </>
  )
});

export default getPage;


