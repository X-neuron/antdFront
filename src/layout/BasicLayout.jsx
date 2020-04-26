// import React, { lazy, Suspense } from 'react';
import React from 'react';
// import { Layout, Tabs, Button, Dropdown, Menu } from 'antd';
import { Layout, Tabs } from 'antd';

// import classNames from 'classnames';
import GlobalFooter from '@/component/GlobalFooter';
import GlobalHeader from '@/component/GlobalHeader';
import SiderMenu from '@/component/SiderMenu';
import applogo from '@/assets/logo.svg';
import { StickyContainer, Sticky } from 'react-sticky';
// import AppRoutes from '@/pages/routes';

// import { useTabsToggleModel } from '@/models/useToggle';
import getPage from '@/config/pages'
import useTabsModel from '@/models/useTabs';
// import getPage from '@/config/pages';
import useLocalesModel from '@/models/useLocales';
// import { useCreation } from '@umijs/hooks';

const { Header, Content, Footer } = Layout;


const renderTabBar = (props, DefaultTabBar) => (
  <Sticky bottomOffset={80}>
    {({ style }) => (
      <DefaultTabBar {...props} className="site-custom-tab-bar" style={{ ...style }} />
    )}
  </Sticky>
);

const { TabPane } = Tabs;


const BasicLayout = (props) => {
  const { activeKey, tabList, selectTab } = useTabsModel();
  console.log({ activeKey, tabList, selectTab })
  const { intl } = useLocalesModel();
  return (
    <Layout>
      <SiderMenu
        logo={applogo}
      />
      <Layout>
        <Header style={{ padding: 0 }}>
          <GlobalHeader logo={applogo} />
        </Header>
        <Content className="globalTabs" style={{ margin: '2px 0px 0px', height: '100%' }}>
          {/* <Switch> */}
          {/* {redirectData.map(item => ( */}
          {/* <Redirect key={item.from} exact from={item.from} to={item.to} /> */}
          {/* ))} */}
          {/* {getRoutes(match.path, routerData).map(item => ( */}
          {/* <AuthorizedRoute */}
          {/* key={item.key} */}
          {/* path={item.path} */}
          {/* component={item.component} */}
          {/* exact={item.exact} */}
          {/* authority={item.authority} */}
          {/* redirectPath="/exception/403" */}
          {/* /> */}
          {/* ))} */}
          <StickyContainer>
            <Tabs
              // className={styles.tabs}
              activeKey={activeKey}
              renderTabBar={renderTabBar}
              onChange={(key) => selectTab(key)}
              // tabBarExtraContent={operations}
              tabBarStyle={{ background: '#fff' }}
              tabPosition="top"
              tabBarGutter={-1}
              hideAdd
              type="editable-card"
            // onEdit={this.onEdit}
            >
              {/* <Suspense fallback={<Pageloading tip="loading" />}> */}
              {tabList.map(item => (
                <TabPane tab={intl.get(item.name)} key={item.key}>
                  {getPage(item.page)}
                </TabPane>
              ))}
              {/* </Suspense> */}
            </Tabs>
          </StickyContainer>

          {/* <AppRoutes /> */}

          {/* <Tabs
                     // className={styles.tabs}
                     activeKey={this.state.activeKey}
                     onChange={this.onChange}
                     tabBarExtraContent={operations}
                     tabBarStyle={{background:'#fff'}}
                     tabPosition="top"
                     tabBarGutter={-1}
                     hideAdd
                     type="editable-card"
                     onEdit={this.onEdit}
                     >
                     {tabList.map(item => (
                       <TabPane tab={item.name} key={item.key} closable={item.closable}>
                           {item.content ? item.content:<NotFound/>}
                       </TabPane>
                     ))}
                 </Tabs> */}
          {/* <Redirect exact from="/" to={bashRedirect} /> */}
          {/* <Route render={NotFound} /> */}
          {/* </Switch> */}
        </Content>
        <Footer style={{ padding: 0 }}>
          <GlobalFooter
            links={[
              {
                key: 'Pro 首页',
                title: 'Pro 首页',
                href: 'https://github.com/kuhami',
                blankTarget: true
              },
              {
                key: 'github',
                // title: <Icon type="github" />,
                href: 'https://github.com/kuhami/react-ant-pro',
                blankTarget: true
              },
              {
                key: 'Ant Tabs',
                title: 'Ant Tabs',
                href: 'https://github.com/kuhami',
                blankTarget: true
              }
            ]}
          // copyright={(
          //   <>
          //     Copyright <Icon type="copyright" /> 2018 Ant Tabs体验技术部出品
          //   </>
          // )}
          />
        </Footer>
      </Layout>
    </Layout>
  )
}

export default BasicLayout;
