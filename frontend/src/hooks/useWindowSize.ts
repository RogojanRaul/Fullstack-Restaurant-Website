import { useState, useEffect } from 'react';

const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== 'undefined' ? window?.innerWidth : null,
    height: typeof window !== 'undefined' ? window?.innerHeight : null,
  });

  useEffect(() => {
    const handleResize = () => {
      if (typeof window !== 'undefined') {
        setWindowSize({
          width: window?.innerWidth,
          height: window?.innerHeight,
        });
      }
    };

    window?.addEventListener('resize', handleResize);

    handleResize();

    return () => window?.removeEventListener('resize', handleResize);
  }, []);

  return windowSize;
};

export default useWindowSize;
