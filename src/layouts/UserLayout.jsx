import { Outlet, Link } from "react-router-dom";
import { CopyrightOutlined, GithubOutlined } from "@ant-design/icons";
import { useTitle } from "ahooks";
import { i18n } from "@lingui/core";
import { t, Trans } from "@lingui/macro";
import GlobalFooter from "@/components/GlobalFooter";
import SelectLang from "@/components/SelectLang";
import logo from "@/assets/logo.svg";
import styles from "./UserLayout.less";


const links = [
  {
    key: "help",
    title: "帮助",
    href: "",
  },
  {
    key: "privacy",
    title: "隐私",
    href: "",
  },
  {
    key: "terms",
    title: "条款",
    href: "",
  },
];

const UserLayout = function() {
  useTitle(i18n._(t`欢迎使用AntdFront's 多标签模板`));
  return (
    <div className={styles.container}>
      <div className={styles.lang}>
        <SelectLang />
      </div>
      <div className={styles.content}>
        <div className={styles.top}>
          <div className={styles.header}>
            <Link to="/">
              <img alt="logo" className={styles.logo} src={logo} />
              <span className={styles.title}> Antd Front </span>
            </Link>
          </div>
          <div className={styles.desc}>
            <Trans>Antd Front 遵循 Ant Design 设计规范</Trans>
          </div>
        </div>
        <Outlet />
      </div>
      <GlobalFooter />
    </div>
  );
}

export default UserLayout;
