
import { useState,Suspense } from 'react';
import { useOutlet,useNavigate,useLocation,matchRoutes,useRoutes } from "react-router-dom";
import ProLayout,{SettingDrawer} from '@ant-design/pro-layout';
import PageLoading from "@/components/PageLoading";
import defaultSettings from '@ant-design/pro-layout/es/defaultSettings';
import { RightContent } from '@/components/GlobalHeader';
import  GlobalFooter from '@/components/GlobalFooter';
import { Result, Button } from 'antd';
import TabRoute from '@/components/TabRoute';

import { Link } from 'react-router-dom';
import logo from '@/assets/logo.svg';
import styles from './BasicLayout.less';

import { useRecoilValue,useRecoilState} from 'recoil';
import { dynamicRouteAtom } from '@/atoms/route';
import { activeKeyAtom } from '@/atoms/activeKey';

const BasicLayout = (props) => {
  const [settings, setSetting] = useState(defaultSettings);
  // const [activeKeys,setActiveKeys] = useState(undefined);
  // const ele = useOutlet();
  const navigate = useNavigate();
  const route = useRecoilValue(dynamicRouteAtom);
  const [activeKey,setActiveKey] = useRecoilState(activeKeyAtom);
  // 修复bug后，可同步修改此处、
  // const dynamicRoute = useRecoilValue(dynamicRouteAtom);
  // const ele = matchRoutes(appRoute, '/ab/a');
  // const ele = useRoutes(route);
  return (
    <div id='prolayout'>
      <ProLayout
        style={{
          height: '100vh',
        }}
        menuDataRender={() => route}
        menuItemRender={(item, dom) => <div onClick={() => {
          setActiveKey(item.key);
          navigate(item.path,{replace:true});
        }}> {dom}</div>}
        selectedKeys={[activeKey]}
        // subMenuItemRender={(_, dom) => <div>pre {dom}</div>}
        menuHeaderRender={() => (
          <div
            id="customize_menu_header" className={styles.logo}
            onClick={() => {
              window.open('www.baidu.com');
            }}
          >
            <img src={logo} />
            <h1>XX 系统?</h1>
          </div>
        )}
        rightContentRender={() => <RightContent />}
        // {...defaultProps}
        location={{
          pathname: '/welcome',
        }}
        {...settings}
        >
          {/* <PageContainer content="欢迎使用">Hello World</PageContainer> */}
          <Suspense fallback={<PageLoading />} >
            {/* <TabRoute  ele={ele} route={route} /> */}
            <TabRoute  route={route} />
            {/* {ele} */}
          </Suspense>
        </ProLayout>
         <SettingDrawer
         getContainer={() => document.getElementById('prolayout')}
         settings={settings}
         onSettingChange={(changeSetting) => setSetting(changeSetting)}
        />
     </div>
      
  );
};

export default BasicLayout;
