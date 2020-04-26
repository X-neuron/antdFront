
import React, { lazy, Suspense } from 'react';

// 以下代码一键切换到@loadable/component
// import loadable from '@loadable/component'
import loadable from '@loadable/component';
import { Router } from '@reach/router';
// import { Spin } from 'antd';
import Pageloading from '@/component/Pageloading'
// const Form1 = loadable(() => import('./test1/1'));
// const Form2 = loadable(() => import('./test2/2'));
// const DateLocales = loadable(() => import('./test3/date'));


// const Dashboard = lazy(() => import('../pages/dashboard'));
// const Test1 = lazy(() => import('../pages/test1'));
// const Test2 = lazy(() => import('../pages/test2'));
// const Test3 = lazy(() => import('../pages/test3'));
const Dashboard = loadable(() => import('../pages/dashboard'));
const Test1 = loadable(() => import('../pages/test1'));
const Test2 = loadable(() => import('../pages/test2'));
const Test3 = loadable(() => import('../pages/test3'));


function AppRoutes() {
  return (
    <>
      {/* @reach/router test */}
      <Suspense fallback={<Pageloading tip="loading" />}>
        <Router>
          <Dashboard path="/" />
          <Test1 path="test1" />
          <Test2 path="test2" />
          <Test3 path="test3" />
        </Router>
      </Suspense>
    </>
  )
}

export default AppRoutes;
