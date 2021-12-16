import { Menu, Dropdown } from "antd";
import { ClickParam } from "antd/es/menu";
import { DropDownProps } from "antd/es/dropdown";
import { useRecoilState } from "recoil";
import { locales, curLangAtom } from "@/atoms/locale";

const HeaderDropdown = function({ overlayClassName: cls, ...restProps }) {
  return <Dropdown overlayClassName={cls} {...restProps} />
}

// const locales = {
//   "zh_CN":{
//     name:"简体中文",
//     icons:'🇨🇳',
//     UILocale:zhCN
//   },
//   "en_US":{
//     name:"英文",
//     icons:'🇺🇸',
//     UILocale:enUS
//   },
// }

const SelectLang = function(props) {
  const { ...restProps } = props;

  const [curLang, setCurLang] = useRecoilState(curLangAtom);

  const inlineStyle = {
    cursor: "pointer",
    padding: "12px",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 18,
    verticalAlign: "middle",
  };

  const menuItemStyle = { minWidth: "160px" };

  const handleClick = ({ key }) => {
    if (key !== curLang) {
      setCurLang(key);
    }
  };

  const langMenu = (
    <Menu selectedKeys={curLang} onClick={handleClick}>
      {Object.keys(locales).map((lang) => (
        <Menu.Item key={lang} style={menuItemStyle}>
          <span role="img" aria-label={locales[lang].name}>
            {locales[lang].icon || "🌐"}
          </span>
          {locales[lang].name}
        </Menu.Item>
      ))}
    </Menu>
  );

  return (
    <HeaderDropdown overlay={langMenu} placement="bottomRight" {...restProps}>
      <span style={inlineStyle}>
        {/* <i className="anticon" title={allLangUIConfig[selectedLang]?.title}> */}
        <i className="anticon">
          <svg
            viewBox="0 0 24 24"
            focusable="false"
            width="1em"
            height="1em"
            fill="currentColor"
            aria-hidden="true"
          >
            <path d="M0 0h24v24H0z" fill="none" />
            <path
              d="M12.87 15.07l-2.54-2.51.03-.03c1.74-1.94 2.98-4.17 3.71-6.53H17V4h-7V2H8v2H1v1.99h11.17C11.5 7.92 10.44 9.75 9 11.35 8.07 10.32 7.3 9.19 6.69 8h-2c.73 1.63 1.73 3.17 2.98 4.56l-5.09 5.02L4 19l5-5 3.11 3.11.76-2.04zM18.5 10h-2L12 22h2l1.12-3h4.75L21 22h2l-4.5-12zm-2.62 7l1.62-4.33L19.12 17h-3.24z "
              className="css-c4d79v"
            />
          </svg>
        </i>
      </span>
    </HeaderDropdown>
  );
}

export default SelectLang;
