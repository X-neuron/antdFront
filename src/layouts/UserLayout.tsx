import { i18n } from "@lingui/core";
import { t, Trans } from "@lingui/macro";
import { useTitle } from "ahooks";
import React from "react";
import type { CSSProperties } from "react";
import { Link, Outlet } from "react-router-dom";

import logo from "@/assets/logo.svg";
import bg from "@/assets/bg.svg";
import { LoginForm } from "@ant-design/pro-components";
import SelectLang from "@/components/SelectLang";
import { Button, Divider, Space } from "antd";
import {
  AlipayOutlined,
  LockOutlined,
  MobileOutlined,
  TaobaoOutlined,
  UserOutlined,
  WeiboOutlined,
} from "@ant-design/icons";

const iconStyles: CSSProperties = {
  color: "rgba(0, 0, 0, 0.2)",
  fontSize: "18px",
  verticalAlign: "middle",
  cursor: "pointer",
};

const UserLayout: React.FC = () => {
  useTitle(i18n._(t`欢迎使用AntdFront多标签模板`));
  return (
    <div >
      <div style={{
        float:"right"
      }}
      >
        <SelectLang />
      </div>
      <LoginForm
        backgroundimageurl={bg}
        logo={logo}
        title={i18n._(t`AntdFront`)}
        subTitle={i18n._(t`实验性多标签模板`)}
        submitter={{resetButtonProps: { type: "dashed"},submitButtonProps: { style: { display: "none", }}}}
        actions={
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <Divider plain>
              <span style={{ color: "#CCC", fontWeight: "normal", fontSize: 14 }}>
                其他登录方式
              </span>
            </Divider>
            <Space align="center" size={24}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "column",
                  height: 40,
                  width: 40,
                  border: "1px solid #D4D8DD",
                  borderRadius: "50%",
                }}
              >
                <AlipayOutlined style={{ ...iconStyles, color: "#1677FF" }} />
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "column",
                  height: 40,
                  width: 40,
                  border: "1px solid #D4D8DD",
                  borderRadius: "50%",
                }}
              >
                <TaobaoOutlined style={{ ...iconStyles, color: "#FF6A10" }} />
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "column",
                  height: 40,
                  width: 40,
                  border: "1px solid #D4D8DD",
                  borderRadius: "50%",
                }}
              >
                <WeiboOutlined style={{ ...iconStyles, color: "#333333" }} />
              </div>
            </Space>
          </div>
        }
        // activityConfig={{
        //   style: {
        //     boxShadow: "0px 0px 8px rgba(0, 0, 0, 0.2)",
        //     color: "#fff",
        //     borderRadius: 8,
        //     backgroundColor: "#1677FF",
        //   },
        //   title: "活动标题，可配置图片",
        //   subTitle: "活动介绍说明文字",
        //   action: (
        //     <Button
        //       size="large"
        //       style={{
        //         borderRadius: 20,
        //         background: "#fff",
        //         color: "#1677FF",
        //         width: 120,
        //       }}
        //     >
        //       去看看
        //     </Button>
        //   ),
        // }}
      >
        <Outlet />
      </LoginForm>
    </div>
  );
};

export default UserLayout;
