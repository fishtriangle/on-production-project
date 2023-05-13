import { HTMLAttributes, memo, ReactNode } from 'react';
import { classNames, Mods } from '@/shared/lib/classNames/classNames';
import classes from './Card.module.scss';

export enum CardTheme {
  NORMAL = 'normal',
  OUTLINED = 'outlined',
}

interface CardProps extends HTMLAttributes<HTMLDivElement>{
  className?: string;
  children: ReactNode;
  theme?: CardTheme;
}

export const Card = memo(({
  className, children, theme = CardTheme.NORMAL, ...otherProps
}: CardProps) => {
  const mods: Mods = {};

  return (
    <div
      className={classNames(classes.Card, mods, [className, classes[theme]])}
      {...otherProps}
    >
      {children}
    </div>
  );
});
