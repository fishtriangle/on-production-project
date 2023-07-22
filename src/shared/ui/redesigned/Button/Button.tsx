import { ButtonHTMLAttributes, memo, ReactNode } from 'react';

import { classNames, Mods } from '@/shared/lib/classNames/classNames';

import classes from './Button.module.scss';

export type ButtonVariant = 'clear' | 'outline' | 'filled';

export type ButtonSize = 'sizeM' | 'sizeL' | 'sizeXL';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  variant?: ButtonVariant;
  square?: boolean;
  size?: ButtonSize;
  disabled?: boolean;
  children?: ReactNode;
  fullWidth?: boolean;
}

export const Button = memo((props: ButtonProps) => {
  const {
    className,
    children,
    variant = 'outline',
    square,
    size = 'sizeM',
    disabled,
    fullWidth,
    ...otherProps
  } = props;

  const mods: Mods = {
    [classes.square]: square,
    [classes.disabled]: disabled,
    [classes.fullWidth]: fullWidth,
  };

  return (
    <button
      type="button"
      className={classNames(classes.Button, mods, [
        className,
        classes[variant],
        classes[size],
      ])}
      disabled={disabled}
      {...otherProps}
    >
      {children}
    </button>
  );
});
