
// 构造sider menu
// 构造@reach/router 的 核心的pick(route,uri) 函数自动生成。
// 为支持  多标签页 和 单标签页 切换，通知生成 组件。
// 尽量配置为字符串，以支持json动态生成。
// icon/page 首字母大小写没关系，生成sidermenu的时候会自动该成大写并找到对应的组件

const routes = [
  {
    path: '/',
    name: 'menu-welcome',
    icon: 'HomeOutlined',
    authority: ['admin', 'user'],
    page: 'dashboard'
  },
  {
    // 带subs的 为下拉列表，无需路由，自动忽略page属性。 故允许配置为'/'，作为指定子路由的根路由
    name: 'sideMenu-usual',
    path: '/',
    icon: 'AppstoreOutlined',
    subs: [
      {
        name: 'sideMenu-from1',
        path: 'test1',
        authority: ['admin', 'user'],
        page: 'test1'
      },
      {
        name: 'sideMenu-from2',
        path: 'test2',
        authority: ['admin', 'user'],
        page: 'test2',
        // redirect: '/',
      },
      {
        name: 'sideMenu-from3',
        path: 'test3',
        authority: ['admin', 'user'],
        page: 'test3'
      }
    ]
  },
  // {
  //   name: 'sideMenu-mutiNavigate',
  //   path: '/one',
  //   icon: 'BarsOutlined',
  //   subs: [
  //     {
  //       name: 'sideMenu-mutiNavigate1',
  //       path: 'two',
  //       subs: [
  //         {
  //           name: 'sideMenu-mutiNavigate2',
  //           path: 'three',
  //           authority: ['admin', 'user'],
  //         }
  //       ]
  //     }
  //   ]
  // }
]

export default routes;

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
