import { MutableRefObject, useEffect, useRef } from 'react';

export interface UseInfiniteScrollOptions {
  callback?: () => void;
  triggerRef: MutableRefObject<HTMLElement>;
  wrapperRef?: MutableRefObject<HTMLElement>;
}

export function useInfiniteScroll(props: UseInfiniteScrollOptions) {
  const { callback, triggerRef, wrapperRef } = props;
  const observer = useRef<IntersectionObserver | null>(null);
  useEffect(() => {
    const trigger = triggerRef.current;
    const wrapper = wrapperRef?.current || null;

    if (callback) {
      const options = {
        root: wrapper,
        rootMargin: '0px',
        threshold: 0.5,
      };

      observer.current = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) {
          callback();
        }
      }, options);

      observer.current.observe(trigger);
    }

    return () => {
      if (observer && trigger) {
        observer.current?.unobserve(trigger);
      }
    };
  }, [callback, triggerRef, wrapperRef]);
}
