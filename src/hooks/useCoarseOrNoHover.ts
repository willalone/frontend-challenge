import { useState, useEffect } from 'react';

export function useCoarseOrNoHover(): boolean {
  const [value, setValue] = useState(false);

  useEffect(() => {
    if (typeof window.matchMedia !== 'function') return;
    const mq = window.matchMedia('(hover: none)');
    const sync = () => setValue(mq.matches);
    sync();
    mq.addEventListener('change', sync);
    return () => mq.removeEventListener('change', sync);
  }, []);

  return value;
}
