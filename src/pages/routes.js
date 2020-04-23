
import React, { lazy, Suspense } from 'react';

// 以下代码一键切换到@loadable/component
// import loadable from '@loadable/component'

import { Router } from '@reach/router';
// import { Spin } from 'antd';
import Pageloading from '@/component/Pageloading'
// const Form1 = loadable(() => import('./test1/1'));
// const Form2 = loadable(() => import('./test2/2'));
// const DateLocales = loadable(() => import('./test3/date'));


const Form1 = lazy(() => import('./test1'));
const Form2 = lazy(() => import('./test2'));
const DateLocales = lazy(() => import('./test3'));
function AppRoutes() {
  return (
    <>
      {/* @reach/router test */}
      <Suspense fallback={<Pageloading tip="loading" />}>
        <Router>
          <DateLocales path="/" />
          <Form1 path="a" />
          <Form2 path="b" />
        </Router>
      </Suspense>
    </>
  )
}

export default AppRoutes;
