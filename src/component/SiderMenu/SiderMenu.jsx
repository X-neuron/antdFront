import React, { useState, useEffect } from 'react';

import { Menu, Layout } from 'antd';
import { Link } from '@reach/router';
import { useCreation, usePersistFn } from '@umijs/hooks';
import getAntdIcon from '@/config/icons';

import useLocalesModel from '@/models/useLocales';
import useRouteConfigModel from '@/models/useRouteConfig';
import useTabsModel from '@/models/useTabs';
import styles from './index.less';
// import './index.less';
// const { Sider } = Layout;
const { SubMenu } = Menu;
const { Sider } = Layout;

function SiderMenu(props) {
  const { logo, collapsed, menuToggle } = props;
  const { intl, curLocale } = useLocalesModel();
  const [routeConfig] = useRouteConfigModel();
  const { activeKey, openRoute } = useTabsModel();
  // config 为menu的配置 形如：
  // config = [
  //   {
  //     title: 'menu-welcome',
  //     key: '/',
  //     icon: 'HomeOutLined',
  //     subs: [
  //       ...
  //     ]
  //   }
  // ]

  // Allow menu.js config icon as string or ReactNode
  //   icon: 'setting',  //默认转成 config/icons里导入的对应icon
  //   icon: 'http://demo.com/icon.png',
  //   icon: <Icon type="setting" />,
  const getIcon = usePersistFn(iconStr => {
    if (typeof iconStr === 'string' && iconStr.indexOf('http') === 0) {
      return <img src={iconStr} alt="icon" className={`${styles.icon} sider-menu-item-img`} />;
    }
    if (typeof iconStr === 'string') {
      // return <Icon component="caseIconStr" />;
      return getAntdIcon(iconStr);
    }
    return iconStr;
  });

  const getSubMenu = (menuConfig) => menuConfig.map(item => {
    const cprops = {
      name: item.name,
      title: item.icon ? (
        <span>
          {/* {getIcon(item.icon)} */}
          {getIcon(item.icon)}
          <span>{intl.get(item.name)}</span>
        </span>
      ) : (
          <>
            {intl.get(item.name)}
          </>
        )
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
        page={item.page}
        key={item.key}
      >
        <Link to={item.key}>
          {intl.get(item.name)}
        </Link>
      </Menu.Item>
    )
  });

  const subMenu = useCreation(() => getSubMenu(routeConfig.menuConfig), [routeConfig, curLocale]);
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
        <Link to="/">
          {/* <AppLogo /> */}
          <img src={logo} alt="logo" />
          <h1>X-Plat Antd Front</h1>
        </Link>
      </div>
      <Menu
        key="sliderMenu"
        theme="dark"
        mode="inline"
        multiple={false}
        selectedKeys={[activeKey]}
        onClick={({ item, key }) => openRoute(key, item.props.page, item.props.name)}
        style={{ padding: '16px 0', width: '100%' }}
      >
        {subMenu}
      </Menu>
    </Sider>
  );
}

export default SiderMenu;
