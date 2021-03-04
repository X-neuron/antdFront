import { Outlet,Link} from "react-router-dom";
import { CopyrightOutlined,GithubOutlined } from "@ant-design/icons";
import  GlobalFooter from '@/components/GlobalFooter';
import { useTitle } from 'ahooks';
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



const UserLayout = () => {
  useTitle('欢迎登陆科研档案管理系统');
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
              <span className={styles.title}>  科研档案管理系统  </span>
            </Link>
          </div>
          <div className={styles.desc}>科研档案管理系统 遵循 Ant Design 及 开放平台 设计规范</div>
        </div>
        <Outlet />
      </div>
      <GlobalFooter />
    </div>
  );
};

export default UserLayout;