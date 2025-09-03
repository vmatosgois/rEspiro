import { useState, useEffect } from 'react';

/**
 * Hook para detectar a orienta o do dispositivo.
 * Retorna se o dispositivo está em modo retrato ou paisagem.
 * 
 * O hook verifica a orienta o do dispositivo no momento da inicializa o e
 * também ao redimensionar o viewport com o evento de resize.
 * 
 * Retorna "portrait" ou "landscape" de acordo com a orienta o do dispositivo.
 */

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