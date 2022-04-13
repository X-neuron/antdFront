// import { i18n } from "@lingui/core";
// import { t } from "@lingui/macro";
// name 省略 则 name = component
// component 无 page 说明只是个路径，无需对应组件
// function routeConfig() {
// 纯json的配置，主要为了在无框架条件下 实现 json 路由配置的动态修改
// react-router6 支持index route 和 prolayout route ,caseSensitive 配置 与 Muti app 的 basePath 写法。
const routes = [
  {
    // path:'/',
    component: "blankLayout",
    children: [
      {
        path: "/user",
        component: "userLayout",
        children: [
          {
            path: "register",
            component: "userRegister",
          },
          {
            path: "login",
            component: "userLogin",
          },
        ],
      },
      {
        // path: '/',  // prolayout route写法
        component: "securityLayout",
        children: [
          {
            // path: "/", // prolayout route写法
            component: "basicLayout",
            // access:'validUser',
            // 之所以用menuTabs 为了将功能单独做成动态的route
            menuTabs: [],
          },
        ],
      },
    ],
  },
];

//   return function config() {
//     return routes
//   };
// }

export default routes;
