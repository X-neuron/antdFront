import react, { useState } from "react";
import routeConfig from "../config/routes";
import { resolvePath, matchRoutes } from "react-router-dom";
// import _ from "lodash";
import getPage from "@/config/pages";
import getIcon from '@/config/icons';

const rmtConfig = generateRoute(routeConfig);


export const staticRoute = rmtConfig.routes;


export const dynamicRoute = rmtConfig.menuTabs;

// 通常权限只更新menu的route 故 在此做区分。
// 基本不变的路由为 staticRoute.
// 根据用户角色改变而发生变化的为 dynamicRoute
// 两者的集合为appRoute
// Generate App Route from config files 生成 route menu tabs config


// const generateAppRouteFromConfig = (defRoutes = routeConfig) => {
//   const [rmtConfig] = generateRoute(defRoutes);

//   return rmtConfig;
// };

// const rmtConfig = generateAppRouteFromConfig


// convert menutabs to prolayout's menudataitem
// menuTabs: [
//   {
//     path: "1",
//     component: "page1"
//   },
//   {
//     path: "2",
//     component: "page2",
//     children:[
//       {
//         path: "3",
//         component: "page3"
//       },
//       {
//         path: "4",
//         component: "page4"
//       },
//     ]
//   },
// ]

function generateProlayoutMenuDataItem (menuTabs,basePath) {
  return menuTabs.map(conf => {
    const resPath = resolvePath(conf.path, basePath);

    let menuDataItem = {
      // name为空则component 代替
      name: conf.name ? conf.name: conf.component,
      // react router6 支持的父子路径
      path: conf.path,
      // 完整路径 parentPath:/a  childrenPath:b  fullPath:/a/b
      fullPath: resPath.pathname,
      key:resPath.pathname,
      icon: getIcon(conf.icon),
      element: conf.component ? getPage(conf.component,conf.access) : getPage("Default"),
      caseSensitive: false,
      access: conf.access,
    }


    if (conf.children) {
      menuDataItem.children = generateProlayoutMenuDataItem(conf.children,resPath.pathname);
    }

    return menuDataItem;
  })
}

// 根据 @/config/routes.js 里的格式，解析出全局的路由。构造好路由结构。

function generateRoute(rConfig) {
  if (!rConfig) return;

  let menuTabs = null;
      // 与prolayout 兼容的menuItem;
      //  interface MenuDataItem {
      //   children?: MenuDataItem[];
      //   hideChildrenInMenu?: boolean;
      //   hideInMenu?: boolean;
      //   icon?: string;
      //   locale?: string;
      //   name?: string;
      //   path: string;
      //   [key: string]: any;
      // }
      // name 用于配置在菜单中的名称，同时会修改为浏览器标签页标题
      // icon 代表菜单的体表，只 antd 的图表，iconfont 需要自己定义
      // locale 可以设置菜单名称的国际化表示
      // hideInMenu 会把这个路由配置在 menu 中隐藏这个路由，name 不填会有相同的效果
      // hideChildrenInMenu 会把这个路由的子节点在 menu 中隐藏

  const generateRmtConfig = (config, basePath) => {

    return config.map(conf => {
      const resPath = resolvePath(conf.path, basePath);
      
      let route = {
        value: conf.component,
        // path: curPath,
        //reactRouter 6 的 父子path
        path: conf.path,
        // 完整路径 parentPath:/a  childrenPath:b  fullPath:/a/b
        fullPath: resPath.pathname,
        // element: conf.component,
        element: conf.component ? getPage(conf.component,conf.access) : getPage("Default"),
        caseSensitive: false,
        // authority: conf.authority,
        name: conf.name ?? conf.component ?? conf.path,
        access: conf.access,
      }

      // 遇到menutabs 则 返回，将 静态和菜单的动态路由分开 ，有atom进行管理。
      if(!menuTabs && conf.menuTabs){ // 确保只添加一次。
        menuTabs = generateProlayoutMenuDataItem(conf.menuTabs,basePath)
        route.menuTabs = true;
        // 将全局的和功能菜单分开。方便路由多层次嵌套
        // route.path = route.path.endsWith("/*") ? route.path : (route.path + "/*").replace("\/\/","\/");
        return route;
      }

      if (conf.children) {
        route.children = generateRmtConfig(conf.children,resPath.pathname);
      }

      return route;
    })

  };

  const routes = generateRmtConfig(rConfig, "/");
  return { routes, menuTabs };
}

// 路由拆分成了两部分，要把可变的部分 合并到整体中
export const mergeRouteFromFlags = (routeArrayA,routeArrayB,flag = 'menuTabs') => {

  const replaceFlagePropertyByChilren = (array) => {
    array.forEach(element => {
      if(element[flag]) {
        element.children = routeArrayB;
        return;
      }
      if(element.children){
        replaceFlagePropertyByChilren(element.children)
      }
   })
  }
  replaceFlagePropertyByChilren(routeArrayA);
  return routeArrayA;
}
