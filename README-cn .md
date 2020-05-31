[English](./README.md) | 简体中文

# AntdFront

AntdFront 是一套基于 Ant Design Pro ，拥抱纯 react hook ，实现按钮级权限，整合下一代数据流 hox 的微前端多标签管理系统。

## 特性

- **原生:** 纯 hook，同时采用 webpack、babel、antd 等较为原生的配置和函数组件搭建，支持 pwa
- **极简数据流:** 集成下一代 React 状态管理器 hox
- **微前端:** 使用 qiankun 实现微前端架构

<img src="https://i.loli.net/2020/05/18/sRX52JT4yxlkm8e.gif" >
    

## 安装使用

```
1: gitclone https://github.com/X-neuron/antdFront.git
2: npm i or yarn
3: npm run dev

```

## 常见问题

**1、为什么用 antd design?**

笔者深度考查过十多个 UI, 对 Material UI 、ant design 和 Rsuite 这三个印象很深刻。

Material UI 项目特点是：技术追新快，React hook 2018 年底出的时候，不到半年，Material 内核和文档就全部都切换到hook。在UI组件的描述拆分上，设计也十分优雅，非常方便的在其上应用 css-in-js、styled-component，主题的切换从来都不是一个问题，对于技术的狂热者而言，它是心目中理想的 UI 撸码器。但由于没有大公司背景，组件不够丰富，比如 做日期范围选择和级联选择，就需要自己写大量组件，笔者觉得由于 v5 可能出现 UI 引擎的升级，所以建议 v5 发布后再考虑入手。

Antd design 在 2020 年初升级到 4.0 版，陆续在部分组件中见到了hook。css 样式方面，百年不变的 less (这里面可能有 sketch 设计器的考量)，切换主题，往往需要采用大量神技组合，数字 input 组件依旧无法使用滚轮，antd3 的表单，有点不忍直视，4.0 表单上 Hook 后，已经到了能够接受的水平，Antd 的强项在于把技术做成产品，真正打动笔者的是 message 组件，能够像写函数一样 (message.info(‘a message’))，调用组件，仿佛一夜间回到了熟悉的 Extjs。组件丰富程度堪比私人定制。总体感觉 antd design 在技术上不激进，较保守(因为有大量的历史包袱)。

Rsuite 是个很不错 UI，有着 Material 的水波效果，又贴近 antd 的审美。笔者一度非常喜欢他们的 schema-typed 描述表单的方式，类似于yup，体积小，代码好读好修改，如果你不想使用 formik 之类的来管理你的表单，结合 schema-typed 很容易开发出自己的表单 hook (仅供参考)，但是目前 4.0 版 icon 是整体打包，体积较大，社区扩展的组件还不够多。

**2、为什么没使用 umi?**

“原生的,未必是最快的，但往往是最好的。” 当创建 React 的大牛们用面向对象的思维使用 JS 时，拥抱 class 语法糖，设计出了组件的生命周期、为解决组件复用，产生了高阶组件等等晦涩难懂的概念，当理解了JS，拥抱函数闭包时，就靠拢了函数组件，就有了 Hook… 

为什么 react 向函数靠拢，因为函数的闭包特性正好原生的切合了渲染帧状态保存的需求。

每个框架都其生命周期，每一次的技术迭代，架子虽会不见，但好的思想往往沉淀。比如：ruby 的约束：建个 model 文件夹，就有模型，建个locale 文件夹，就有了国际化。虽然 ruby 见的不多了，留下的约束思想影响了一代又一代的框架设计，又比如：react 的 class 组件的 redux 时代，dva、rematch 用起来你会觉得相恨见晚，当 react 底层升级到hook，这些数据流就用起来就不那么自然了。当你使用的 antd design pro 未提供相应的特性，而你又迫不及待的想上新技术，结果就只能等待，踩坑，等待，周而复始，循环往复。

生命有限，不要去重复造轮子，但应当具备造轮子的思想和技术。

**3、为什么没使用 cra?**

使用 cra 开启 antd 项目，主要的难点在修改 webpack 配置，因为less-loader 需要开启 javascriptEnabled: true(存在风险的选项)，目前较好的社区方案: react-app-rewired、craco、虽然可以改写部分 cra的webpack 配置，但是对于启用某些打包性能优化的配置，比如 thread-loader 比较困难。笔者在测试时，发现初始化项目只能用 yarn。用 npm i 则无法安装好依赖。不使用这个脚手架，也是为了努力践行纯原生的原则。

