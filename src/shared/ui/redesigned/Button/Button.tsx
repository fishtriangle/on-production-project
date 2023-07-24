import { ButtonHTMLAttributes, memo, ReactNode, useState } from 'react';

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
  addonLeft?: ReactNode;
  addonRight?: ReactNode;
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
    addonLeft,
    addonRight,
    ...otherProps
  } = props;

  const [isFocused, setIsFocused] = useState(false);

  const onFocus = () => {
    setIsFocused(true);
  };

  const onUnFocus = () => {
    setIsFocused(false);
  };

  const mods: Mods = {
    [classes.square]: square,
    [classes.disabled]: disabled,
    [classes.fullWidth]: fullWidth,
    [classes.withAddonLeft]: Boolean(addonLeft),
    [classes.withAddonRight]: Boolean(addonRight),
    [classes.focused]: isFocused,
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
      onFocus={onFocus}
      onBlur={onUnFocus}
      {...otherProps}
    >
      <div className={classes.addonLeft}>{addonLeft}</div>
      {children}
      <div className={classes.addonRight}>{addonRight}</div>
    </button>
  );
});
