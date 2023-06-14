import { DetailedHTMLProps, HTMLAttributes, ReactNode } from 'react';

import { classNames, Mods } from '@/shared/lib/classNames/classNames';

import classes from './Flex.module.scss';

export type FlexJustify = 'start' | 'center' | 'end' | 'between' | 'around';
export type FlexAlign = 'start' | 'center' | 'end';
export type FlexDirection = 'row' | 'column';
export type FlexGap = '4' | '8' | '16' | '32';

type DivProps = DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>;

export interface FlexProps extends DivProps {
  className?: string;
  children: ReactNode;
  justify?: FlexJustify;
  align?: FlexAlign;
  direction: FlexDirection;
  gap?: FlexGap;
  maxWidth?: boolean
}

const justifyMap: Record<FlexJustify, string> = {
  start: classes['justify-start'],
  center: classes['justify-center'],
  end: classes['justify-end'],
  between: classes['justify-between'],
  around: classes['justify-around'],
};

const alignMap: Record<FlexAlign, string> = {
  start: classes['align-start'],
  center: classes['align-center'],
  end: classes['align-end'],
};

const directionMap: Record<FlexDirection, string> = {
  row: classes['direction-row'],
  column: classes['direction-column'],
};

const gapMap: Record<'4' | '8' | '16' | '32', string> = {
  4: classes['gap-4'],
  8: classes['gap-8'],
  16: classes['gap-16'],
  32: classes['gap-32'],
};

export const Flex = (props: FlexProps) => {
  const {
    className,
    children,
    justify = 'start',
    align = 'center',
    direction = 'row',
    gap,
    maxWidth,
  } = props;

  const mods: Mods = {
    [classes['max-width']]: maxWidth,
  };

  const flexClasses = [
    className,
    justifyMap[justify],
    alignMap[align],
    directionMap[direction],
    gap && gapMap[gap],
  ];

  return (
    <div className={classNames(classes.Flex, mods, flexClasses)}>
      {children}
    </div>
  );
};
