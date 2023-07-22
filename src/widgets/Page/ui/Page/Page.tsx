import { memo, MutableRefObject, ReactNode, useRef, UIEvent } from 'react';

import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';

import { StateSchema } from '@/app/providers/StoreProvider';
import { classNames, Mods } from '@/shared/lib/classNames/classNames';
import { toggleFeatures } from '@/shared/lib/features';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useInfiniteScroll } from '@/shared/lib/hooks/useInfiniteScroll/useInfiniteScroll';
import { useInitialEffect } from '@/shared/lib/hooks/useInitialEffect/useInitialEffect';
import { useThrottle } from '@/shared/lib/hooks/useThrottle/useThrottle';
import { TestProps } from '@/shared/types/tests';

import classes from './Page.module.scss';
import { getPageScrollByPath } from '../../model/selectors/pageSelectors';
import { pageActions } from '../../model/slices/pageSlice';

interface PageProps extends TestProps {
  className?: string;
  children: ReactNode;
  onScrollEnd?: () => void;
}

export const Page = memo((props: PageProps) => {
  const { className, children, onScrollEnd } = props;

  const mods: Mods = {};

  const dispatch = useAppDispatch();

  const location = useLocation();

  const scrollPosition =
    useSelector((state: StateSchema) =>
      getPageScrollByPath(state, location.pathname),
    ) || 0;

  const wrapperRef = useRef() as MutableRefObject<HTMLDivElement>;
  const triggerRef = useRef() as MutableRefObject<HTMLDivElement>;

  useInfiniteScroll({
    callback: onScrollEnd,
    triggerRef,
    wrapperRef: toggleFeatures({
      name: 'isSiteRedesigned',
      on: () => undefined,
      off: () => wrapperRef,
    }),
  });

  useInitialEffect(() => {
    wrapperRef.current.scrollTop = scrollPosition;
  });

  const onScroll = useThrottle((event: UIEvent<HTMLElement>) => {
    dispatch(
      pageActions.setScrollPosition({
        [location.pathname]: event.currentTarget.scrollTop,
      }),
    );
  }, 500);

  const mainClass = toggleFeatures({
    name: 'isSiteRedesigned',
    on: () => classes.PageRedesigned,
    off: () => classes.Page,
  });

  return (
    <main
      data-testid={props['data-testid'] ?? 'Page'}
      ref={wrapperRef}
      className={classNames(mainClass, mods, [className])}
      onScroll={onScroll}
    >
      {children}
      {onScrollEnd && <div ref={triggerRef} className={classes.trigger} />}
    </main>
  );
});
