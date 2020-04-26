
import React, { useState, useRef } from 'react';
import { createModel } from 'hox';

import { usePersistFn, useCreation } from '@umijs/hooks';
import { navigate } from '@reach/router'
import Lru from '@/utils/lru'
import _ from 'lodash';
import { pick } from '@reach/router/es/lib/utils';

import { message } from 'antd';
import useRouteConfigModel from './useRouteConfig';
// 需要解决的场景： 某些页面本来就是支持动态路由，故应当考虑 动态路由 同时可使用多标签展示的问题。
// 再三考虑，单页面无法解决这些问题，目测不需要做单页面了吧。

// pick(routes,uri)
// A route looks like this
//
//     { path, default, value }
//
// And a returned match looks like:
//
//     { route, params, uri }


function useTabs() {
  // const route = useRouteConfigModel().routeConfig;
  // 25个记忆标签已经改足够了吧。LRU算法，更人性点，仅此而已
  // 一个 route 可以对应很多页面

  const [config] = useRouteConfigModel();

  const [tabList, setTabList] = useState([]);
  // activkey，即为当前选中的key
  // 默认的key为 首页key '/'
  const [activeKey, setActiveKey] = useState('/');
  // 无需刷新所以用 ref.
  // value { path,page } path为真是路由。因为存在动态路由配置的可能。
  const keyLruSquence = useCreation(() => new Lru(25));
  // const [activeSquence, set]
  const refreshTab = () => {

  }

  // 应为有的时候 其他地方的按钮 也会触发新路由，openRoute 感觉更合适点。最重要的还是微前端。
  // page 参数为空，则开启 pick 路由，选择组件.
  const openRoute = (key, page, name) => {
    if (page) {
      if (keyLruSquence.get(key)) {
        setActiveKey(key)
      } else {
        keyLruSquence.set(key, {
          path: key,
          page,
        });
        setActiveKey(key);
        setTabList([...tabList, {
          name,
          key,
          page,
        }]);
      }
    }
  }

  const closeTab = (selectKey) => {

  }

  const selectTab = (selectKey) => {
    setActiveKey(selectKey);
    keyLruSquence.get(selectKey);
    navigate(selectKey);
  }

  const closeOtherTab = (selectKey) => {

  }

  const closeAllTab = () => {

  }



  return {
    activeKey,
    tabList,
    closeTab,
    openRoute,
    selectTab,
    closeOtherTab,
    closeAllTab
  }
}

export default createModel(useTabs);
