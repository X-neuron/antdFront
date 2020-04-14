import React from 'react';
import { LogoutOutlined, SettingOutlined, UserOutlined } from '@ant-design/icons';
import { Avatar, Menu, Spin } from 'antd';

import HeaderDropdown from '@/component/HeaderDropdown';
import styles from './index.less';


const menuHeaderDropdown = (
  <Menu className={styles.menu}>

    <Menu.Item key="center">
      <UserOutlined />
      个人中心
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

function AvatarDropdown(props) {
  // const {
  //   currentUser = {
  //     avatar: '',
  //     name: ''
  //   },
  //   menu
  // } = props;
  return (
    <HeaderDropdown overlay={menuHeaderDropdown}>
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
