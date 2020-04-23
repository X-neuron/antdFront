
import { createModel } from 'hox';
import { useBoolean } from '@umijs/hooks';


function useToggle(defValue) {
  const { state, toggle, setTrue, setFalse } = useBoolean(defValue ?? true);
  return { state, toggle, setTrue, setFalse }
}


export const useSiderMenuToggleModel = createModel(useToggle);
export const useSigOrTabsToggleModel = createModel(useToggle);
