import { useCount } from "./useCount";

const CountBtn = function() {
  const { countNum, addone, subone, start, stop, reset } = useCount();

  return (
    <div>
      <button onClick={start}>自动增</button>
      <button onClick={stop}>停止</button>
      <button onClick={addone}>加一</button>
      <button onClick={subone}>减一</button>
      <button onClick={reset}>重置</button>

      <h1>i'm counter A,now my value is: {countNum}</h1>
    </div>
  );
}

export default CountBtn;
