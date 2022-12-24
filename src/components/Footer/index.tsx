import { GithubOutlined } from "@ant-design/icons";
import { DefaultFooter } from "@ant-design/pro-components";
import React from "react";

const Footer: React.FC = () => {

  const currentYear = new Date().getFullYear();

  return (
    <DefaultFooter
      style={{
        background: "none",
      }}
      copyright={`${currentYear} XXX技术部出品`}
      links={[
        {
          key: "your app name",
          title: "AntdFront",
          href: "https://youappaddress.com",
          blankTarget: true,
        },
        {
          key: "github",
          title: <GithubOutlined />,
          href: "https://github.com/ant-design/ant-design-pro",
          blankTarget: true,
        },
        {
          key: "Ant Design",
          title: "Ant Design",
          href: "https://ant.design",
          blankTarget: true,
        },
      ]}
    />
  );
};

export default Footer;
