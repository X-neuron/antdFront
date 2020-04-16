import React, { useState, useEffect } from 'react';
// import Menu, { Slider, Layout } from 'antd';
import { Menu, Layout } from 'antd';
import { Link } from '@reach/router';
import useMenuToggleModel from '@/models/useMenuToggle';
import useLocalesModel from '@/models/useLocales';
import { HomeOutlined, AppstoreOutlined, CompassOutlined } from '@ant-design/icons';
import styles from './index.less';
// import './index.less';
// const { Sider } = Layout;
const { SubMenu } = Menu;
const { Sider } = Layout;

function SideMenu(props) {
  const { logo } = props;
  const sider = useMenuToggleModel();
  const { intl } = useLocalesModel();
  // const [collapsed, setCollapsed] = useState(false);
  return (
    <Sider
      className={styles.sider}
      trigger={null}
      collapsible
      collapsed={sider.menuToggle}
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
        <SubMenu title={(
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
        </SubMenu>
      </Menu>
    </Sider>
  );
}

export default SideMenu;
