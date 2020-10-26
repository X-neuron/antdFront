import { LogoutOutlined, SettingOutlined, UserOutlined } from "@ant-design/icons";
import { Avatar, Menu } from "antd";

import HeaderDropdown from "@/components/HeaderDropdown";
// import useRouteConfigModel from '@/models/useRouteConfig';
import useTabRouteModel from "@/models/useTabRoute";
import useAccessModel from "@/models/useAccess";
import { navigate } from "@reach/router";
import styles from "./index.less";



const newRoutes = [
  {
    path: "/",
    name: "menu-welcome",
    icon: "HomeOutlined",
    authority: ["admin", "user"],
    page: "dashboard"
  },
  {
    // 带subs的 为下拉列表，无需路由，自动忽略page属性。 故允许配置为'/'，作为指定子路由的根路由,作为siderMenu的Key,内部计数+1
    name: "Micro-front",
    path: "/",
    icon: "BarsOutlined",
    subs: [
      {
        name: "React16",
        path: "reac16",
        access: "microOpen",
        page: "http://localhost:8002"
      },
      {
        name: "changeAname-vue2",
        path: "newpathvue2",
        access: "microOpen",
        page: "http://localhost:8001",
        // redirect: '/',
      },
    ]
  },

];



function AvatarDropdown(props) {
  const { changeMenuTabConfig } = useTabRouteModel();
  const { updateAccess } = useAccessModel()
  // const location = useLocation();
  // const {
  //   currentUser = {
  //     avatar: '',
  //     name: ''
  //   },
  //   menu
  // } = props;
  const logout = () => {
    // 省略注销状态。
    navigate("/user/login");
  }

  const handleChangeRole = () => {
    updateAccess({
      test1Open: true,
      test3Open: false,
      adminSubmit: true,
      // 'example': role === 'admin',
      // 'example2': some => some.prop === 'test'
    });
    changeMenuTabConfig(newRoutes)
  }
  return (
    <HeaderDropdown overlay={(
      <Menu className={styles.menu}>

        <Menu.Item key="center" onClick={() => handleChangeRole()}>
          <UserOutlined />
          切换角色
        </Menu.Item>
        <Menu.Item key="settings">
          <SettingOutlined />
          个人设置
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item key="logout" onClick={() => logout()}>
          <LogoutOutlined />
          退出登录
        </Menu.Item>
      </Menu>
    )}
    >
      <span className={`${styles.action} ${styles.account}`}>
        <Avatar size="small" className={styles.avatar} alt="avatar" />
        <span className={styles.name}>
          我是测试
        </span>
      </span>
    </HeaderDropdown>
  )
}

export default AvatarDropdown;
