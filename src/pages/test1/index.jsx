import { Form, Input, Button, Checkbox } from "antd";
import { i18n } from "@lingui/core";
import { t , Trans } from "@lingui/macro";
import Access from "@/components/Access";

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

const LoginForm = function(props) {
  // const { params } = props;
  // console.log(params);
  const onFinish = (values) => {
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Form
      {...layout}
      name="basic"
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >
      <Form.Item
        label="Username"
        name="username"
        rules={[{ required: true, message: "Please input your username!" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[{ required: true, message: "Please input your password!" }]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item {...tailLayout} name="remember" valuePropName="checked">
        <Checkbox>Remember me</Checkbox>
      </Form.Item>
      <Access accessible="logionPermit" fallback={null}>
        <Form.Item {...tailLayout}>
          <Button type="primary" htmlType="submit">
            <Trans>(我是权限按钮切换个角色找到我) 提 交 </Trans>
          </Button>
        </Form.Item>
      </Access>
    </Form>
  );
}

export default LoginForm;
