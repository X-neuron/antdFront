import { GlobalOutlined } from '@ant-design/icons';
import { Menu } from 'antd';
// import { getLocale, setLocale } from 'umi-plugin-react/locale';
import React from 'react';
// import classNames from 'classnames';
import useLocalesModel from '@/models/useLocales';
import HeaderDropdown from '@/component/HeaderDropdown';
import styles from './index.less';

// Locales datas like this
// const Locales = [
//   {
//     name: '简体中文',
//     value: 'zh-CN',
//     icons: '🇨🇳'
//   },
//   {
//     name: 'English',
//     value: 'en-US',
//     icons: '🇺🇸'
//   }
// ]

const SelectLang = () => {
  const { Locales, curLocale, changeCurLocale } = useLocalesModel();
  const langMenu = (
    <Menu
      className={styles.menu}
      selectedKeys={curLocale}
      onClick={({ key }) => changeCurLocale(key)}
    >
      {Locales.map(locale => (
        <Menu.Item key={locale.value}>
          <span role="img" aria-label={locale.name}>
            {locale.icons}
          </span>{' '}
          {locale.name}
        </Menu.Item>
      ))}
    </Menu>
  );
  return (
    <HeaderDropdown overlay={langMenu} placement="bottomRight">
      <span className={styles.dropDown}>
        <GlobalOutlined title="语言" />
      </span>
    </HeaderDropdown>
  );
};

export default SelectLang;
