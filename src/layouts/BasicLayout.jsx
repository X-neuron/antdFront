// import React, { lazy, Suspense } from 'react';
import { Layout } from "antd";

// import classNames from 'classnames';
import GlobalFooter from "@/components/GlobalFooter";
import GlobalHeader from "@/components/GlobalHeader";
import SiderMenu from "@/components/SiderMenu";
import applogo from "@/assets/logo.svg";

import TabRoute from "@/components/TabRoute";
import { CopyrightOutlined } from "@ant-design/icons";
// import AppRoutes from '@/pages/routes';
import { useLocation } from "@reach/router";
import { useMount } from "@umijs/hooks";
import useTabRouteModel from "@/models/useTabRoute";

const { Header, Content, Footer } = Layout;



const BasicLayout = (props) => {
  const location = useLocation();
  const { openRoute } = useTabRouteModel();
  useMount(() => {
    console.log(location);
    openRoute(location.pathname);
  })
  return (
    <Layout>
      <SiderMenu
        logo={applogo}
      />
      <Layout>
        <Header style={{ padding: 0 }}>
          <GlobalHeader logo={applogo} />
        </Header>
        <Content className="globalTabs" style={{ margin: "2px 0px 0px", height: "100%" }}>
          <TabRoute />
          {/* <AppRoutes /> */}
        </Content>
        <Footer style={{ padding: 0 }}>
          <GlobalFooter
            links={[
              {
                key: "Pro 首页",
                title: "Pro 首页",
                href: "",
                blankTarget: true
              },
              {
                key: "github",
                href: " ",
                blankTarget: true
              },
              {
                key: "Ant X-plat",
                title: "Ant X-plat",
                href: "",
                blankTarget: true
              }
            ]}
            copyright={(
              <>
                Copyright <CopyrightOutlined /> 2020 XX信息中心 信息系统组出品
              </>
            )}
          />
        </Footer>
      </Layout>
    </Layout>
  )
}


export default BasicLayout;
