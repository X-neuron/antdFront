
import React, { useState } from 'react';
import ProLayout, {
  PageHeaderWrapper,
  SettingDrawer
} from '@ant-design/pro-layout';
// import defaultProps from './defaultProps';

export default () => {
  const [settings, setSetting] = useState({});
  return (
    <div
      id="test"
      style={{
        transform: 'rotate(0)',
        overflowX: 'hidden'
      }}
    >
      <ProLayout
        // {...defaultProps}
        style={{
          height: 800
        }}
        location={{
          pathname: '/welcome'
        }}
        // menuDataRender={() => menuData}
        {...settings}
      >
        <PageHeaderWrapper content="欢迎使用">
          <div
            style={{
              height: '120vh'
            }}
          >
            Hello World
          </div>
        </PageHeaderWrapper>
      </ProLayout>
      <SettingDrawer
        getContainer={() => document.getElementById('test')}
        settings={settings}
        onSettingChange={setSetting}
      />
    </div>
  );
};



































// import ProLayout from '@ant-design/pro-layout';

// // import SelectLang from '@/component/SelectLang';

// import logo from '../assets/logo.svg';
// import defaultSettings from './defaultSettings';


// const BaseLayout = props => {
//   const menuData = [
//     {
//       path: '/a',
//       name: 'dashboard',
//       icon: 'dashboard',
//       children: [
//         {
//           path: '/a/1',
//           name: 'analysis'
//         },
//         {
//           path: '/a/2',
//           name: 'monitor'
//         },
//         {
//           path: '/a/3',
//           name: 'workplace'
//         }
//       ]
//     }
//   ]
//   return (
//     // <>
//       <ProLayout
//         style={{
//           height: 800
//         }}
//         // location={{
//         //   pathname: '/welcome'
//         // }}
//         // menuDataRender={() => menuData}
//         // logo={logo}
//         settings={defaultSettings}
//       />
//     // </>
//   )
// }

// export default BaseLayout;
