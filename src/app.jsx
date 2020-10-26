
import loadable from "@loadable/component";

// import { setConfig } from 'react-hot-loader';
import Locale from "@/components/Locale";
import { Router } from "@reach/router";
import PageLoading from "@/components/PageLoading";
import { useFavicon } from "react-use";

// setConfig({
//   trackTailUpdates:false,
//   reloadHooks: false
// });
// setConfig({
//   trackTailUpdates: false, // 添加这个配置才能热更新 lazy 组件
//   logLevel: 'debug',
//   reloadHooks: true
// });
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

// const SecurityLayout = lazy(() => import('@/layouts/SecurityLayout'));
// const BasicLayout = lazy(() => import('@/layouts/BasicLayout'));
// const UserLayout = lazy(() => import('@/layouts/UserLayout'));

const SecurityLayout = loadable(() => import("@/layouts/SecurityLayout"), {
  fallback: <PageLoading tip="组件加载中..." />,
});
const BasicLayout = loadable(() => import("@/layouts/BasicLayout"), {
  fallback: <PageLoading tip="组件加载中..." />,
});
const UserLayout = loadable(() => import("@/layouts/UserLayout"), {
  fallback: <PageLoading tip="组件加载中..." />,
});

function App() {
  // const rmtConfig = useAppRoute();
  useFavicon("./public/favicon.ico");
  return (
    <Locale>
      {/* <Suspense fallback={<PageLoading tip="loading" />}> */}
      <Router>
        <UserLayout path="/user/*" />
        <SecurityLayout path="/*">
          <BasicLayout path="/*" />
        </SecurityLayout>
      </Router>
      {/* </Suspense> */}
    </Locale>
  )
}

// if ('serviceWorker' in navigator) {
//   window.addEventListener('load', () => {
//       navigator.serviceWorker.register('/service-worker.js').then(registration => {
//       console.log('SW registered: ', registration);
//       }).catch(registrationError => {
//       console.log('SW registration failed: ', registrationError);
//       });
//   });
// }


// export default hot(App);
export default App;
// export default App;
