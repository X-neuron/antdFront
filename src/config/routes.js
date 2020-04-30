
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
// function routeConfig() {
const routes = [
  {
    path: '/',
    name: 'menu-welcome', // 翻译失败后 则采用name,无需全球化直接使用中文即可。
    icon: 'HomeOutlined', // @/config/icons里配置图图标
    access: 'dashboard/open', // @/config/access里可配置静态策略。权限入口在@/config/pages里。
    page: 'dashboard' // 非动态的 有page属性的 路由 会默认显示在menu里。
  },
  {
    // 带subs的 为下拉列表，无需路由，自动忽略page属性。 故允许配置为'/'，作为指定子路由的根路由,作为siderMenu的Key,内部计数+1
    name: 'sideMenu-usual',
    path: '/ab',
    icon: 'AppstoreOutlined',
    subs: [
      {
        name: 'sideMenu-from1',
        path: 'test1',
        page: 'test1',
        access: 'test1/open',
      },
      {
        name: 'sideMenu-from2',
        path: 'test2',
        page: 'test2',
        access: 'test2/open',
        // redirect: '/',
      },
      {
        name: 'sideMenu-from3',
        path: 'test3',
        page: 'test3',
        access: 'test3/open',
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
        access: 'microMaterial/open',
        page: 'http://localhost:8002'
      },
      {
        name: 'vue2',
        path: 'vue2',
        access: 'microVue2/open',
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
            path: 'three',
            // authority: ['admin', 'user'],
            page: 'test3',
          }
        ]
      }
    ]
  }
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
