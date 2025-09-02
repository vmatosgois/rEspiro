import { useState, useEffect } from 'react';

type DeviceType = 'mobile' | 'desktop';

const isBrowser = () => typeof window !== 'undefined';

function getDeviceType(): DeviceType {
  if (!isBrowser()) {
    return 'desktop';
  }

  const userAgent = navigator.userAgent;
  const isMobileAgent = /Mobi|Android|iPhone|iPad|iPod/i.test(userAgent);

  // 'coarse' indica dispositivo de toque como principal.
  // 'fine' indica dispositivo de precisão
  const hasCoarsePointer = window.matchMedia('(pointer: coarse)').matches;

  if (isMobileAgent || hasCoarsePointer) {
    return 'mobile';
  }

  return 'desktop';
}

export function useDeviceType(): DeviceType {
  const [deviceType, setDeviceType] = useState<DeviceType>(getDeviceType());

  useEffect(() => {
    function handleResize() {
        setDeviceType(getDeviceType());
    }

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);


  return deviceType;
}