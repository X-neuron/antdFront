
import { Suspense } from 'react';
import PageLoading from '@/components/PageLoading';
import { useSafeState } from 'ahooks';
import { useNavigate, Outlet, matchRoutes,useLocation } from 'react-router-dom';
import ProLayout, {
  SettingDrawer,
  PageContainer,
} from '@ant-design/pro-layout';
import defaultSettings from '@ant-design/pro-layout/es/defaultSettings';
import { RightContent } from '@/components/GlobalHeader';
import GlobalFooter from '@/components/GlobalFooter';
import TabRoute from '@/components/TabRoute';

import logo from '@/assets/logo.svg';
import styles from './BasicLayout.less';
import { useCreation } from 'ahooks';
import { curLangAtom } from '@/atoms/locale';
import { dynamicRouteAtom } from '@/atoms/route';
import { tabsModelAtom } from '@/atoms/tabsModel';
import { useRecoilValue, useRecoilState } from 'recoil';

import _ from 'lodash';
import { i18n } from '@lingui/core';
import memoized from 'nano-memoize';

// 从config里 把 匹配的信息 调出来
// 放这因为activekey 在 prolayout 和 tabroute之间共享。
const pickRoutes = memoized((routes, pathname) => {
  let matches = matchRoutes(routes, { pathname });
  const routeConfig = matches ? matches[matches.length - 1].route : null;
  return {
    routeConfig,
    // matchPath: matches ? matches.map(match => _.replace(match.route.path,'/*','')).join('/') : null // 解决下微端/*路径的问题
    matchPath: routeConfig ? _.replace(routeConfig.key, '/*', '') : null,
  };
});

//因为recoil生成的数据是readonly。所以深拷贝下。
const translateNameProperty = (route, locale) => {
  let newRoute = [];
  const transObjectName = (curRoute) => {
    let newCurRoute = { ...curRoute };
    if (newCurRoute.name) {
      newCurRoute.name = i18n._(newCurRoute.name);
    }
    if (newCurRoute.children) {
      let newChildren = [];
      newCurRoute.children.forEach((item) => {
        newChildren.push(transObjectName(item));
      });
      newCurRoute.children = newChildren;
    }
    return newCurRoute;
  };
  route.forEach((item) => {
    newRoute.push(transObjectName(item));
  });

  return newRoute;
};

const BasicLayout = (props) => {
  const location = useLocation();
  const [settings, setSetting] = useSafeState({
    ...defaultSettings,
    fixSiderbar: true,
    fixedHeader: true
  });
  const locale = useRecoilValue(curLangAtom);
  const tabsModel = useRecoilValue(tabsModelAtom);

  const navigate = useNavigate();

  const orgRoute = useRecoilValue(dynamicRouteAtom);

  //手工转换下
  // transDynamicConfigAtom 貌似无法触发prolayout 的menu 更新，深表痛心。
  const route = useCreation(
    () => translateNameProperty(orgRoute, locale),
    [orgRoute, locale],
  );

  const { routeConfig, matchPath } = pickRoutes(route, location.pathname);
  console.log('selectkey:', matchPath);
  // use activeKey  ouble render
  // const [activeKey,setActiveKey] = useRecoilState(activeKeyAtom);

  return (
    <div id="prolayout" key="prolayout">
      <ProLayout
        style={{
          height: '100vh',
        }}
        menuDataRender={() => route}
        menuItemRender={(item, dom) => (
          <div
            onClick={() => {
              // fullPath 为加工过 '/*' 的路径
              console.log(item);
              navigate(item.fullPath, { replace: true });
            }}
          >
            {' '}
            {dom}
          </div>
        )}
        selectedKeys={[matchPath]}
        // subMenuItemRender={(_, dom) => <div>pre {dom}</div>}
        menuHeaderRender={() => (
          <div
            id="customize_menu_header"
            className={styles.logo}
            onClick={() => {
              window.open('www.baidu.com');
            }}
          >
            <img src={logo} />
            <h1>Antd Front</h1>
          </div>
        )}
        // title="Antd Front"
        // logo={logo}
        // locale
        rightContentRender={() => <RightContent />}
        // {...defaultProps}
        // location={{
        //   pathname: '/welcome',
        // }}
        {...settings}
      >
        {/* <PageContainer> */}
          {tabsModel ? (
            <TabRoute
              route={route}
              routeConfig={routeConfig}
              matchPath={matchPath}
            />
          ) : (
            <Suspense fallback={<PageLoading />}>
              <Outlet />
            </Suspense>
          )}
        {/* </PageContainer> */}
      </ProLayout>
      <SettingDrawer
        getContainer={() => document.getElementById('prolayout')}
        settings={settings}
        disableUrlParams={true}
        onSettingChange={(changeSetting) => setSetting(changeSetting)}
      />
    </div>
  );
};

export default BasicLayout;
