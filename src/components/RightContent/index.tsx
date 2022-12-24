
import { useEmotionCss } from "@ant-design/use-emotion-css";
import React from "react";
import { i18n } from "@lingui/core";
import { t } from "@lingui/macro";
import {  Switch } from "antd";
import { useRecoilState } from "recoil";
import { tabsModelAtom } from "@/atoms/tabsModel";
import Avatar from "./AvatarDropdown";
import SelectLang from "../SelectLang";

export type SiderTheme = "light" | "dark";

const GlobalHeaderRight: React.FC = () => {
  const className = useEmotionCss(() => ({
    display: "flex",
    height: "48px",
    marginLeft: "auto",
    overflow: "hidden",
    gap: 8,
  }));

  const actionClassName = useEmotionCss(({ token }) => ({
    display: "flex",
    float: "right",
    height: "48px",
    marginLeft: "auto",
    overflow: "hidden",
    cursor: "pointer",
    padding: "0 12px",
    borderRadius: token.borderRadius,
    "&:hover": {
      backgroundColor: token.colorBgTextHover,
    },
  }));

  const [tabsModel, setTabsModel] = useRecoilState(tabsModelAtom);
  const onChangetabsModel = (checked) => {
    setTabsModel(checked);
  };

  return (
    <div className={className}>
      <div style={{
        cursor: "pointer",
        padding: "12px",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: 18,
        verticalAlign: "middle",
      }}
      >
        <Switch
          onChange={onChangetabsModel}
          checkedChildren={i18n._(t`多标签`)}
          unCheckedChildren={i18n._(t`单页`)}
          defaultChecked={tabsModel}
        />
      </div>
      <Avatar />
      <SelectLang className={actionClassName} />
    </div>
  );
};
export default GlobalHeaderRight;
