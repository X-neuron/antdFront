import React from 'react';

import { Drawer } from 'antd'
// import { useResponsive } from '@umijs/hooks'

import { useSiderMenuToggleModel } from '@/models/useToggle';
import useMediaModel from '@/models/useMedia';
import SiderMenu from './SiderMenu'

export default props => {
  // const responsive = useResponsive();
  const sider = useSiderMenuToggleModel();
  const isMobile = useMediaModel();
  return (
    isMobile
      ? (
        <Drawer
          parent={null}
          level={null}
          visible={sider.state}
          placement="left"
          onClose={sider.setFalse}
          width="256px"
          bodyStyle={{
            margin: 0,
            padding: 0
          }}
        >
          <SiderMenu {...props} collapsed={false} menuToggle={sider.state} />
        </Drawer>
      )
      : <SiderMenu {...props} menuToggle={sider.state} />
  )
}

