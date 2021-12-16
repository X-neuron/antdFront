import { useRef, Suspense } from "react";
import { Tabs } from "antd";
// import Lru from "@/utils/lru";
import memoized from "nano-memoize";
import _ from "lodash";
import { useMemoizedFn, useCreation } from "ahooks";
// import { useWhyDidYouUpdate } from 'ahooks';

import {
  useOutlet,
  useNavigate,
  useLocation,
  generatePath,
  useParams,
} from "react-router-dom";

// import { useRecoilState} from 'recoil';

import { i18n } from "@lingui/core";
import PageLoading from "@/components/PageLoading";

const { TabPane } = Tabs;

const getTabPath = (tab) => generatePath(tab.location.pathname, tab.params);

// tab的select key = location.pathname + , + matchpath
// 以此解决 微端情况下 tab 的 key 相同导致页面可能丢失的问题。
const generTabKey = memoized((location, matchpath) => `${location.pathname},${matchpath}`);

// 从key中返回 ,号后面的字符
const getTabMapKey = memoized((key) => key.substring(key.indexOf(",") + 1, key.length));

const TabRoute = function(props) {
  // 使用map代替array 后 ，lru暂时不用了...
  // 主要是 map 好remove key
  // const keyLruSquence = useCreation(() => new Lru(25));

  const { routeConfig, matchPath } = props;

  const ele = useOutlet();

  const location = useLocation();

  const params = useParams();

  const navigate = useNavigate();

  // tabList 使用 ref ，避免二次render。
  // const [tabList, setTabList] = useSafeState([]);
  // tablist 结构为 key:matchPath,value:tabObject ;
  // key == location.pathname
  // tabObject中记录当下location。
  const tabList = useRef(new Map());

  // 确保tab
  const updateTabList = useCreation(() => {
    const tab = tabList.current.get(matchPath);
    const newTab = {
      name: routeConfig.name,
      key: generTabKey(location, matchPath),
      page: ele,
      // access:routeConfig.access,
      location,
      params,
    };
    // console.log("tabList is",tabList);
    // console.log("cur tab is:",tab);
    // console.log('match matchPath is',matchPath);
    // console.log('params is',params);
    // console.log('location is',location);
    // console.log('ele is',ele);
    if (tab) {
      // 处理微前端情况，如发生路径修改则替换
      // 还要比较参数
      // 微端路由更新 如果key不更新的话。会导致页面丢失..
      if (tab.location.pathname !== location.pathname) {
        tabList.current.set(matchPath, newTab);
      }
    } else {
      tabList.current.set(matchPath, newTab);
    }
  }, [location]);

  const closeTab = useMemoizedFn((selectKey) => {
    // 记录原真实路由,微前端可能修改
    // keyLruSquence.newest.value.curPath = window.location.pathname
    // navigate(keyLruSquence.get(selectKey).curPath,{replace:true});
    if (tabList.current.size >= 2) {
      tabList.current.delete(getTabMapKey(selectKey));
      const nextKey = _.last(Array.from(tabList.current.keys()));
      navigate(getTabPath(tabList.current.get(nextKey)), { replace: true });
    }
  });

  const selectTab = useMemoizedFn((selectKey) => {
    // 记录原真实路由,微前端可能修改
    navigate(getTabPath(tabList.current.get(getTabMapKey(selectKey))), {
      replace: true,
    });
  });

  // useWhyDidYouUpdate('useWhyDidYouUpdateTabRoutes', { ...props, ele,location,tabList });
  return (
    <Tabs
      // className={styles.tabs}
      activeKey={generTabKey(location, matchPath)}
      onChange={(key) => selectTab(key)}
      // tabBarExtraContent={operations}
      tabBarStyle={{ background: "#fff" }}
      tabPosition="top"
      animated
      tabBarGutter={-1}
      hideAdd
      type="editable-card"
      onEdit={(targetKey) => closeTab(targetKey)}
    >
      {[...tabList.current.values()].map((item) => (
        <TabPane tab={i18n._(item.name)} key={item.key}>
          <Suspense fallback={<PageLoading />}>{item.page}</Suspense>
        </TabPane>
      ))}
    </Tabs>
  );
}

export default TabRoute;
