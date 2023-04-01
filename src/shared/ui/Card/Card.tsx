import { classNames, Mods } from 'shared/lib/classNames/classNames';
import { HTMLAttributes, memo, ReactNode } from 'react';
import classes from './Card.module.scss';

interface CardProps extends HTMLAttributes<HTMLDivElement>{
  className?: string;
  children: ReactNode;
}

export const Card = memo(({ className, children, ...otherProps }: CardProps) => {
  const mods: Mods = {};

  return (
    <div className={classNames(classes.Card, mods, [className])} {...otherProps}>
      {children}
    </div>
  );
});
