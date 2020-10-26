import loadable from "@loadable/component";
import { Link, Router } from "@reach/router";
import GlobalFooter from "@/components/GlobalFooter";
// import SelectLang from '@/components/SelectLang';
import { CopyrightOutlined } from "@ant-design/icons";
import PageLoading from "@/components/PageLoading";
import logo from "../assets/logo.svg";
import styles from "./UserLayout.less";



// const Login = lazy(() => import('@/pages/user/login'));
// const Register = lazy(() => import('@/pages/user/Register'));
const Login = loadable(() => import("@/pages/user/login"), {
  fallback: <PageLoading tip="组件加载中..." />,
});
const Register = loadable(() => import("@/pages/user/Register"), {
  fallback: <PageLoading tip="组件加载中..." />,
});
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

const copyright = (
  <>
    Copyright <CopyrightOutlined /> 2020 XX信息中心 信息系统组出品
  </>
);

const UserLayout = props => {
  // const {
  //   route = {
  //     routes: [],
  //   },
  // } = props;
  // const { routes = [] } = route;
  const {
    children,
    // location = {
    //   pathname: '',
    // },
  } = props;
  // const { formatMessage } = useIntl();
  // const { breadcrumb } = getMenuData(routes);
  // const title = getPageTitle({
  //   pathname: location.pathname,
  //   formatMessage,
  //   breadcrumb,
  //   ...props,
  // });

  return (
    <div className={styles.container}>
      <div className={styles.lang}>
        {/* <SelectLang /> */}
      </div>
      <div className={styles.content}>
        <div className={styles.top}>
          <div className={styles.header}>
            <Link to="/">
              <img alt="logo" className={styles.logo} src={logo} />
              <span className={styles.title}>  AntdFront  </span>
            </Link>
          </div>
          <div className={styles.desc}>AntdFront 遵循Ant Design Web 设计规范</div>
        </div>
        {/* <Suspense fallback={<PageLoading tip="loading" />}> */}
        <Router>
          <Login path="login" default />
          <Register path="register" />
        </Router>
        {/* </Suspense> */}

        {/* {children} */}
      </div>
      <GlobalFooter links={links} copyright={copyright} />
    </div>
  );
};

export default UserLayout;
