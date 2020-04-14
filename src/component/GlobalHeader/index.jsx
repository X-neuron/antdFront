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
import useMenuToggleModel from '@/models/useMenuToggle';
import AvatarMenu from './AvatarDropdown';
// import HeaderSearch from "../HeaderSearch";
import styles from './index.less';
// import className from 'classnames';


function GlobalHeader(props) {
  // const { avatar } = props
  const sider = useMenuToggleModel();
  return (
    <div className={styles.header}>
      <span className={styles.triggle}>
        {
          sider.menuToggle
            ? <MenuUnfoldOutlined onClick={sider.toggleMenu} />
            : <MenuFoldOutlined onClick={sider.toggleMenu} />
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
