import { Button } from "antd";
// import { useInterval, useBoolean } from "react-use";
// import { useMemoizedFn, useCounter } from "ahooks"
import {
  useMemoizedFn,
  useInterval,
  useBoolean,
  useCounter,
  useSafeState,
} from "ahooks";

/* 是否开始倒计时
 start?: boolean;
// 倒计时时长（秒）默认60
 second?: number;
// 初始化按钮显示文本
 initText?: string;
// 运行时显示文本
// 自己设置必须包含{%s}
 runText?: string;
// 运行结束后显示文本
 resetText?: string;
// 倒计时结束执行函数
 onEnd?: () => void;
 */

const getTemplateText = (runText, second) =>
  runText.replace(/\{([^{]*?)%s(.*?)\}/g, second.toString());

const CountDownButton = function({
  start,
  second,
  initText,
  resetText,
  runText,
  onEnd,
  ...rest
}) {
  const [count, { dec, reset }] = useCounter(second, { min: 0, max: second });

  const [delay] = useSafeState(1000); // 1000
  const [done, doneOp] = useBoolean(false);

  const timeout = useMemoizedFn(() => {
    // 设置为运行结束后状态
    // 发出倒计时结束事件
    onEnd && onEnd();
  });

  useInterval(
    () => {
      dec();
      if (count === 1) {
        reset();
        timeout();
        doneOp.toggle(true);
      }
    },
    start ? delay : null,
  );

  const buttonText = () => {
    // console.log(done, start, count, second)
    if (done && !start) return resetText;
    if (!start && !done) return initText;
    if (start && count <= second) return getTemplateText(runText, count);
  };

  return (
    <Button loading={start} {...rest} block={true}>
      {buttonText()}
    </Button>
  );
}

export default CountDownButton;
