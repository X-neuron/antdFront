import { useState,useEffect } from "react";
import { Tabs } from "antd";

import Lru from "@/utils/lru";
import memoized from "nano-memoize";
import { isHttp } from "@/utils/is";

import getPage from "@/config/pages";
import { usePersistFn, useCreation,usePrevious, useUpdateLayoutEffect} from "ahooks";
// import useTabsRoute from "@/hooks/useTabsRoute";
import { useOutlet,useNavigate,useLocation,matchRoutes,useRoutes } from "react-router-dom";
// 这里可以配tabpane的 样式

import { useRecoilState} from 'recoil';
import { activeKeyAtom } from '@/atoms/activeKey';

const { TabPane } = Tabs;

// 从config里 把 匹配的信息 调出来
const pickRoutes = memoized((routes, pathname) => {
  let matches = matchRoutes(routes, { pathname });
  return {
    routeConfig: matches ? matches[matches.length -1].route : null,
    routePath: matches ? matches.map(match => match.route.path).join('/') : null
  }
})



const TabRoute = (props) => {
  // const {ele, route } = props;

  const keyLruSquence = useCreation(() => new Lru(25));

  const  { route } = props;

  const ele = useOutlet();

  const location = useLocation();
 
  const navigate = useNavigate();

  const {routeConfig,routePath} = pickRoutes(route,location.pathname);

  const [tabList, setTabList] = useState([]);

  // const [activeKey,setActiveKey] = useState();
  const [activeKey,setActiveKey] = useRecoilState(activeKeyAtom);

  const selectTab = usePersistFn((selectKey) => {
    // 记录原真实路由,微前端可能修改
   keyLruSquence.newest.value.curPath = window.location.pathname
    navigate(keyLruSquence.get(selectKey).curPath,{replace:true});
    setActiveKey(selectKey);
  });

  const closeTab = usePersistFn((selectKey) => {
    // 记录原真实路由,微前端可能修改
   keyLruSquence.newest.value.curPath = window.location.pathname
    navigate(keyLruSquence.get(selectKey).curPath,{replace:true});
    // setActiveKey(selectKey);
  });

  // useUpdateLayoutEffect(() => {
  useEffect(() => {
    if (keyLruSquence.get(routePath)) {
      // 如发生路径修改则替换
      setActiveKey(routePath);
    }else{
      setActiveKey(routePath);
      setTabList([...tabList,{
        name:routeConfig.name,
        key:routePath,
        path:routePath,
        page:ele,
        access:routeConfig.access
      }]);
      keyLruSquence.set(routePath, {
        curPath:window.location.pathname
      });
    }
  },[location]);

  return (
      <Tabs
        // className={styles.tabs}
        activeKey={activeKey}
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
        {/* <Suspense fallback={<Pageloading tip="loading" />}> */}
        {tabList.map(item => (
            <TabPane tab={item.name} key={item.path}> 
              {item.page}
            </TabPane>
        ))}
        {/* </Suspense> */}
      </Tabs>
  )
}

export default TabRoute;
