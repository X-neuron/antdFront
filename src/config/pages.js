// import React, { lazy, Suspense } from 'react';
// react lazy suspense 没成功，暂用loadable/component
import React from 'react';
import memoized from 'nano-memoize';
import MicroApp from '@/components/MicroApp';
import PageLoading from '@/components/PageLoading';
import loadable from '@loadable/component';
import _ from 'lodash';
import { isHttp } from '@/utils/is';
import Access from '@/components/Access';
import AccessResult from '@/components/AccessResult';
// import litjsx from 'lit-jsx';  测试失败...
// 需要 引入 react jsx parser么？  暂未测试...
// 暂未尝试 react jsx parser 的方式支不支持按需加载
// umi 这种类似的文件可以自动生成。减少手工配置的工作量，但我想一般的应用也就十几二十个功能好像也不复杂..
// 微前端的加载也放这合适..

// function SuspenseComp({ component }) {
//   return (
//     <Suspense fallback={<PageLoading tip="loading" />}>
//       {component}
//     </Suspense>
//   )
// }

// const Dashboard = lazy(() => import('../pages/dashboard'));
// const Test1 = lazy(() => import('../pages/test1'));
// const Test2 = lazy(() => import('../pages/test2'));
// const Test3 = lazy(() => import('../pages/test3'));

// const jsx = litjsx({ React });
const Dashboard = loadable(() => import('@/pages/dashboard'), {
  fallback: <PageLoading tip="组件加载中..." />,
});
const Test1 = loadable(() => import('@/pages/test1'), {
  fallback: <PageLoading tip="组件加载中..." />,
});
const Test2 = loadable(() => import('@/pages/test2'), {
  fallback: <PageLoading tip="组件加载中..." />,
});
const Test3 = loadable(() => import('@/pages/test3'), {
  fallback: <PageLoading tip="组件加载中..." />,
});
const BasicLayout = loadable(() => import('@/layout/BasicLayout'), {
  fallback: <PageLoading tip="组件加载中..." />,
});
const SecurityLayout = loadable(() => import('@/layout/SecurityLayout'), {
  fallback: <PageLoading tip="组件加载中..." />,
});
const UserLayout = loadable(() => import('@/layout/UserLayout'), {
  fallback: <PageLoading tip="组件加载中..." />,
});


export const getTabPage = memoized((pageStr, path, access, params) => {
  // const getPage = (pageStr, access, params) => {
  // const upperFirstPageStr = isHttp(pageStr) ? 'MicroApp' : _.upperFirst(pageStr);
  // const page = jsx`<${upperFirstPageStr} params=${params} />`;
  // 为每个组件 注入 动态路由解析的 params 参数。为了确保路由改变时候，不影响页面状态。采用props注入参数的方式
  console.log('getTabPage recalc')

  const upperFirstPageStr = isHttp(pageStr) ? pageStr : _.upperFirst(pageStr);
  let page;
  switch (upperFirstPageStr) {
    case 'BasicLayout':
      page = <BasicLayout path params>routes? {generRoutePage(routes)}: null</BasicLayout>
      break;
    case 'SecurityLayout':
      page = <SecurityLayout path params>routes? {generRoutePage(routes)}: null</SecurityLayout>
      break;
    case 'UserLayout':
      page = <UserLayout path params>routes? {generRoutePage(routes)}: null</UserLayout>
      break;
    case 'Test3':
      // page = <Test3 path={path} params={params} />
      page = <Test3 path params />
      break;
    case 'Test2':
      page = <Test2 path params />
      break;
    case 'Dashboard':
      page = <Dashboard path params />
      break;
    case 'Test1':
      page = <Test1 path params />
      break;
    // 默认没有，则用微端的方式加载试试。
    default:
      page = <MicroApp entry={pageStr} params />
  }

  return (
    <>
      <Access accessible={access} fallback={<AccessResult code="403" />}>
        {page}
      </Access>
    </>
  )

  // switch (apageStr) {
  //   case 'Test3':
  //     return <SuspenseComp component={Test3} />
  //   case 'Test2':
  //     return <SuspenseComp component={Test2} />
  //   case 'Dashboard':
  //     return <SuspenseComp component={Dashboard} />
  //   case 'Test1':
  //     return <SuspenseComp component={Test1} />
  //   // 默认没有，则用微端的方式加载试试。
  //   default:
  //     return <MicroApp entry={apageStr} />
  // }
});

export const getRoutePage = memoized((routes) => {
  // const getPage = (pageStr, access, params) => {
  // const upperFirstPageStr = isHttp(pageStr) ? 'MicroApp' : _.upperFirst(pageStr);
  // const page = jsx`<${upperFirstPageStr} params=${params} />`;
  // 为每个组件 注入 动态路由解析的 params 参数。为了确保路由改变时候，不影响页面状态。采用props注入参数的方式
  console.log('getRoutePage recalc')
  routes.map(item => {
    const upperFirstPageStr = _.upperFirst(item.page);
    let page;
    switch (upperFirstPageStr) {
      case 'BasicLayout':
        page = <BasicLayout path params>routes? {generRoutePage(routes)}: null</BasicLayout>
        break;
      case 'SecurityLayout':
        page = <SecurityLayout path params>routes? {generRoutePage(routes)}: null</SecurityLayout>
        break;
      case 'UserLayout':
        page = <UserLayout path params>routes? {generRoutePage(routes)}: null</UserLayout>
        break;
      default:
        page = <></>
    }

    return (
      <>
        <Access accessible={access} fallback={<AccessResult code="403" />}>
          {page}
        </Access>
      </>
    )
  })
});


function generRoutePage(routes) {
  routes.map(item => (getRoutePage(item.page, item.access, item.params)))
}


