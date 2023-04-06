import { classNames, Mods } from 'shared/lib/classNames/classNames';
import {
  memo, MutableRefObject, ReactNode, useRef,
} from 'react';
import { useInfiniteScroll } from 'shared/lib/hooks/useInfiniteScroll/useInfiniteScroll';
import classes from './Page.module.scss';

interface PageProps {
  className?: string;
  children: ReactNode;
  onScrollEnd?: () => void;
}

export const Page = memo(({ className, children, onScrollEnd }: PageProps) => {
  const mods: Mods = {};

  const wrapperRef = useRef() as MutableRefObject<HTMLDivElement>;
  const triggerRef = useRef() as MutableRefObject<HTMLDivElement>;

  useInfiniteScroll({
    callback: onScrollEnd,
    triggerRef,
    wrapperRef,
  });

  return (
    <section ref={wrapperRef} className={classNames(classes.Page, mods, [className])}>
      {children}
      <div ref={triggerRef} className={classes.trigger} />
    </section>
  );
});
