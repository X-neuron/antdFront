/* eslint-disable react/jsx-key */
import {
  HomeOutlined,
  AppstoreOutlined,
  CompassOutlined,
  FormOutlined,
  PieChartOutlined,
  PaperClipOutlined,
  BarsOutlined,
  UserOutlined,
} from "@ant-design/icons";
import _ from "lodash";
import memoized from "nano-memoize";
import { isUrl } from "@/utils/is";
// 需要 引入 react jsx parser么？ 好像有点大。就这几个图标，还是 用函数代替吧。

const icons = new Map([
  ["HomeOutlined", <HomeOutlined />],
  ["AppstoreOutlined", <AppstoreOutlined />],
  ["CompassOutlined", <CompassOutlined />],
  ["FormOutlined", <FormOutlined />],
  ["PieChartOutlined", <PieChartOutlined />],
  ["PaperClipOutlined", <PaperClipOutlined />],
  ["BarsOutlined", <BarsOutlined />],
  ["UserOutlined", <UserOutlined />],
  // ['Default',<Default />] //default microapp
]);

const getIcon = memoized((_iconStr) => {
  if (isUrl(_iconStr)) {
    return (
      // eslint-disable-next-line jsx-a11y/alt-text
      <img
        src={_iconStr}
        style={{
          height: 32,
          width: 32,
        }}
      />
    );
  }
  const iconStr = _.upperFirst(_iconStr);
  // let icon = icons.get(iconStr);
  return <>{icons.get(iconStr)}</>;
});

export default getIcon;
