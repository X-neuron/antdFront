import { atom, useRecoilState } from "recoil";
import { useInterval, useSafeState } from "ahooks";

export const count = atom({
  key: "count",
  default: 0,
});

export const useCount = (defValue) => {
  const [countNum, setCountNum] = useRecoilState(count);
  const [interval, setInterval] = useSafeState(null);

  useInterval(
    () => {
      setCountNum(countNum + 1);
    },
    interval,
    { immediate: false },
  );

  const start = () => {
    setInterval(100);
  };

  const stop = () => {
    setInterval(null);
  };

  const reset = () => {
    setCountNum(0);
    setInterval(null);
  };

  const addone = () => {
    setCountNum(countNum + 1);
  };

  const subone = () => {
    setCountNum(countNum - 1);
  };

  return { countNum, addone, subone, start, stop, reset };
};
