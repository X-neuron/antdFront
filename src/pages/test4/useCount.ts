import { useInterval, useSafeState } from "ahooks";
import { atom, useRecoilState } from "recoil";

export const count = atom({
  key: "count",
  default: 0,
});

export const useCount = () => {
  const [countNum, setCountNum] = useRecoilState(count);
  const [interval, setInterval] = useSafeState<number | undefined>(undefined);

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
    setInterval(undefined);
  };

  const reset = () => {
    setCountNum(0);
    setInterval(undefined);
  };

  const addone = () => {
    setCountNum(countNum + 1);
  };

  const subone = () => {
    setCountNum(countNum - 1);
  };

  return { countNum, addone, subone, start, stop, reset };
};
