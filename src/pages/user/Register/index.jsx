import { useState } from "react";
import { Link } from "@reach/router";
import { Form, Input, Button, Select, Row, Col, Popover, Progress } from "antd";
import { usePersistFn } from "@umijs/hooks";
import CountDownButton from "@/components/CountDownButton"
import styles from "./index.less";
// const FormItem = Form.Item;
const { Option } = Select;
const InputGroup = Input.Group;

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

const Register = (props) => {
  const [form] = Form.useForm();
  const [captCha, setCaptCha] = useState(false);
  const [state, setState] = useState({
    confirmDirty: false,
    visible: false,
    help: "",
    prefix: "86",
  });

  const handleSubmit = usePersistFn(e => {
    e.preventDefault();
  });

  const checkConfirm = usePersistFn((rule, value, callback) => {
    if (value && value !== form.getFieldValue("pwd")) {
      callback("两次输入的密码不匹配!");
    } else {
      callback();
    }
  });

  const checkPassword = (rule, value, callback) => {
    if (!value) {
      setState(prevState => ({
        ...prevState,
        help: "请输入密码！",
        visible: !!value
      }));
      callback("error");
    } else {
      setState(prevState => ({
        ...prevState,
        help: " ",
      }));
      if (!state.visible) {
        setState(prevState => ({
          ...prevState,
          visible: !!value,
        }));
      }
      // if (value.length < 6) {
      //   callback('error');
      // } else {
      //   if (value && state.confirmDirty) {
      //     form.validateFields(['confirm'], { force: true });
      //   }
      //   callback();
      // }
    }
  };


  const getPasswordStatus = usePersistFn(() => {
    const value = form.getFieldValue("pwd");
    if (value && value.length > 9) {
      return "ok";
    }
    if (value && value.length > 5) {
      return "pass";
    }
    return "poor";
  });

  const renderPasswordProgress = usePersistFn(() => {
    const value = form.getFieldValue("pwd");
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

  const changePrefix = usePersistFn((value) => {
    setState(prevState => ({ ...prevState, prefix: value }));
  });



  return (
    <div className={styles.main}>
      <h3>注册</h3>
      <Form form={form} onFinish={(e) => handleSubmit(e)}>
        <Form.Item
          name="mail"
          rules={[
            {
              required: true,
              message: "请输入邮箱地址！",
            },
            {
              type: "email",
              message: "邮箱地址格式错误！",
            },
          ]}
        >
          <Input size="large" placeholder="邮箱" />
        </Form.Item>
        <Popover
          content={(
            <div style={{ padding: "4px 0" }}>
              {passwordStatusMap[getPasswordStatus()]}
              {renderPasswordProgress()}
              <div style={{ marginTop: 10 }}>
                请至少输入 6 个字符。请不要使用容易被猜到的密码。
              </div>
            </div>
          )}
          overlayStyle={{ width: 240 }}
          placement="right"
          visible={state.visible}
        >
          <Form.Item
            name="pwd"
            // help={state.help}
            rules={[
              {
                validator: checkPassword,
              },
              {
                min: 6,
                message: "至少6位密码，区分大小写"
              }
            ]}
          >
            <Input size="large" type="password" placeholder="至少6位密码，区分大小写" />
          </Form.Item>
        </Popover>
        <Form.Item
          name="confirmPwd"
          rules={[
            {
              required: true,
              message: "请确认密码！",
            },
            {
              validator: checkConfirm,
            },
          ]}
        >
          <Input size="large" type="password" placeholder="确认密码" />
        </Form.Item>
        <InputGroup compact>
          <Select
            size="large"
            value={state.prefix}
            onChange={(e) => changePrefix(e)}
            style={{ width: "20%" }}
          >
            <Option value="86">+86</Option>
            <Option value="87">+87</Option>
          </Select>
          <Form.Item
            name="mobile"
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
            style={{ width: "80%" }}
          >
            <Input size="large" placeholder="11位手机号" />
          </Form.Item>
        </InputGroup>
        <Row gutter={8}>
          <Col span={16}>
            <Form.Item
              rules={[
                {
                  required: true,
                  message: "请输入验证码！",
                },
              ]}
            >
              <Input size="large" placeholder="验证码" />
            </Form.Item>
          </Col>
          <Col span={8}>
            <CountDownButton
              start={captCha}
              size="large"
              second={5}
              initText="获取验证码"
              runText="剩余{%s}秒"
              onClick={() => setCaptCha(true)}
              resetText=" 重新获取 "
              onEnd={() => setCaptCha(false)}
            />
          </Col>
        </Row>
        <Form.Item>
          <Button
            size="large"
            // loading={submitting}
            className={styles.submit}
            type="primary"
            htmlType="submit"
          >
            注册
          </Button>
          <Link className={styles.login} to="/user/login">
            使用已有账户登录
          </Link>
        </Form.Item>
      </Form>
    </div>
  );
}

export default Register;
