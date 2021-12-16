import {
  LogoutOutlined,
  SettingOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Avatar, Menu, Spin } from "antd";
import { Trans } from "@lingui/macro";
import { useRecoilState } from "recoil";
import { useNavigate } from "react-router-dom";
import HeaderDropdown from "../HeaderDropdown";
import styles from "./index.less";
import { loginStateAtom } from "@/atoms/login";
import { dynamicConfigAtom } from "@/atoms/route";
import { accessAtom } from "@/atoms/access";

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
        component: "http://localhost:8001", // 微前端配置
      },
    ],
  },
];

const AvatarDropdown = function(props) {
  const { menu } = props;
  const [login, setLogin] = useRecoilState(loginStateAtom);
  const [dynamicRouteConfig, setDynamicRouteConfig] =
    useRecoilState(dynamicConfigAtom);
  const [access, setAccess] = useRecoilState(accessAtom);
  const navigate = useNavigate();
  const handleChangeRole = () => {
    setAccess({
      microOpen: true,
      test1Open: true,
      test4Open: true,
      logionPermit: true,
      // 'example': role === 'admin',
      // 'example2': some => some.prop === 'test'
    });
    setDynamicRouteConfig(newConfig);
    navigate(newConfig[0].path, { replace: true });
  };

  const logout = () => {
    setLogin({
      ...login,
      isLogin: false,
    });
  };

  const menuHeaderDropdown = (
    <Menu className={styles.menu} selectedKeys={[]}>
      <Menu.Item key="changeRole" onClick={() => handleChangeRole()}>
        <UserOutlined />
        <Trans>切换角色</Trans>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="logout" onClick={() => logout()}>
        <LogoutOutlined />
        <Trans>退出登录</Trans>
      </Menu.Item>
    </Menu>
  );

  return (
    <HeaderDropdown overlay={menuHeaderDropdown}>
      <span className={`${styles.action} ${styles.account}`}>
        <Avatar
          size="small"
          className={styles.avatar}
          style={{ backgroundColor: "#ffbf00", verticalAlign: "middle" }}
          alt="avatar"
        >
          {login.account}
        </Avatar>
        {/* <span className={`${styles.name} anticon`}>{login.account}</span> */}
      </span>
    </HeaderDropdown>
  );

  // return currentUser && currentUser.name ? (
  //   <HeaderDropdown overlay={<MenuHeaderDropdown />}>
  //     <span className={`${styles.action} ${styles.account}`}>
  //       <Avatar size="small" className={styles.avatar} style={{ backgroundColor: "#f56a00", verticalAlign: 'middle' }} alt="avatar" >
  //         {login.account}
  //       </Avatar>
  //       {/* <span className={`${styles.name} anticon`}>{useName}</span> */}
  //     </span>
  //   </HeaderDropdown>
  // ) : (
  //   <span className={`${styles.action} ${styles.account}`}>
  //     <Spin
  //       size="small"
  //       style={{
  //         marginLeft: 8,
  //         marginRight: 8,
  //       }}
  //     />
  //   </span>
  // );
}

export default AvatarDropdown;
