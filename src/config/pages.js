// import React, { lazy, Suspense } from 'react';
// react lazy suspense 没成功，暂用loadable/component
import React from 'react';
import memoized from 'nano-memoize';
import MicroApp from '@/components/MicroApp';
import Pageloading from '@/components/PageLoading';
import loadable from '@loadable/component';
import _ from 'lodash';
import { isHttp } from '@/utils/is';
import Access from '@/components/Access';
import AccessResult from '@/components/AccessResult';
// import litjsx from 'lit-jsx';
// 需要 引入 react jsx parser么？ 好像有点大。就这几个功能，
// 暂未尝试 react jsx parser 的方式支不支持按需加载
// umi 这种类似的文件可以自动生成。减少手工配置的工作量，但我想一般的应用也就十几二十个功能好像也不复杂..
// 微前端的加载也放这合适..

// function SuspenseComp({ component }) {
//   return (
//     <Suspense fallback={<Pageloading tip="loading" />}>
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
  fallback: <Pageloading tip="组件加载中..." />,
});
const Test1 = loadable(() => import('@/pages/test1'), {
  fallback: <Pageloading tip="组件加载中..." />,
});
const Test2 = loadable(() => import('@/pages/test2'), {
  fallback: <Pageloading tip="组件加载中..." />,
});
const Test3 = loadable(() => import('@/pages/test3'), {
  fallback: <Pageloading tip="组件加载中..." />,
});


const getPage = memoized((pageStr, access, params) => {
  // const getPage = (pageStr, access, params) => {
  // const upperFirstPageStr = isHttp(pageStr) ? 'MicroApp' : _.upperFirst(pageStr);
  // const page = jsx`<${upperFirstPageStr} params=${params} />`;
  // 为每个组件 注入 动态路由解析的 params 参数。
  const upperFirstPageStr = isHttp(pageStr) ? pageStr : _.upperFirst(pageStr);
  let page;
  switch (upperFirstPageStr) {
    case 'Test3':
      page = <Test3 params={params} />
      break;
    case 'Test2':
      page = <Test2 params={params} />
      break;
    case 'Dashboard':
      page = <Dashboard params={params} />
      break;
    case 'Test1':
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
export default getPage;
