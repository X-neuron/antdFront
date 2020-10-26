import { StickyContainer, Sticky } from "react-sticky";
import { Tabs } from "antd";

import useLocaleModel from "@/models/useLocale";
import useTabRouteModel from "@/models/useTabRoute";
import getPage from "@/config/pages";

// 这里可以配tabpane的 样式


const { TabPane } = Tabs;

// tabpane 单独抽离出来，减少多余渲染。优化性能。
// 同时方便多页标签 和单页纯route自由切换。

const renderTabBar = (props, DefaultTabBar) => (
  <Sticky bottomOffset={80}>
    {({ style }) => (
      // <DefaultTabBar {...props} className="site-custom-tab-bar" style={{ ...style }} />
      <DefaultTabBar {...props} style={{ ...style }} />
    )}
  </Sticky>
);


const TabRoute = () => {
  const { activeKey, tabList, selectTab, closeTab } = useTabRouteModel();
  const { intl } = useLocaleModel();

  return (
    <StickyContainer>
      <Tabs
        // className={styles.tabs}
        activeKey={activeKey}
        renderTabBar={renderTabBar}
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
          <TabPane tab={intl.get(item.name)} key={item.key}>
            {getPage(item.page, item.access, item.params)}
          </TabPane>
        ))}
        {/* </Suspense> */}
      </Tabs>
    </StickyContainer>
  )
}

export default TabRoute;
