import React, { PureComponent } from 'react';
import {
  Menu,
  Icon,
  Spin,
  Tag,
  Dropdown,
  Avatar,
  Divider,
  Tooltip
} from 'antd';

// import HeaderSearch from "../HeaderSearch";
import styles from './index.less';

const menu = (
  <Menu className={styles.menu} selectedKeys={[]}>
    <Menu.Item disabled>
      <Icon type="user" />
      个人中心
    </Menu.Item>
    <Menu.Item disabled>
      <Icon type="setting" />
      设置
    </Menu.Item>
    <Menu.Divider />
    <Menu.Item key="logout">
      <Icon type="logout" />
      退出登录
    </Menu.Item>
  </Menu>
);

function GlobalHeader(props) {
  const {
    collapsed
  } = props;

  return (
    <div className={styles.header}>
      {/* <link to="/" className={styles.logo} key="logo">
        <img src={logo} alt="logo" width="32" />
      </link> */}
      <Divider type="vertical" key="line" />,
      <Icon
        className={styles.trigger}
        type={collapsed ? 'menu-unfold' : 'menu-fold'}
        // onClick={this.toggle}
      />
      <Tooltip title="使用文档">
        <a
          target="_blank"
          href="www.baidu.com"
          rel="noopener noreferrer"
          className={styles.action}
        >
          <Icon type="question-circle-o" />
        </a>
      </Tooltip>
      <Dropdown overlay={menu}>
        <span className={`${styles.action} ${styles.account}`}>
          <Avatar
            size="small"
            className={styles.avatar}
            // src={currentUser.avatar}
          />
          {/* <span className={styles.name}>{currentUsFer.name}</span> */}
        </span>
      </Dropdown>
      {/* <Spin size="small" style={{ marginLeft: 8 }} /> */}F
    </div>
  );
}
export default GlobalHeader;
