
import React from "react";
import { useRecoilState } from "recoil";

import { curLangAtom, locales } from "@/atoms/locale";

import HeaderDropdown from "../HeaderDropdown";

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

const SelectLang: React.FC<Record<string, any>> = (props) => {
  const { style,restProps } = props;
  const [curLang, setCurLang] = useRecoilState(curLangAtom);

  const inlineStyle = {
    cursor: "pointer",
    padding: "12px",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 18,
    verticalAlign: "middle",
    ...style,
  };

  const menuItemStyle = { minWidth: "160px" };
  const menuItemIconStyle = { marginRight: "8px" };

  const handleClick = ({ key }: { key: string }) => {
    if (key !== curLang) {
      setCurLang(key);
    }
  };

  const langMenu = {
    selectedKeys: [curLang],
    onClick: handleClick,
    items: Object.keys(locales).map((lang) => ({
      key: lang,
      style: menuItemStyle,
      label: (
        <>
          <span role="img" aria-label={locales[lang].name || "en-US"} style={menuItemIconStyle}>
            {locales[lang].icon || "🌐"}
          </span>
          {locales[lang].name || "en-US"}
        </>
      ),
    })),

  }

  const dropdownProps = {menu: langMenu}

  return (
    <HeaderDropdown {...dropdownProps} placement="bottomRight" {...restProps}>
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
};

export default SelectLang;
