
import { createModel } from 'hox';
import { useBoolean } from '@umijs/hooks';


function useToggle(defValue) {
  const { state, toggle, setTrue, setFalse } = useBoolean(defValue ?? true);
  const set = (bool) => (bool ? setTrue : setFalse)
  return { state, toggle, set }
}


export const useSiderMenuToggleModel = createModel(useToggle);
