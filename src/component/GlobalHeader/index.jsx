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
import SelectLang from '@/component/SelectLang';
import { Link } from '@reach/router';
import { useSiderMenuToggleModel } from '@/models/useToggle';
import useMediaModel from '@/models/useMedia';
import AvatarMenu from './AvatarDropdown';
// import HeaderSearch from "../HeaderSearch";
import styles from './index.less';
// import className from 'classnames';

function GlobalHeader(props) {
  // const { avatar } = props
  const sider = useSiderMenuToggleModel();
  const isMobile = useMediaModel();
  const { logo } = props;
  return (
    <div className={styles.header}>
      {isMobile && [
        <Link to="/" className={styles.logo} key="logo">
          <img src={logo} alt="logo" width="32" />
        </Link>,
        <Divider type="vertical" key="line" />
      ]}
      <span className={styles.triggle}>
        {
          sider.state
            ? <MenuUnfoldOutlined onClick={sider.setFalse} />
            : <MenuFoldOutlined onClick={sider.setTrue} />
        }
      </span>
      <div className={styles.right}>
        <AvatarMenu />
        <SelectLang className={styles.action} />
        {/* <Spin size="small" style={{ marginLeft: 8 }} /> */}
      </div>
    </div>
  );
}
export default GlobalHeader;
