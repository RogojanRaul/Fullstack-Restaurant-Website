import { useCallback, useEffect, useState } from 'react';

const useIsSticky = (ref: React.RefObject<any>, noDelay: boolean) => {
  const [sticky, setSticky] = useState(false);

  const handleScroll = useCallback(
    (elTopOffset: number, elHeight: number) => {
      const elOffset = noDelay ? 0 : elTopOffset + elHeight;
      setSticky(window.pageYOffset > elOffset);
    },
    [noDelay],
  );

  // mount
  useEffect(() => {
    if (ref) {
      const headerSizes = ref.current.getBoundingClientRect();

      const handleScrollEvent = () => {
        handleScroll(headerSizes.top, headerSizes.height);
      };
      window.addEventListener('scroll', handleScrollEvent);
      // unmount
      return () => {
        window.removeEventListener('scroll', handleScrollEvent);
      };
    }
  }, [ref, handleScroll]);
  return sticky;
};
export default useIsSticky;
