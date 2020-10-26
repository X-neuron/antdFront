
import useLocaleModel from "@/models/useLocale";
import { useSize } from "@umijs/hooks";
import { Spin } from "antd";

// 这个组件好像容易引起 二次刷新
function Locale({ children }) {
  const [body] = useSize(document.querySelector("body"));
  // const { curLocale, loadLocale } = useLocaleModel();
  const { localeLoaded } = useLocaleModel();

  return (
    localeLoaded ? children
      : (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            alignContent: "center",
            width: body.width,
            height: body.height,
            // width: '100%',
            // height: '100%',
            margin: "auto",
            // paddingTop: 50,
            textAlign: "center"
          }}
        >
          <Spin tip="语言加载中..." size="large" />
        </div>
      )
  )
}

export default Locale;
