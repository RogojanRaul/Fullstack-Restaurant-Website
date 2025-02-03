import { useEffect, useState } from 'react';

export const useDebounce = (value: any, time = 100) => {
  const [debounceValue, setDebounceValue] = useState(value);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebounceValue(value);
    }, time);

    return () => clearTimeout(timeout);
  }, [value, time]);

  return debounceValue;
};