**4、数据流为什么选 hox?**

在选择数据流时，笔者尝试过数十个数据流方案，为什么没有选择 dva, rematch,easy-peasy，icestore-next, unstated-next 等等，dva 和 rematch 都是 redux 思想 优化代码编写的产物，hook 时代需要它的思想，而 easy-peasy 手工映射 state 、 action 与 redux connect 的方式如出一辙。甚至 connect 的方式反而更使得 UI 和业务model 之间的耦合更松散，并且方便装饰器注入。于是找啊找，发现了hox 、unstate-next、icestore-next。对比后，hox 不需要那么多provider 和context，只有 1 个 API 更简单。有点类似于 mobox 的 订阅和 hook 的结合。使全局状态的代码编写更简洁，即使万一遇到不可调和的问题，迁移到 unstate-next 也很方便。 hox 写法就是原生的 Hook，于是天空飘来几个字：“原生的，往往就是最好的”…

**5、路由为什么用 react/router?**

react-router 的作者说 reach/router 是下一代的 react-router。于是就用了。打包体积小 4kb。最关键的是，很容易平民民化的抽离出其路由算法，做个多标签页面，掌握路由入口，get 到 umi 神技的感觉很舒坦…其次基于其写出的嵌套路由代码简单，好看。缺点：笔者能力有限，基于 reach/router 动态嵌套路由配置还没攻克。其次，在 history 和redirect 的导航上遇到些小问题。

这个选择可能会有些激进，生产使用建议自行替换至 react-router。

**6、为什么用 qiankun 微前端？**

笔者受文章 《这可能是你见过最完善的微前端解决方案》 的影响，时间有限，暂未尝试其他微前端。笔者在 qiankun1.0 上多次尝试发现其无法解决组件动态添加至多标签生成的动态Dom节点问题，险些放弃。qiankun 2.0 后，API 升级后、简单。支持手工加载，非常符合这项目的需求，能轻松搭建出 MicroApp 组件(详情见项目 src/components/MicroApp)。qiankun 也有不少踩坑点，生产使用请注意。

**7、json 配置式路由？这不是框架才能 get 的神技么？**

在 react下，要优美的实现 json 配置式路由，难度非常大，主要涉及 jsx 组件动态添加和代码分割按需加载的需求。这里面可能有不可调和的矛盾。

目前条件下，如无动态配置 route 的需求，最好的方案可能还是 umi，它在 node 加框架的加持下根据配置自动生成相应代码。如想动态配置下路由，动态调整菜单 menu 的显示，笔者做过多种动态解析的尝试，均无法解决，目前的解决方案就是将 routes 的配置，拆分成 icon 、page、routes 三部分配置，组合共同实现无框架条件下 json 路由配置。

```
const routes = [
  {
    path: '/user',
    page: 'userLayout',
    routes: [
      {
        name: 'login',
        path: 'login',
        page: 'login',
      },
      {
        name: 'register',
        path: 'register',
        page: 'register',
      },
    ],
  },
  {
    path: '/',
    page: 'securityLayout',   // 以上的layout的路由配置暂未实现基于@reach/router的动态解析，单已提供相应hook读取配置，有需要可切换至切换至react-router尝试。app.jsx中已提供部分相应注释的代码..
    routes: [
      {
        path: '/',
        page: 'basicLayout',
        access: 'validUser',
        menuTabs: [  //sideMenu与页面route合并的配置。一个routes.js只允许配置一个menuTabs。
          {
            path: '/',
            name: 'menu-welcome', // 翻译失败后 则采用name配置值,如无需全球化直接使用中文即可。
            icon: 'HomeOutlined', // @/config/icons里配置的图标,小写也可以
            access: 'dashboardOpen', // @/config/access里可配置静态策略。权限入口在@/config/pages里。
            page: 'dashboard', // 非动态的有page属性的路由，会默认显示在sideMmenu里。
          },
          {
            // 带subs的 为下拉菜单，表明其无需路由，会其忽略page属性。 但会作为subs子路由的父路由,作为siderMenu的Key,内部计数+1
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
              },
            ]
          }
        ]
      },
    ],
  },
]

```

**8、页面及按钮级权限**

