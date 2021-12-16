import {
  ConsoleSqlOutlined,
  LockTwoTone,
  MailTwoTone,
  MobileTwoTone,
  UserOutlined,
} from "@ant-design/icons";
import { useRef } from "react";

import { Popover, Progress, Tabs, Space, Form } from "antd";
import ProForm, {
  ProFormCaptcha,
  ProFormCheckbox,
  ProFormText,
  ProFormSelect,
  ProFormGroup,
} from "@ant-design/pro-form";
import Field from "@ant-design/pro-field";

import { useMemoizedFn, useSafeState } from "ahooks";

import { Link } from "react-router-dom";

import { i18n } from "@lingui/core";
import { t, Trans } from "@lingui/macro";
import styles from "./index.less";

import { userRegister } from "@/services/register";

const passwordStatusMap = {
  ok: <div className={styles.success}>强度：强</div>,
  pass: <div className={styles.warning}>强度：中</div>,
  poor: <div className={styles.error}>强度：太短</div>,
};

const passwordProgressMap = {
  ok: "success",
  pass: "normal",
  poor: "exception",
};

const Register = function(props) {
  const { submitting } = props;
  const formRef = useRef();
  const [allowClear] = useSafeState(true);
  const [captCha, setCaptCha] = useSafeState(false);
  const [type, setType] = useSafeState("userRegister");
  // const [popVisible, setPopVisible] = useSafeState(false);

  const [state, setState] = useSafeState({
    confirmDirty: false,
    visible: false,
    help: "",
    prefix: "86",
  });

  const handleSubmit = async (values) => {
    const res = await userRegister(values);
    console.log(res);
  };

  const checkPwdConfirm = useMemoizedFn((rule, value, callback) => {
    if (value && value !== formRef.current.getFieldValue("password")) {
      callback("两次输入的密码不匹配!");
    } else {
      callback();
    }
  });

  const checkPassword = (rule, value, callback) => {
    if (!value) {
      setState((prevState) => ({
        ...prevState,
        help: "请输入密码！",
        visible: !!value,
      }));
      callback("error");
    } else {
      setState((prevState) => ({
        ...prevState,
        help: " ",
      }));
      if (!state.visible) {
        setState((prevState) => ({
          ...prevState,
          visible: !!value,
        }));
      }
      if (value.length < 6) {
        callback("error");
      } else {
        if (value && state.confirmDirty) {
          formRef.current.validateFields(["passwordConfirm"], { force: true });
        }
        callback();
      }
    }
  };

  const getPasswordStatus = useMemoizedFn(() => {
    const value = formRef.current?.getFieldValue("password");
    if (value && value.length > 9) {
      return "ok";
    }
    if (value && value.length > 3) {
      return "pass";
    }
    return "poor";
  });

  const renderPasswordProgress = useMemoizedFn(() => {
    if (!state.visible) {
      return <></>;
    }
    const value = formRef.current.getFieldValue("password");
    const passwordStatus = getPasswordStatus();
    return value && value.length ? (
      <div className={styles[`progress-${passwordStatus}`]}>
        <Progress
          status={passwordProgressMap[passwordStatus]}
          className={styles.progress}
          strokeWidth={6}
          percent={value.length * 10 > 100 ? 100 : value.length * 10}
          showInfo={false}
        />
      </div>
    ) : null;
  });

  return (
    <div className={styles.main}>
      <ProForm
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
        formRef={formRef}
        onFinish={(values) => {
          handleSubmit(values);
          return Promise.resolve();
        }}
      >
        <Tabs activeKey={type} onChange={setType} centered>
          <Tabs.TabPane key="userRegister" tab={i18n._(t`用户注册`)} />
          <Tabs.TabPane key="appRegister" tab={i18n._(t`应用注册`)} />
        </Tabs>

        {status === "error" && !submitting && (
          <LoginMessage
            content={i18n._(t`账户或密码错误（admin/ant.design)`)}
          />
        )}
        {type === "userRegister" && (
          <>
            <ProFormText
              name="account"
              fieldProps={{
                size: "large",
                prefix: <UserOutlined className={styles.prefixIcon} />,
                allowClear,
              }}
              placeholder={i18n._(t`账户名`)}
              rules={[
                {
                  required: true,
                  message: i18n._(t`账户名`),
                },
                {
                  pattern: /^[a-zA-Z0-9_-]{3,16}$/,
                  message: "账户名由3-16个英文字母、数字和下划线_构成",
                },
              ]}
            />
            <ProFormText
              name="email"
              fieldProps={{
                size: "large",
                prefix: <UserOutlined className={styles.prefixIcon} />,
                allowClear,
              }}
              placeholder={i18n._(t`邮箱`)}
              rules={[
                {
                  required: true,
                  message: i18n._(t`请输入邮箱地址`),
                },
                {
                  type: "email",
                  message: i18n._(t`输入正确的邮箱地址`),
                },
              ]}
            />
            <div
              style={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <ProFormSelect
                fieldProps={{
                  size: "large",
                }}
                name="PhonePrefix"
                defaultValue="+86"
                valueEnum={{
                  prefix1: "+86",
                  prefix2: "+87",
                }}
                placeholder="86"
              />
              <ProFormText
                fieldProps={{
                  size: "large",
                  prefix: <MobileTwoTone className={styles.prefixIcon} />,
                  allowClear,
                }}
                name="phoneNumber"
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
            </div>
            <Popover
              content={
                <div style={{ padding: "4px 0" }}>
                  {passwordStatusMap[getPasswordStatus()]}
                  {renderPasswordProgress()}
                  <div style={{ marginTop: 10 }}>
                    请至少输入 6 个字符。请不要使用容易被猜到的密码。
                  </div>
                </div>
              }
              trigger="focus"
              overlayStyle={{ width: 240 }}
              placement="right"
              // visible={popVisible}
              visible={state.visible}
            >
              <ProFormText.Password
                name="password"
                fieldProps={{
                  size: "large",
                  prefix: <LockTwoTone className={styles.prefixIcon} />,
                  allowClear,
                }}
                placeholder={i18n._(t`密码需6位以上，区分大小写`)}
                rules={[
                  {
                    validator: checkPassword,
                  },
                  {
                    min: 3,
                    message: i18n._(t`密码需6位以上，区分大小写`),
                  },
                ]}
              />
            </Popover>
            <ProFormText.Password
              name="passwordConfirm"
              fieldProps={{
                size: "large",
                prefix: <LockTwoTone className={styles.prefixIcon} />,
                allowClear,
              }}
              placeholder={i18n._(t`密码：任意`)}
              rules={[
                {
                  required: true,
                  message: "请确认密码！",
                },
                {
                  validator: checkPwdConfirm,
                },
              ]}
            />
          </>
        )}

        {status === "error" && !submitting && (
          <LoginMessage content={i18n._(t`验证码错误`)} />
        )}
        {type === "appRegister" && (
          <>
            <ProFormText
              fieldProps={{
                size: "large",
                prefix: <MobileTwoTone className={styles.prefixIcon} />,
                allowClear,
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
                allowClear,
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
      </ProForm>
      <Space className={styles.other}>
        <Link className={styles.tologin} to="/user/login">
          <Trans>返回登录</Trans>
        </Link>
      </Space>
    </div>
  );
}

export default Register;
