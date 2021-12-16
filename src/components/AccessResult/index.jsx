import { Result, Button } from "antd";
import { i18n } from "@lingui/core";
import { t } from "@lingui/macro";
import { useNavigate } from "react-router-dom";

const AccessResult = function({ code }) {
  const navigate = useNavigate();
  // const { openRoute } = useTabRouteModel();
  return (
    <Result
      status={code}
      title={code}
      subTitle={i18n._(t`访问${code}`)}
      extra={
        <Button
          type="primary"
          onClick={() => navigate("/", { replace: true })}
        >
          {i18n._(t`返回首页`)}
        </Button>
      }
    />
  );
}

export default AccessResult;
