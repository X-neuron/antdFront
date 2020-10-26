
import { useState, useCallback } from "react";
import omit from "omit.js";
import { getCaptcha } from "@/services/login";
import CountDownButton from "@/components/CountDownButton";
import { Col, Input, Row, Form, message } from "antd";
import ItemMap from "./map";
import LoginContext from "./LoginContext";
import styles from "./index.less";

const FormItem = Form.Item;

const getFormItemOptions = ({ onChange, defaultValue, customProps = {}, rules }) => {
  const options = {
    rules: rules || customProps.rules,
  };

  if (onChange) {
    options.onChange = onChange;
  }

  if (defaultValue) {
    options.initialValue = defaultValue;
  }

  return options;
};

const LoginItem = props => {
  const [captCha, setCaptCha] = useState(false);
  // 这么写是为了防止restProps中 带入 onChange, defaultValue, rules props tabUtil

  const {
    onChange,
    customProps,
    defaultValue,
    rules,
    name,
    getCaptchaButtonText,
    getCaptchaSecondText,
    updateActive,
    type,
    tabUtil,
    ...restProps
  } = props;
  const onGetCaptcha = useCallback(async mobile => {
    const res = await getCaptcha(mobile);

    if (res === false) {
      return;
    }
    console.log(res);

    message.success(`获取验证码成功！验证码为：${res.data.code}`);
    setCaptCha(false)
  }, []);

  if (!name) {
    return null;
  } // get getFieldDecorator props

  const options = getFormItemOptions(props);
  const otherProps = restProps || {};

  if (type === "Captcha") {
    const inputProps = omit(otherProps, ["onGetCaptcha", "countDown"]);
    return (
      <FormItem shouldUpdate noStyle>
        {({ getFieldValue }) => (
          <Row gutter={8}>
            <Col span={16}>
              <FormItem name={name} {...options}>
                <Input {...customProps} {...inputProps} />
              </FormItem>
            </Col>
            <Col span={8}>
              <CountDownButton
                className={styles.getCaptcha}
                size="large"
                start={captCha}
                second={20}
                initText="获取验证码"
                runText="剩余{%s}秒"
                resetText=" 重新获取 "
                onEnd={() => setCaptCha(false)}
                onClick={() => {
                  const value = getFieldValue("mobile");
                  setCaptCha(true)
                  onGetCaptcha(value);
                }}
              />
            </Col>
          </Row>
        )}
      </FormItem>
    );
  }

  return (
    <FormItem name={name} {...options}>
      <Input {...customProps} {...otherProps} />
    </FormItem>
  );
};

const LoginItems = {};
Object.keys(ItemMap).forEach(key => {
  const item = ItemMap[key];

  LoginItems[key] = props => (
    <LoginContext.Consumer>
      {context => (
        <LoginItem
          customProps={item.props}
          rules={item.rules}
          {...props}
          type={key}
          {...context}
          updateActive={context.updateActive}
        />
      )}
    </LoginContext.Consumer>
  );
});
export default LoginItems;
