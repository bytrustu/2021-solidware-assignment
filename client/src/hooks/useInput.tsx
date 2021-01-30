import { useState, useCallback, ChangeEvent } from "react";

type onChangeType = (e: ChangeEvent<HTMLInputElement>) => void;

const useInput = (initValue: any) => {
  const [value, setValue] = useState(initValue);

  const handler = useCallback((e) => {
    setValue(e.target.value);
  }, []);

  const reset = ():void => {
    let resetData: any;
    if (typeof initValue === 'string') resetData = '';
    if (typeof initValue === 'number') resetData = 0;
    if (typeof initValue === 'boolean') resetData = false;
    setValue(resetData);
  }

  return [value, handler, setValue, reset] as [typeof initValue, onChangeType, typeof setValue, () => void];
};

export default useInput;