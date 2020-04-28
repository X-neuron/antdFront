// import React, { lazy, Suspense } from 'react';
import React from 'react';
// import { Layout, Tabs, Button, Dropdown, Menu } from 'antd';
import { Layout } from 'antd';

// import classNames from 'classnames';
import GlobalFooter from '@/components/GlobalFooter';
import GlobalHeader from '@/components/GlobalHeader';
import SiderMenu from '@/components/SiderMenu';
import applogo from '@/assets/logo.svg';

import TabRoute from '@/components/TabRoute'
// import AppRoutes from '@/pages/routes';

const { Header, Content, Footer } = Layout;

const BasicLayout = (props) => (
  <Layout>
    <SiderMenu
      logo={applogo}
    />
    <Layout>
      <Header style={{ padding: 0 }}>
        <GlobalHeader logo={applogo} />
      </Header>
      <Content className="globalTabs" style={{ margin: '2px 0px 0px', height: '100%' }}>
        <TabRoute />
        {/* <AppRoutes /> */}
      </Content>
      <Footer style={{ padding: 0 }}>
        <GlobalFooter
          links={[
            {
              key: 'Pro 首页',
              title: 'Pro 首页',
              href: '',
              blankTarget: true
            },
            {
              key: 'github',
              // title: <Icon type="github" />,
              href: 'https://github.com/kuhami/react-ant-pro',
              blankTarget: true
            },
            {
              key: 'Ant X-plat',
              title: 'Ant X-plat',
              href: '',
              blankTarget: true
            }
          ]}
        // copyright={(
        //   <>
        //     Copyright <Copyright /> 2020 XX信息中心 信息系统组出品
        //   </>
        // )}
        />
      </Footer>
    </Layout>
  </Layout>
)


export default BasicLayout;
