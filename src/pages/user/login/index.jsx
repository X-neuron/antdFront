import {
  AlipayCircleOutlined,
  LockTwoTone,
  MailTwoTone,
  MobileTwoTone,
  TaobaoCircleOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Alert, Space, message, Tabs } from "antd";
import { useSafeState } from "ahooks";
import ProForm, {
  ProFormCaptcha,
  ProFormCheckbox,
  ProFormText,
} from "@ant-design/pro-form";

// import { getFakeCaptcha } from '@/services/login';
import { i18n } from "@lingui/core";
import { t, Trans } from "@lingui/macro";

import { useRecoilState } from "recoil";
import { useNavigate, Link } from "react-router-dom";
import styles from "./index.less";
import { accountLogin } from "@/services/login";
import { loginStateAtom } from "@/atoms/login";

const LoginMessage = function({ content }) {
  return <Alert
    style={{
      marginBottom: 24,
    }}
    message={content}
    type="error"
    showIcon
  />
}

const Login = function(props) {
  const { userLogin = {}, submitting } = props;
  const { status } = userLogin;
  const [type, setType] = useSafeState("account");
  const [captCha, setCaptCha] = useSafeState(false);
  const [login, setLogin] = useRecoilState(loginStateAtom);
  const navigate = useNavigate();
  const handleSubmit = (values) => {
    // const res = accountLogin(values);
    // console.log('login res:',res);
    setLogin({
      ...login,
      isLogin: true,
    });
    // 应该提取redirect ，此处省略
    navigate("/", { replace: true });
  };
  return (
    <div className={styles.main}>
      <ProForm
        initialValues={{
          autoLogin: true,
        }}
        submitter={{
          render: (_, dom) => dom.pop(),
          submitButtonProps: {
            loading: submitting,
            size: "large",
            style: {
              width: "100%",
            },
          },
        }}
        onFinish={(values) => {
          handleSubmit(values);
          return Promise.resolve();
        }}
      >
        <Tabs activeKey={type} onChange={setType} centered>
          <Tabs.TabPane key="account" tab={i18n._(t`账号密码登陆`)} />
          <Tabs.TabPane key="mobile" tab={i18n._(t`手机号登陆`)} />
        </Tabs>

        {status === "error" && loginType === "account" && !submitting && (
          <LoginMessage
            content={i18n._(t`账户或密码错误（admin/ant.design)`)}
          />
        )}
        {type === "account" && (
          <>
            <ProFormText
              name="account"
              fieldProps={{
                size: "large",
                prefix: <UserOutlined className={styles.prefixIcon} />,
              }}
              placeholder={i18n._(t`用户名: admin or user`)}
              rules={[
                {
                  required: true,
                  message: i18n._(t`请输入用户名`),
                },
              ]}
            />
            <ProFormText.Password
              name="password"
              fieldProps={{
                size: "large",
                prefix: <LockTwoTone className={styles.prefixIcon} />,
              }}
              placeholder={i18n._(t`密码：any`)}
              rules={[
                {
                  required: true,
                  message: i18n._(t`请输入密码`),
                },
              ]}
            />
          </>
        )}

        {status === "error" && loginType === "mobile" && !submitting && (
          <LoginMessage content={i18n._(t`验证码错误`)} />
        )}
        {type === "mobile" && (
          <>
            <ProFormText
              fieldProps={{
                size: "large",
                prefix: <MobileTwoTone className={styles.prefixIcon} />,
              }}
              name="mobile"
              placeholder={i18n._(t`手机号`)}
              rules={[
                {
                  required: true,
                  message: i18n._(t`请输入手机号`),
                },
                {
                  pattern: /^1\d{10}$/,
                  message: i18n._(t`手机号格式错误`),
                },
              ]}
            />
            <ProFormCaptcha
              fieldProps={{
                size: "large",
                prefix: <MailTwoTone className={styles.prefixIcon} />,
              }}
              captchaProps={{
                size: "large",
              }}
              placeholder={i18n._(t`请输入验证码`)}
              captchaTextRender={(timing, count) => {
                if (timing) {
                  return `${count} ${i18n._(t`获取验证码`)}`;
                }
                return i18n._(t`获取验证码`);
              }}
              name="captcha"
              rules={[
                {
                  required: true,
                  message: <Trans>请输入验证码</Trans>,
                },
              ]}
              countDown={10}
              onGetCaptcha={async (mobile) => {
                // const result = await getFakeCaptcha(mobile);

                message.success("获取验证码成功！验证码为：1234");
              }}
            />
          </>
        )}
        <div
          style={{
            marginBottom: 24,
          }}
        >
          <ProFormCheckbox noStyle name="autoLogin">
            <Trans> 自动登陆 </Trans>
          </ProFormCheckbox>
          <a
            style={{
              float: "right",
            }}
          >
            <Trans> 忘记密码 </Trans>
          </a>
        </div>
      </ProForm>
      <Space className={styles.other}>
        <p className={styles.p}>
          <Trans> 其他登陆方式 </Trans>
        </p>
        <AlipayCircleOutlined className={styles.icon} />
        <TaobaoCircleOutlined className={styles.icon} />
        <Link className={styles.register} to="/user/register">
          <Trans> APP/账户注册 </Trans>
        </Link>
      </Space>
    </div>
  );
}

export default Login;
