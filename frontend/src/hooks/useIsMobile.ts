import { useState, useEffect } from 'react';
import useWindowSize from './useWindowSize';

const useIsMobile = (breakpoint: number = 768): boolean => {
  const { width } = useWindowSize() || {};
  const [isMobile, setMobile] = useState<boolean>(false);

  useEffect(() => {
    if (width !== null && width <= breakpoint) {
      setMobile(true);
    } else if (width !== null) {
      setMobile(false);
    }
  }, [width, breakpoint]);

  return isMobile;
};

export default useIsMobile;
