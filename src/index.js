import React from 'react';
import ReactDom from 'react-dom';
// import { ConfigProvider } from 'antd';
// import { registerMicroApps, setDefaultMountApp, start } from 'qiankun';

// import { StoreProvider } from 'easy-peasy';

// import App from './route';
import App from './layout/BasicLayout';
// import App from './layout/BlankLayout';

// import ProLayout  from '@ant-design/pro-layout';
// import { store } from './app/store/store';
// console.log(store);


// const { SubMenu } = Menu;

// import { ProLayout ,SettingDrawer } from '@ant-design/pro-layout';

const initalContainer = document.getElementById('root');

// const Layout = () => {
//   return (
//     <>
//       <ProLayout />
//       {/* <SettingDrawer /> */}
//     </>

//   )
// }

ReactDom.render(
  // <ConfigProvider>
  <App />,
  // <ProLayout />,
  // </ConfigProvider>,
  initalContainer
)


// 微前端测试

// function genActiveRule(routerPrefix) {
//   return location => {
//     console.log(location);
//     location.pathname.startsWith(routerPrefix);
//   }
// }

// function render({ appContent, loading }) {
//   const container = document.getElementById('root');
//   ReactDom.render(
//     <App />,
//     container
//   )
// }


// /**
//  * Step1 初始化应用（可选）
//  */
// render({ appContent: '', loading: true });

/**
 * Step2 注册子应用
 */

// registerMicroApps([
//   {
//     name: 'react app', // app name registered
//     entry: 'locaohost:8002',
//     // render: ({ appContent, loading }) => yourRenderFunction({ appContent, loading }),
//     render,
//     // activeRule: location => yourActiveRule(location),
//     activeRule:genActiveRule('/react')
//   },
//   {
//     name: 'vue app',
//     entry: 'locaohost:8001',
//     // render: ({ appContent, loading }) => yourRenderFunction({ appContent, loading }),
//     render,
//     // activeRule: location => yourActiveRule(location),
//     activeRule:genActiveRule('/vue')
//   }
// ]);

// /**
//  * Step3 设置默认进入的子应用
//  */
// setDefaultMountApp('/react');

// start({
//   prefetch: true,
//   jsSandbox: true,
//   singular: true,
//   fetch: window.fetch
// });

