import React from "react";

import { useCount } from "./useCount";

function CountBtn() {
  const { countNum, addone, subone, start, stop, reset } = useCount();

  return (
    <div>
      <button type="button" onClick={start}>
        自动增
      </button>
      <button type="button" onClick={stop}>
        停止
      </button>
      <button type="button" onClick={addone}>
        加一
      </button>
      <button type="button" onClick={subone}>
        减一
      </button>
      <button type="button" onClick={reset}>
        重置
      </button>

      <h1>i&apos;m counter A,now my value is: {countNum}</h1>
    </div>
  );
}

export default CountBtn;
