import { QuestionCircleOutlined } from "@ant-design/icons";
import { i18n } from "@lingui/core";
import { t } from "@lingui/macro";
import { Switch, Tooltip } from "antd";
import React from "react";
import { useRecoilState } from "recoil";

import { tabsModelAtom } from "@/atoms/tabsModel";
import SelectLang from "@/components/SelectLang";

import Avatar from "./AvatarDropdown";
import styles from "./index.less";

const inlineStyle = {
  cursor: "pointer",
  padding: "12px",
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: 18,
  verticalAlign: "middle",
};

const GlobalHeaderRight: React.FC = () => {
  const className = `${styles.right}  ${styles.dark}`;

  const [tabsModel, setTabsModel] = useRecoilState(tabsModelAtom);

  const onChangetabsModel = (checked: boolean) => {
    setTabsModel(checked);
  };

  return (
    <div className={className}>
      <div style={inlineStyle}>
        <Switch
          onChange={onChangetabsModel}
          checkedChildren={i18n._(t`多标签`)}
          unCheckedChildren={i18n._(t`单页`)}
          defaultChecked={tabsModel}
        />
      </div>
      <Tooltip title="使用文档">
        <a
          style={{
            color: "inherit",
          }}
          target="_blank"
          href="https://pro.ant.design/docs/getting-started"
          rel="noopener noreferrer"
          className={styles.action}
        >
          <QuestionCircleOutlined />
        </a>
      </Tooltip>
      <Avatar />
      <SelectLang />
    </div>
  );
};

export default GlobalHeaderRight;
