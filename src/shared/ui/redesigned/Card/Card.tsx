import { HTMLAttributes, memo, ReactNode } from 'react';

import { classNames, Mods } from '@/shared/lib/classNames/classNames';

import classes from './Card.module.scss';

export type CardVariant = 'normal' | 'outlined' | 'light';

export type CardPaddings = '0' | '8' | '16' | '24';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  children: ReactNode;
  variant?: CardVariant;
  maxWidth?: boolean;
  paddings?: CardPaddings;
}

const mapPaddingsToClassName: Record<CardPaddings, string> = {
  0: classes.padding0,
  8: classes.padding8,
  16: classes.padding16,
  24: classes.padding24,
};

export const Card = memo(
  ({
    className,
    children,
    maxWidth,
    variant = 'normal',
    paddings = '8',
    ...otherProps
  }: CardProps) => {
    const mods: Mods = {
      [classes.maxWidth]: maxWidth,
    };

    return (
      <div
        className={classNames(classes.Card, mods, [
          className,
          classes[variant],
          mapPaddingsToClassName[paddings],
        ])}
        {...otherProps}
      >
        {children}
      </div>
    );
  },
);
