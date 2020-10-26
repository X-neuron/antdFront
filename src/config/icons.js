import { HomeOutlined, AppstoreOutlined, CompassOutlined, FormOutlined, PieChartOutlined, PaperClipOutlined, BarsOutlined, UserOutlined } from "@ant-design/icons";
import _ from "lodash";
import memoized from "nano-memoize";
// 需要 引入 react jsx parser么？ 好像有点大。就这几个图标，还是 用函数代替吧。
const getAntdIcon = memoized((iconStr) => {
  const str = _.upperFirst(iconStr);
  switch (str) {
    case "HomeOutlined":
      return <HomeOutlined />
    case "AppstoreOutlined":
      return <AppstoreOutlined />
    case "CompassOutlined":
      return <CompassOutlined />
    case "FormOutlined":
      return <FormOutlined />
    case "PieChartOutlined":
      return <PieChartOutlined />
    case "PaperClipOutlined":
      return <PaperClipOutlined />
    case "BarsOutlined":
      return <BarsOutlined />
    case "UserOutlined":
      return <UserOutlined />
    default:
      return <HomeOutlined />
  }
})

export default getAntdIcon;

// export default {
//   HomeOutlined,
//   AppstoreOutlined,
//   CompassOutlined,
//   FormOutlined,
//   PieChartOutlined
// }
