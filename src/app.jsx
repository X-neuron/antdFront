
import React, { lazy, Suspense } from 'react';


import { hot } from 'react-hot-loader/root'
import Locale from '@/components/Locale';

// setConfig({
//   reloadHooks: false
// });
import { Router } from '@reach/router';
import PageLoading from '@/components/PageLoading';

// import useLocaleModel from '@/models/useLocale';
// reach/router 动态嵌套，测试失败...尝试过 jsx parser lit-jsx 均无法解决
// const generRoutePage = (routes) => routes.map((route) => {
//       if (route.routes) {
//           // const Comp = getPage(route.page, route.path, route.access);
//           return (
//              <CompContainer component={getPage(route.page, route.path, route.access)} key={route.path} path={route.path}>
//                {generRoutePage(route.routes)}
//              </CompContainer>
//           );
//       }
//           return (<CompContainer component={getPage(route.page, route.path, route.access)} key={route.path} path={route.path} />);
//   })

const SecurityLayout = lazy(() => import('@/layouts/SecurityLayout'));
const BasicLayout = lazy(() => import('@/layouts/BasicLayout'));
const UserLayout = lazy(() => import('@/layouts/UserLayout'));
// const Login = lazy(() => import('@/pages/user/login'));
// const Register = lazy(() => import('@/pages/user/login/Register'));

function App() {
  // const rmtConfig = useAppRoute();
  // const { localeLoaded } = useLocaleModel();
  // const localeLoaded = true;

  return (
    <Locale>
      <Suspense fallback={<PageLoading tip="loading" />}>
        <Router>
          <UserLayout path="/user/*" />
          <SecurityLayout path="/*">
            <BasicLayout path="/*" />
          </SecurityLayout>
        </Router>
      </Suspense>
    </Locale>
  )
  // return localeLoaded ? (
  //   // <Locale>
  //   <Suspense fallback={<PageLoading tip="loading" />}>
  //     <Router>
  //       <UserLayout path="/user/*" />
  //       <SecurityLayout path="/*">
  //         <BasicLayout path="/*" />
  //       </SecurityLayout>
  //     </Router>
  //   </Suspense>
  //   // </Locale>
  // ) : <PageLoading tip="loading" />
}


export default hot(App);
