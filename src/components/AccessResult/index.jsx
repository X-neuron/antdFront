import { Result, Button } from "antd";
import { i18n } from "@lingui/core";
import { t } from "@lingui/macro";

// import useTabRouteModel from "@/models/useTabRoute"

const AccessResult = ({ code }) => {

  // const { openRoute } = useTabRouteModel();
  return (
    <>
      <Result
        status={code}
        title={code}
        subTitle={i18n._(t`访问${code}`)}
        // extra={<Button type="primary" onClick={() => openRoute("/")}>{i18n._(t`返回首页`)}</Button>}
        extra={<Button type="primary" >{i18n._(t`返回首页`)}</Button>}
      />
    </>
  )
}


export default AccessResult;
