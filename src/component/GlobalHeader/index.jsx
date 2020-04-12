import React, { useState } from 'react';
import {
  Menu,
  // Icon,
  Spin,
  Tag,
  Dropdown,
  Avatar,
  Divider,
  Tooltip
} from 'antd';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { Link } from '@reach/router';
import useMenuToggleModel from '../../models/useMenuToggle';
// import HeaderSearch from "../HeaderSearch";
import styles from './index.less';
// import className from 'classnames';

const menu = (
  <Menu className={styles.menu} selectedKeys={[]}>
    <Menu.Item disabled>
      {/* <Icon type="user" /> */}
      个人中心
    </Menu.Item>
    <Menu.Item disabled>
      {/* <Icon type="setting" /> */}
      设置
    </Menu.Item>
    <Menu.Divider />
    <Menu.Item key="logout">
      {/* <Icon type="logout" /> */}
      退出登录
    </Menu.Item>
  </Menu>
);

function GlobalHeader(props) {
  const { avatar } = props
  const sider = useMenuToggleModel();
  return (
    <div className={styles.header}>
      <div className={styles.left}>
        {
          sider.menuToggle
            ? <MenuUnfoldOutlined onClick={sider.toggleMenu} />
            : <MenuFoldOutlined onClick={sider.toggleMenu} />
        }
      </div>
      <div className={styles.right}>
        <Dropdown overlay={menu}>
          <span className={`${styles.action} ${styles.account}`}>
            <Avatar size="small" className={styles.avatar} />
            {/* <span className={styles.name}>{currentUser.name}</span> */}
          </span>
        </Dropdown>
        {/* <Spin size="small" style={{ marginLeft: 8 }} /> */}
      </div>
    </div>
  );
}
export default GlobalHeader;
