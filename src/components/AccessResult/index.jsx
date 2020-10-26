import { Result, Button } from "antd";

import useLocaleModel from "@/models/useLocale";
import useTabRouteModel from "@/models/useTabRoute"

const AccessResult = ({ code }) => {
  const { intl } = useLocaleModel();
  const { openRoute } = useTabRouteModel();
  return (
    <>
      <Result
        status={code}
        title={code}
        subTitle={intl.get(`access${code}`)}
        extra={<Button type="primary" onClick={() => openRoute("/")}>{intl.get("backhome")}</Button>}
      />
    </>
  )
}


export default AccessResult;
