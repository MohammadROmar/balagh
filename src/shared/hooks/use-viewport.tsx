import { useState, useEffect } from 'react';

const useViewport = () => {
  const [windowSize, setWindowSize] = useState({
    width: 320,
    height: 320,
  });

  useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }

    window.addEventListener('resize', handleResize);

    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowSize;
};

export default useViewport;
