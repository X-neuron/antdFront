
// route 拆成 icon和page route 三文件，只为了实现 纯字符串的 route 配置。
// 如无需要，整合到一块即可
// 构造sider menu
// 构造@reach/router 的 核心的pick(route,uri) 函数自动生成。
// 为支持  多标签页 和 单标签页 切换，通知生成 组件。
// 尽量配置为字符串，以支持json动态生成。
// icon/page 首字母大小写没关系，生成sidermenu的时候会自动该成大写并找到对应的组件
// name 默认微locales目录下语言.json的 配置翻译值，如无法找到，则 使用name值。
// 不直接代组件 为了支持动态权限
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
    path: '/user',
    page: 'userLayout',
    routes: [
      {
        name: 'login',
        path: 'login',
        page: 'userlogin',
      },
      {
        name: 'register',
        path: 'register',
        page: 'userRegister',
      },
    ],
  },
  {
    path: '/',
    page: 'securityLayout',
    routes: [
      {
        path: '/',
        page: 'basicLayout',
        access: 'validUser',
        menuTabs: [
          {
            path: '/',
            name: 'menu-welcome', // 翻译失败后 则采用name,如无需全球化直接使用中文即可。
            icon: 'HomeOutlined', // @/config/icons里配置图图标,小写也可以
            access: 'dashboardOpen', // @/config/access里可配置静态策略。权限入口在@/config/pages里。
            page: 'dashboard', // 非动态的 有page属性的 路由 会默认显示在menu里。
          },
          {
            // 带subs的 为下拉列表，无需路由，自动忽略page属性。 但会作为指定子路由的根路由,作为siderMenu的Key,内部计数+1
            name: 'sideMenu-usual',
            path: '/ab',
            icon: 'AppstoreOutlined',
            subs: [
              {
                name: 'sideMenu-from1',
                path: 'a', // 解析为/ab/a
                page: 'test1', // page 建议使用小写，内部会转换成大写,对应到组件上。权限配置中与此保持一致
                access: 'test1Open', // 具体权限配置 请查看@/models/useAccess
              },
              {
                name: 'sideMenu-from2',
                path: 'b', // 解析为/ab/b
                page: 'test2',
                access: 'test2Open',
              },
              {
                name: 'sideMenu-from3',
                path: '/c', // 解析为/c
                page: 'test3',
                access: 'test3Open',
              }
            ]
          },
          {
            // 带subs的 为下拉列表，无需路由，自动忽略page属性。 故允许配置为'/'，作为指定子路由的根路由,作为siderMenu的Key,内部计数+1
            name: 'Micro-front',
            path: '/micro',
            icon: 'PaperClipOutlined',
            subs: [
              {
                name: 'material-ui',
                path: 'material',
                access: 'microOpen',
                page: 'http://localhost:8002'
              },
              {
                name: 'vue2',
                path: 'vue2',
                access: 'microOpen',
                page: 'http://localhost:8001',
                // redirect: '/',
              },
            ]
          },
          {
            name: 'sideMenu-mutiNavigate',
            path: '/one',
            icon: 'BarsOutlined',
            subs: [
              {
                name: 'sideMenu-mutiNavigate1',
                path: 'two',
                subs: [
                  {
                    name: 'sideMenu-mutiNavigate2',
                    path: 'three', // 解析为 /one/two/threee
                    access: 'open',
                    page: 'test3',
                  }
                ]
              }
            ]
          }
        ]
      },
      // {
      //   component: './404',
      // },
    ],
  },
  // {
  //   component: './404',
  // },
]




//   return function config() {
//     return routes
//   };
// }

export default routes;

// export default routeConfig;

// const menus = [
//   {
//     path: '/',
//     title: '首页',
//     icon: <HomeOutlined />,
//     page: 'index'
//   },
//   {
//     title: '通用',
//     path: '/a',
//     icon: <AppstoreOutlined />,
//     subs: [
//       {
//         title: '按钮',
//         path: 'button',
//         page: 'button'
//       },
//       {
//         title: '图标',
//         path: 'icon',
//         page: 'icon'
//       }
//     ]
//   },
//   {
//     title: '导航',
//     path: '/nav',
//     icon: <CompassOutlined />,
//     subs: [
//       {
//         title: '下拉菜单',
//         path: 'dropdown'
//       },
//       {
//         title: '导航菜单',
//         path: 'menu'
//       },
//       {
//         title: '步骤条',
//         path: 'steps'
//       }
//     ]
//   },
//   {
//     title: '表单',
//     path: '/form',
//     icon: <FormOutlined />,
//     subs: [
//       {
//         title: '基础表单',
//         path: 'base-form'
//       },
//       {
//         title: '步骤表单',
//         path: 'step-form'
//       }
//     ]
//   },
//   {
//     title: '展示',
//     path: '/show',
//     icon: <PieChartOutlined />,
//     subs: [
//       {
//         title: '表格',
//         path: 'table'
//       },
//       {
//         title: '折叠面板',
//         path: 'collapse'
//       },
//       {
//         title: '树形控件',
//         path: 'tree'
//       },
//       {
//         title: '选项卡',
//         path: 'tabs'
//       }
//     ]
//   },
//   {
//     title: '其它',
//     path: 'others',
//     icon: <PaperClipOutlined />,
//     authority: ['admin', 'user'],
//     subs: [
//       {
//         title: '进度条',
//         path: 'progress'
//       },
//       {
//         title: '404',
//         path: '/404'
//       },
//       {
//         title: '500',
//         path: '/500'
//       }
//     ]
//   },
//   {
//     title: '多级导航',
//     path: '/one',
//     icon: <BarsOutlined />,
//     subs: [
//       {
//         title: '二级',
//         path: 'two',
//         subs: [
//           {
//             title: '三级',
//             path: 'three'
//           }
//         ]
//       }
//     ]
//   },
//   {
//     title: '关于',
//     path: '/about',
//     icon: <UserOutlined />
//   }
// ]
