import { Menu, Layout } from "antd";
import { useCreation, usePersistFn } from "@umijs/hooks";
import getAntdIcon from "@/config/icons";

import useLocaleModel from "@/models/useLocale";
import useTabRouteModel from "@/models/useTabRoute";
import styles from "./index.less";

const { SubMenu } = Menu;
const { Sider } = Layout;

function SiderMenu(props) {
  const { logo, collapsed, menuToggle } = props;
  const { intl, curLocale } = useLocaleModel();
  const { activeKey, openRoute, menuTabConfig } = useTabRouteModel();

  const getIcon = usePersistFn(iconStr => {
    if (typeof iconStr === "string" && iconStr.indexOf("http") === 0) {
      return <img src={iconStr} alt="icon" className={`${styles.icon} sider-menu-item-img`} />;
    }
    if (typeof iconStr === "string") {
      // return <Icon component="caseIconStr" />;
      return getAntdIcon(iconStr);
    }
    return iconStr;
  });

  const getSubMenu = (menuConfig) => menuConfig.map(item => {
    const cprops = {
      name: item.name,
      icon: getIcon(item.icon),
      title: item.page ? (
        <>
          {intl.get(item.name)}
        </>
      ) : (
        <span>
          <span>{intl.get(item.name)}</span>
        </span>
      ),
    }
    if (item.subs) {
      return (
        <SubMenu {...cprops} key={item.key}>
          {getSubMenu(item.subs)}
        </SubMenu>
      )
    }
    return (
      <Menu.Item
        {...cprops}
        key={item.key}
      >
        {intl.get(item.name)}
      </Menu.Item>
    )
  });
  const subMenu = useCreation(() => getSubMenu(menuTabConfig.menus), [menuTabConfig, curLocale]);
  // const subMenu = getSubMenu(config.menuConfig);
  return (
    <Sider
      className={styles.sider}
      trigger={null}
      collapsible
      collapsed={collapsed !== undefined ? collapsed : menuToggle}
      breadpoint="lg"
      width={256}
    >
      <div className={styles.logo} key="appLogo">
        {/* <AppLogo /> */}
        <img src={logo} alt="logo" />
        <h1>X-Plat Antd Front</h1>
      </div>
      <Menu
        key="sliderMenu"
        theme="dark"
        mode="inline"
        multiple={false}
        selectedKeys={[activeKey]}
        onClick={({ key }) => openRoute(key)}
        style={{ padding: "16px 0", width: "100%" }}
      >
        {subMenu}
      </Menu>
    </Sider>
  );
}
export default SiderMenu;
