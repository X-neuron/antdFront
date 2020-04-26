import React from 'react';
import { LogoutOutlined, SettingOutlined, UserOutlined } from '@ant-design/icons';
import { Avatar, Menu, Spin } from 'antd';

import HeaderDropdown from '@/component/HeaderDropdown';
import useRouteConfigModel from '@/models/useRouteConfig';
import styles from './index.less';

const menuHeaderDropdown = (
  <Menu className={styles.menu}>

    <Menu.Item key="center">
      <UserOutlined />
      切换角色
    </Menu.Item>


    <Menu.Item key="settings">
      <SettingOutlined />
      个人设置
    </Menu.Item>

    <Menu.Divider />

    <Menu.Item key="logout">
      <LogoutOutlined />
      退出登录
    </Menu.Item>
  </Menu>
);

const newRoutes = [
  {
    path: '/',
    name: 'menu-welcome',
    icon: 'HomeOutlined',
    authority: ['admin', 'user'],
    page: 'dashboard'
  },
  {
    // 带subs的 为下拉列表，无需路由，自动忽略page属性。 故允许配置为'/'，作为指定子路由的根路由,作为siderMenu的Key,内部计数+1
    name: 'Micro-front',
    path: '/',
    icon: 'BarsOutlined',
    subs: [
      {
        name: 'react16',
        path: 'react16',
        authority: ['admin', 'user'],
        page: '//127.0.0.1:8002'
      },
      {
        name: 'vue2',
        path: 'vue2',
        authority: ['admin', 'user'],
        page: '//127.0.0.1:8001',
        // redirect: '/',
      },
    ]
  },

]

function AvatarDropdown(props) {
  const [, changeRouteConfig] = useRouteConfigModel();
  // const {
  //   currentUser = {
  //     avatar: '',
  //     name: ''
  //   },
  //   menu
  // } = props;
  return (
    <HeaderDropdown overlay={(
      <Menu className={styles.menu}>

        <Menu.Item key="center" onClick={() => changeRouteConfig(newRoutes)}>
          <UserOutlined />
          切换角色
        </Menu.Item>
        <Menu.Item key="settings">
          <SettingOutlined />
          个人设置
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item key="logout">
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
