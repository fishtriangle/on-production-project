import { MutableRefObject, useEffect } from 'react';

export interface UseInfiniteScrollOptions {
  callback?: () => void;
  triggerRef: MutableRefObject<HTMLElement>;
  wrapperRef: MutableRefObject<HTMLElement>;
}

export function useInfiniteScroll(props: UseInfiniteScrollOptions) {
  const { callback, triggerRef, wrapperRef } = props;

  useEffect(() => {
    let observer: IntersectionObserver;

    const trigger = triggerRef.current;
    const wrapper = wrapperRef.current;

    if (callback) {
      const options = {
        root: wrapper,
        rootMargin: '0px',
        threshold: 0.5,
      };

      observer = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) {
          callback();
        }
      }, options);

      observer.observe(trigger);
    }

    return () => {
      if (observer && trigger) {
        observer.unobserve(trigger);
      }
    };
  }, [callback, triggerRef, wrapperRef]);
}
