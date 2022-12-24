
import React from "react";
import { LogoutOutlined, SettingOutlined, UserOutlined } from "@ant-design/icons";
import { useEmotionCss } from "@ant-design/use-emotion-css";
import { Avatar, Spin,message } from "antd";
import { setAlpha } from "@ant-design/pro-components";
// import type { MenuInfo } from "rc-menu/lib/interface";
// import { flushSync } from "react-dom";
// import { Trans } from "@lingui/macro";
import { useRecoilState } from "recoil";
import { useNavigate } from "react-router-dom";
import { loginStateAtom } from "@/atoms/login";
import { accessAtom } from "@/atoms/access";
import HeaderDropdown from "../HeaderDropdown";


const newConfig = [
  {
    name: "测试1",
    path: "/a-new-address", // 解析为/ab/a
    component: "test1", // page 建议使用小写，内部会转换成大写,对应到组件上。权限配置中与此保持一致
    access: "test1Open",
  },
  {
    name: "测试4",
    path: "/counter", // 解析为/c
    component: "test4",
    access: "test4Open",
  },
  {
    name: "微前端",
    path: "/micro",
    icon: "PaperClipOutlined",
    children: [
      {
        name: "vue2测试",
        path: "vue2/*",
        access: "microOpen",
        component: "http://localhost:8004", // 微前端配置
      },
    ]
  }
];

export type GlobalHeaderRightProps = {
  menu?: boolean;
};


const AvatarDropdown: React.FC<GlobalHeaderRightProps> = ({ menu }) => {
  const [login, setLogin] = useRecoilState(loginStateAtom);
  const [access, setAccess] = useRecoilState(accessAtom);
  const navigate = useNavigate();
  const handleChangeRole = () => {
    console.log("handleroles")
    setAccess({
      microOpen: true,
      test1Open: true,
      test4Open: true,
      logionPermit: true,
      // 'example': role === 'admin',
      // 'example2': some => some.prop === 'test'
    });
    // setLogin({
    //   ...login,
    //   route: newConfig,
    // });
    // navigate(newConfig[0].path, { replace: true });
  };

  const userLogout = async () => {
    setLogin({
      ...login,
      isLogin:false
    })
  };

  const AvatarLogo = () => {

    const avatarClassName = useEmotionCss(({ token }) => ({
      marginRight: "8px",
      color: token.colorPrimary,
      verticalAlign: "top",
      background: setAlpha(token.colorBgContainer, 0.85),
      [`@media only screen and (max-width: ${token.screenMD}px)`]: {
        margin: 0,
      },
    }));

    return <Avatar size="small" className={avatarClassName} src={login.avatar} alt="avatar" />;
  };

  const Name = () => {

    const nameClassName = useEmotionCss(({ token }) => ({
      width: "48px",
      height: "48px",
      overflow: "hidden",
      lineHeight: "48px",
      whiteSpace: "nowrap",
      textOverflow: "ellipsis",
      [`@media only screen and (max-width: ${token.screenMD}px)`]: {
        display: "none",
      },
    }));

    return <span className={`${nameClassName} anticon`}>{login.account}</span>;
  };

  const actionClassName = useEmotionCss(({ token }) => ({
    display: "flex",
    height: "48px",
    marginLeft: "auto",
    overflow: "hidden",
    alignItems: "center",
    padding: "0 8px",
    cursor: "pointer",
    borderRadius: token.borderRadius,
    "&:hover": {
      backgroundColor: token.colorBgTextHover,
    },
  }));

  const menuItems = [
    {
      key: "center",
      icon: <UserOutlined />,
      label: "个人中心",
    },
    {
      key: "settings",
      icon: <SettingOutlined />,
      label: "个人设置",
    },
    {
      label:"切换角色--更换权限",
      icon: <UserOutlined />,
      key:"changerole",
    },
    {
      type: "divider" as const,
    },
    {
      key: "logout",
      icon: <LogoutOutlined />,
      label: "退出登录",
    }
  ];

  const onMenuClick = ({key}) => {
    if(key === "changerole") {
      handleChangeRole();
    }else{
      userLogout();
    }
  }

  return (
    <HeaderDropdown
      menu={{
        selectedKeys: [],
        onClick: onMenuClick,
        items: menuItems,
      }}
    >
      <span className={actionClassName}>
        <AvatarLogo />
        <Name />
      </span>
    </HeaderDropdown>
  );
};

export default AvatarDropdown;
