import { GlobalOutlined } from "@ant-design/icons";
import { Menu } from "antd";
// import classNames from 'classnames';
import useLocaleModel from "@/models/useLocale";
import classNames from "classnames";
import HeaderDropdown from "@/components/HeaderDropdown";
import styles from "./index.less";

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

const SelectLang = (props) => {
  const { className } = props;
  const { Locales, curLocale, changeCurLocale } = useLocaleModel();
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
          </span>{" "}
          {locale.name}
        </Menu.Item>
      ))}
    </Menu>
  );
  return (
    <HeaderDropdown overlay={langMenu} placement="bottomRight">
      <span className={classNames(styles.dropDown, className)}>
        <GlobalOutlined title="语言" />
      </span>
    </HeaderDropdown>
  );
};

export default SelectLang;
