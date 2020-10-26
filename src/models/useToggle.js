
import { createModel } from "hox";
import { useBoolean } from "@umijs/hooks"
// import { useBoolean } from 'react-use';


function useToggle(defValue) {
  const { state, toggle, setTrue, setFalse } = useBoolean(defValue ?? true);
  const set = (bool) => (bool ? setTrue : setFalse)
  return { state, toggle, set }
}

// 已向hox团队建议扩展api。增强逻辑复用性。等待更新...
// export const useSiderMenuToggleModel = createModel(useToggle,false);


export const useSiderMenuToggleModel = createModel(useToggle);
