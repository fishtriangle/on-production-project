import { useCallback, useRef } from 'react';

/**
 * @description Hook for debounce - cancel previous execution until delay passed
 * @param callback
 * @param delay - delay of execution in ms
 */

export function useDebounce(callback: (...args: any[]) => void, delay: number) {
  const timerRef = useRef<any>(null);

  return useCallback((...args: any[]) => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    timerRef.current = setTimeout(() => {
      callback(...args);
    }, delay);
  }, [callback, delay]);
}
