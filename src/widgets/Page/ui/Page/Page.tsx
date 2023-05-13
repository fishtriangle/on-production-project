import {
  memo, MutableRefObject, ReactNode, useRef, UIEvent,
} from 'react';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { classNames, Mods } from '@/shared/lib/classNames/classNames';
import { useInfiniteScroll } from '@/shared/lib/hooks/useInfiniteScroll/useInfiniteScroll';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useInitialEffect } from '@/shared/lib/hooks/useInitialEffect/useInitialEffect';
import { StateSchema } from '@/app/providers/StoreProvider';

import { useThrottle } from '@/shared/lib/hooks/useThrottle/useThrottle';
import { getPageScrollByPath } from '../../model/selectors/pageSelectors';
import { pageActions } from '../../model/slices/pageSlice';
import classes from './Page.module.scss';

interface PageProps {
  className?: string;
  children: ReactNode;
  onScrollEnd?: () => void;
}

export const Page = memo(({ className, children, onScrollEnd }: PageProps) => {
  const mods: Mods = {};

  const dispatch = useAppDispatch();

  const location = useLocation();

  const scrollPosition = useSelector(
    (state: StateSchema) => getPageScrollByPath(state, location.pathname),
  ) || 0;

  const wrapperRef = useRef() as MutableRefObject<HTMLDivElement>;
  const triggerRef = useRef() as MutableRefObject<HTMLDivElement>;

  useInfiniteScroll({
    callback: onScrollEnd,
    triggerRef,
    wrapperRef,
  });

  useInitialEffect(() => {
    wrapperRef.current.scrollTop = scrollPosition;
  });

  const onScroll = useThrottle((event: UIEvent<HTMLElement>) => {
    dispatch(pageActions.setScrollPosition({
      [location.pathname]: event.currentTarget.scrollTop,
    }));
  }, 500);

  return (
    <main
      ref={wrapperRef}
      className={classNames(classes.Page, mods, [className])}
      onScroll={onScroll}
    >
      {children}
      {onScrollEnd && <div ref={triggerRef} className={classes.trigger} />}
    </main>
  );
});
