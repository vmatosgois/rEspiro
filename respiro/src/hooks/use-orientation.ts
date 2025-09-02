import { useState, useEffect } from 'react';

type Orientation = 'portrait' | 'landscape';

function getOrientation(): Orientation {
  if (typeof window === 'undefined') {
    return 'portrait';
  }
  return window.innerHeight > window.innerWidth ? 'portrait' : 'landscape';
}

export function useOrientation(): Orientation {
  const [orientation, setOrientation] = useState<Orientation>(getOrientation());

  useEffect(() => {
    function handleResize() {
      setOrientation(getOrientation());
    }

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return orientation;
}