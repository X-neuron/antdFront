import { AlipayCircleOutlined, TaobaoCircleOutlined, WeiboCircleOutlined } from "@ant-design/icons";
import { Alert, Checkbox } from "antd";
import { useState } from "react";
import { Link, navigate } from "@reach/router";
import { accountLogin } from "@/services/login";
import useLoginModel from "@/models/useLogin";
import { getPageQuery } from "@/utils/utils";
import LoginFrom from "./components/Login";
import styles from "./style.less";

const { Tab, UserName, Password, Mobile, Captcha, Submit } = LoginFrom;

const LoginMessage = ({ content }) => (
  <Alert
    style={{
      marginBottom: 24,
    }}
    message={content}
    type="error"
    showIcon
  />
);

const Login = props => {
  const { userLogin = {}, submitting } = props;
  const { status, type: loginType } = userLogin;
  const [autoLogin, setAutoLogin] = useState(true);
  const [type, setType] = useState("account");
  const { login, changeLogin } = useLoginModel();

  const handleSubmit = values => {
    // accountLogin(values).then((res) => {
    //   if (res.status === 200) {
    //     const urlParams = new URL(window.location.href);
    //     const params = getPageQuery();
    //     let { redirect } = params;

    //     if (redirect) {
    //       const redirectUrlParams = new URL(redirect);

    //       if (redirectUrlParams.origin === urlParams.origin) {
    //         redirect = redirect.substr(urlParams.origin.length);

    //         if (redirect.match(/^\/.*#/)) {
    //           redirect = redirect.substr(redirect.indexOf("#") + 1);
    //         }
    //       } else {
    //         window.location.href = "/";
    //         return;
    //       }
    //     }
    //     // history.replace(redirect || '/');
    //     changeLogin({
    //       ...res.data
    //     });

    //     navigate(redirect || "/");
    //   }
    // });
    changeLogin({
      role: "user",
      userId: "323",
      token: "fafaf",
      ssKey: "24234",
      userName: "fafa",
      isLogin: true
    }
    );
    navigate("/");
  };

  return (
    <div className={styles.main}>
      <LoginFrom activeKey={type} onTabChange={setType} onSubmit={handleSubmit}>
        <Tab key="account" tab="账户密码登录">
          {status === "error" && loginType === "account" && !submitting && (
            <LoginMessage content="账户或密码错误（admin/ant.design）" />
          )}
          <UserName
            name="userName"
            placeholder="用户名: admin or user"
            rules={[
              {
                required: true,
                message: "请输入用户名!",
              },
            ]}
          />
          <Password
            name="password"
            placeholder="密码: ant.design"
            rules={[
              {
                required: true,
                message: "请输入密码！",
              },
            ]}
          />
        </Tab>
        <Tab key="mobile" tab="手机号登录">
          {status === "error" && loginType === "mobile" && !submitting && (
            <LoginMessage content="验证码错误" />
          )}
          <Mobile
            name="mobile"
            placeholder="手机号"
            rules={[
              {
                required: true,
                message: "请输入手机号！",
              },
              {
                pattern: /^1\d{10}$/,
                message: "手机号格式错误！",
              },
            ]}
          />
          <Captcha
            name="captcha"
            placeholder="验证码"
            countDown={120}
            getCaptchaButtonText=""
            getCaptchaSecondText="秒"
            rules={[
              {
                required: true,
                message: "请输入验证码！",
              },
            ]}
          />
        </Tab>
        <div>
          <Checkbox checked={autoLogin} onChange={e => setAutoLogin(e.target.checked)}>
            自动登录
          </Checkbox>
          <a
            style={{
              float: "right",
            }}
          >
            忘记密码
          </a>
        </div>
        <Submit loading={submitting}>登录</Submit>
        <div className={styles.other}>
          其他登录方式
          <AlipayCircleOutlined className={styles.icon} />
          <TaobaoCircleOutlined className={styles.icon} />
          <WeiboCircleOutlined className={styles.icon} />
          <Link className={styles.register} to="/user/register">
            APP/账户注册
          </Link>
        </div>
      </LoginFrom>
    </div>
  );
};

// export default connect(({ login, loading }) => ({
//   userLogin: login,
//   submitting: loading.effects['login/login'],
// }))(Login);
export default Login;
