import { Drawer } from "antd"
// import { useResponsive } from '@umijs/hooks'

import { useSiderMenuToggleModel } from "@/models/useToggle";
import useMediaModel from "@/models/useMedia";
import SiderMenu from "./SiderMenu"

export default props => {
  // const responsive = useResponsive();
  const menuCollapsed = useSiderMenuToggleModel();
  const isMobile = useMediaModel();
  return (
    isMobile
      ? (
        <Drawer
          {...props}
          parent={null}
          level={null}
          visible={menuCollapsed.state}
          placement="left"
          onClose={menuCollapsed.set(false)}
          width="256px"
          bodyStyle={{
            margin: 0,
            padding: 0
          }}
        >
          <SiderMenu {...props} collapsed={false} menuToggle={menuCollapsed.state} />
        </Drawer>
      )
      : <SiderMenu {...props} menuToggle={menuCollapsed.state} />
  )
}
