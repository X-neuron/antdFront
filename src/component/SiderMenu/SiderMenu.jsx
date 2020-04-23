import React, { useState, useEffect } from 'react';
// import Menu, { Slider, Layout } from 'antd';
import { Menu, Layout } from 'antd';
import { Link } from '@reach/router';
import useLocalesModel from '@/models/useLocales';
// import { HomeOutlined, AppstoreOutlined, CompassOutlined } from '@ant-design/icons';
import useRouteConfigModel from '@/models/useRouteConfig';
import { useCreation, usePersistFn } from '@umijs/hooks';
// import { InfoCircleFilled } from '@ant-design/icons';
import getAntdIcon from '@/config/icons';
import styles from './index.less';

// import './index.less';
// const { Sider } = Layout;
const { SubMenu } = Menu;
const { Sider } = Layout;

function SiderMenu(props) {
  const { logo, collapsed, menuToggle } = props;
  const { intl, curLocale } = useLocalesModel();
  const { config } = useRouteConfigModel();
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
    console.log('menuRefresh')
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
    if (item.subs) {
      return (
        <SubMenu
          title={
            item.icon ? (
              <span>
                {/* {getIcon(item.icon)} */}
                {getIcon(item.icon)}
                <span>{intl.get(item.title)}</span>
              </span>
            ) : (
                <>
                  {intl.get(item.title)}
                </>
              )
          }
          key={item.key}
        >
          {getSubMenu(item.subs)}
        </SubMenu>
      )
    }
    return (
      <Menu.Item
        key={item.key}
      >
        <Link to={item.key}>
          {intl.get(item.title)}
        </Link>
      </Menu.Item>
    )
  });

  const subMenu = useCreation(() => getSubMenu(config.menuConfig), [config, curLocale]);
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
        // selectKeys={selectKeys}
        style={{ padding: '16px 0', width: '100%' }}
      >
        {subMenu}
        {/* <SubMenu title={(
          <span>
            <HomeOutlined />
            <span>{intl.get('T1')}</span>
          </span>
        )}
        >
          <Menu.Item>
            <Link to="/">
              <HomeOutlined />
              {intl.get('ST1')}
            </Link>
          </Menu.Item>
          <Menu.Item>
            <Link to="/a">
              <AppstoreOutlined />
              {intl.get('ST2')}
            </Link>
          </Menu.Item>
          <Menu.Item>
            <Link to="/b">
              <CompassOutlined />
              {intl.get('ST3')}
            </Link>
          </Menu.Item>
        </SubMenu> */}
      </Menu>
    </Sider>
  );
}

export default SiderMenu;
