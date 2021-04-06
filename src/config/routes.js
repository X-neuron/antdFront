
// name 省略 则 name = component
// component 无 page 说明只是个路径，无需对应组件
// function routeConfig() {
  const routes = [
    {
      path:'/',
      component:'blankLayout',
      children:[
        {
          path: "user",
          component:'userLayout',
          children: [
            {
              path: "register",
              component: "userRegister"
            },
            {
              path: "login",
              component: "userLogin"
            }
          ]
        },
        {
          path: '/',
          component: 'securityLayout',
          children:[
              {
              path: "/",
              component: "basicLayout",
              // access:'validUser',
              menuTabs: [
                {
                  path: "/",
                  name: "menu-welcome", // 翻译失败后 则采用name配置值,如无需全球化直接使用中文即可。
                  icon: "HomeOutlined", // @/config/icons里配置的图标,小写也可以
                  access: "dashboardOpen", // @/config/access里可配置静态策略。权限入口在@/config/pages里。
                  component: "dashboard", // 非动态的有page属性的路由，会默认显示在sideMmenu里。
                },
                {
                  // 带subs的 为下拉菜单，表明其无需路由，会其忽略page属性。 但会作为subs子路由的父路由,作为siderMenu的Key,内部计数+1
                  name: "父菜单测试",
                  path: "/ab",
                  icon: "AppstoreOutlined",
                  children: [
                    {
                      name: "test1",
                      path: "a", // 解析为/ab/a
                      component: "test1", // page 建议使用小写，内部会转换成大写,对应到组件上。权限配置中与此保持一致
                      access: "test1Open", // 具体权限配置 请查看@/models/useAccess
                    },
                    {
                      name: "test2",
                      path: "b", // 解析为/ab/b
                      component: "test2",
                      access: "test2Open",
                    },
                    {
                      name: "test3",
                      path: "c", // 解析为/c
                      component: "test3",
                      access: "test3Open",
                    }
                  ]
                },
                {
                  name: "Micro-front",
                  path: "micro",
                  icon: "PaperClipOutlined",
                  children: [
                    {
                      name: "material-ui",
                      path: "material/*",
                      access: "microOpen",
                      component: "http://localhost:8002" // 微前端配置
                    },
                    {
                      name: "vue2",
                      path: "vue2/*",
                      access: "microOpen",
                      component: "http://localhost:8001", // 微前端配置
                    },
                  ]
                }
              ]
            }
          ]
        }
      ]
    }

  ];


//   return function config() {
//     return routes
//   };
// }

export default routes;
