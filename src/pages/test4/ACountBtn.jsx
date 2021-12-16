import { useRecoilState } from "recoil";
import { useCount, count } from "./useCount";

const ACountBtn = function() {
  const { addone, subone, stop, reset } = useCount();
  const [countNum] = useRecoilState(count);
  return (
    <div>
      <hr />
      <hr />
      <hr />
      <h1>the counter value should equal to A: {countNum}</h1>
      <button onClick={stop}>停止(根本停不下来)</button>
      <button onClick={addone}>加一</button>
      <button onClick={subone}>减一</button>
      <button onClick={reset}>重置</button>
    </div>
  );
}

export default ACountBtn;
