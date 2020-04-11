import React, { useState } from 'react';

// import { Layout, Tabs, Button, Dropdown, Menu } from 'antd';
import { Layout } from 'antd';

// import classNames from 'classnames';
import logo from '../assets/logo.svg';
import GlobalFooter from '../component/GlobalFooter';
import GlobalHeader from '../component/GlobalHeader';
import SiderMenu from '../component/SideMenu';

import AppRoutes from '../pages/routes';
// const { TabPane } = Tabs;
const { Header, Content, Footer } = Layout;

const BasicLayout = (props) => (
  <Layout>
    <SiderMenu
      logo={logo}
    />
    <Layout>
      <Header style={{ padding: 0 }}>
        <GlobalHeader />
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
        <AppRoutes />
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

export default BasicLayout;