权限的配置方式的选择主要需要同时统筹前后端的设计，笔者在 ant design plus 的 policy 和 umijs/plugin-access 两者之间权衡了许久。模拟实践的结果表明：umijs/plugin-access 是按钮简洁权限管理的可行道路。至于前端为什么不需要数据级权限控制，我只能想到这个理由：比如：经理和董事长，查看数据的组件可以是通用的，但是查看的内容应当是后端 api 权限配置的问题，不知道这点够不够充分。以下展示了结合 hox 数据流权限的动态管理。啥也不多说，撸代码：
```
import { useState } from 'react';
import { createModel } from 'hox';
// import useLoginModel from '@/models/useLogin';
import _ from 'lodash';

const useAccess = () => {
  // const { isLogin, role, user, userId } = useLoginModel();

  const [access, setAccess] = useState({
    // 放弃了这个设计，因为命名易冲突，导致优先获取access.key下的权限。
    // test1: {
    //   open: true,
    //   deleteUserList: false,
    //   adduserList: true
    // },
    // test2: {
    //   open: false, // 可后端返回
    // },
    test1Open: true,
    test2Open: false,
    microOpen: true,
    test3Open: true,
    adminSubmit: false,
    // 'example': role === 'admin',
    // 'example2': some => some.prop === 'test'
  });

  // 修改权限，已存在则覆盖。
  const updateAccess = (newAccess) => {
    setAccess(_.merge(access, newAccess))
  }

  return { access, updateAccess }
};

export default createModel(useAccess);

```
代码项目位置：src/models/useAccess.js
页面级权限在 src/config/routes.js 里配置，按钮级权限使用 src/components/Access 组件控制。

**9.多标签，带路由？组件状态怎么保存，是不是有什么魔改技术？**

难道是用了 react-keeper? 这个看起来好复杂，概念又得学不少。事实上，原生的组件带了 key。只要组件结构一样。 diff 后的组件状态就会保持。路由是什么？就是根据输入的地址，自动选择显示对应的组件。理解好这点，再挖挖 4kb 的 reach/router 的代码，里面果然有金矿，轮子不用重复造了。多标签的路由只采用了路由算法。
代码项目位置：src/models/useTabRoute.js

```
  // 有的时候 其他页面按钮 也会触发新路由，openRoute 感觉更合适点。便于兼容微前端。
  // 微前端的情况，路由可能会变化。点击 tab后 应当记录最新的地址。以记录其最新状态。
  // 有key一般是menu的方式，key为页面的路由配置 比如/dist/:user/role
  // 其他组件的调用，一般采用openRoute('/test');
  // keyLruSquence 标签管理Lru算法列队，只为人性化。同时便于方便获取上一次历史路径。
  // Lru缓存记录的信息为：
  /* menu激活route时，key为@/config/routes里配置的page 路由。可为动态路由写法。 
    key: {
      page: //显示route的 component eg:'test'
      name: // 页面的 title eg:'pageTitile'
      curRoute: // 微端可能修改当前的route。  默认curRoute=Key
      access: pickRoute.access, // 为@/config/routes里配置的组件对应权限
      params  // 动态路由与当前页面路径解析出的参数
   }
  */
  import { pick, resolve, match } from '@reach/router/es/lib/utils';  // 抽取reach/router的路由算法
  import memoized from 'nano-memoize';

  const memoizedPickRoute = memoized((routeConfig, route) => pick(routeConfig, route).route);  // 缓存
  const openRoute = (route) => {
    // 调用@reach/router的匹配函数，获取匹配路由的组件，
  const pickRoute = memoizedPickRoute(menuTabConfig.tabRoutes, route);
    // 解析出 动态路由的params参数。
    const result = match(pickRoute.path, route);
    // 参数作为组件的props输入?
    const params = result
      ? {
        ...result.params,
        uri: result.uri,
        path: pickRoute.path
      }
      : null;
    if (keyLruSquence.get(route)) {
      setActiveKey(route);
    } else {
      const tab = {
        name: pickRoute.name,
        key: route,
        page: pickRoute.value,
        curRoute: route,
        access: pickRoute.access, // 为组件的权限
        params
      };
      setTabList([...tabList, tab]); // 配置tabpane
      keyLruSquence.set(route, tab); 
      setActiveKey(route);  // 同步下sidemenu
    }
    navigate(route); // 修改当前页面的url地址。
  }
```
