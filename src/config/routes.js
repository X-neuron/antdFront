
// route 拆成 icon和page route 三文件，只为了实现 纯字符串的 route 配置。
// 如无需要，整合到一块即可
// 构造sider menu
// 构造@reach/router 的 核心的pick(route,uri) 函数自动生成。
// 为支持  多标签页 和 单标签页 切换，通知生成 组件。
// 尽量配置为字符串，以支持json动态生成。
// icon/page 首字母大小写没关系，生成sidermenu的时候会自动该成大写并找到对应的组件
// name 默认微locales目录下语言.json的 配置翻译值，如无法找到，则 使用name值。
// 不直接写组件 为了支持动态权限
// 支持 '../' 路径的方式配置路由
// 要不要支持 hidemenu 也就是动态路由，我觉得前端的东西，多数能用参数解决。 后端对资源的描述才需要用 /user/:useid/book 之类的路由来描述资源。
// 当配置为动态路由 /user/:id/book 不会显示在menu列表中，但是可以通过openRoute('/user/1/book')匹配到该路由，自动打开。

// admin 和 user的 功能区 可在 access里配置，前端直接请求该route的json。
// 需要提高安全性的话，可以闭包下 同时修改@/models/useTabRoute 里初始化函数即可。

// 默认一个app里只包含一个menuTabs。减轻解析的心智负担。一般的应用不会出现 其他layout 包含 submenu / tab的情况。
// 遇到@/hooks/useAppRoute 遇到menuTabs则终止嵌套解析。并将第一个遇到的menuTabs作为rmtConfig.menuTabs值输出。用于@/models/useTabRoute
// function routeConfig() {
const routes = [
  {
    path: "/user",
    page: "userLayout",
    routes: [
      {
        name: "login",
        path: "login",
        page: "Login",
      },
      {
        name: "register",
        path: "register",
        page: "Register",
      },
    ],
  },
  {
    path: "/",
    page: "securityLayout", // 以上的layout的路由配置暂未实现基于@reach/router的动态解析，有需要可以改写成react-router。
    routes: [
      {
        path: "/",
        page: "basicLayout",
        access: "validUser",
        menuTabs: [ // sideMenu与页面route合并的配置。一个routes 只允许一个。
          {
            path: "/",
            name: "menu-welcome", // 翻译失败后 则采用name配置值,如无需全球化直接使用中文即可。
            icon: "HomeOutlined", // @/config/icons里配置的图标,小写也可以
            access: "dashboardOpen", // @/config/access里可配置静态策略。权限入口在@/config/pages里。
            page: "dashboard", // 非动态的有page属性的路由，会默认显示在sideMmenu里。
          },
          {
            // 带subs的 为下拉菜单，表明其无需路由，会其忽略page属性。 但会作为subs子路由的父路由,作为siderMenu的Key,内部计数+1
            name: "sideMenu-usual",
            path: "/ab",
            icon: "AppstoreOutlined",
            subs: [
              {
                name: "sideMenu-from1",
                path: "a", // 解析为/ab/a
                page: "test1", // page 建议使用小写，内部会转换成大写,对应到组件上。权限配置中与此保持一致
                access: "test1Open", // 具体权限配置 请查看@/models/useAccess
              },
              {
                name: "sideMenu-from2",
                path: "b", // 解析为/ab/b
                page: "test2",
                access: "test2Open",
              },
              {
                name: "sideMenu-from3",
                path: "/c", // 解析为/c
                page: "test3",
                access: "test3Open",
              }
            ]
          },
          {
            name: "Micro-front",
            path: "/micro",
            icon: "PaperClipOutlined",
            subs: [
              {
                name: "vue2",
                path: "vue2",
                access: "microOpen",
                page: "http://localhost:8001", // 微前端配置
              },
              {
                name: "react16",
                path: "react16",
                access: "microOpen",
                page: "http://localhost:8002", // 微前端配置
              }
            ]
          }
        ]
      },
    ],
  },
]


//   return function config() {
//     return routes
//   };
// }

export default routes;
