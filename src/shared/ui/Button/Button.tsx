import {
  ButtonHTMLAttributes, memo, ReactNode,
} from 'react';
import { classNames, Mods } from '@/shared/lib/classNames/classNames';
import classes from './Button.module.scss';

export enum ButtonTheme {
  PRIMAL= 'primal',
  CLEAR = 'clear',
  CLEAR_INVERTED = 'clearInverted',
  CLEAR_SECONDARY_INVERTED = 'clearSecondaryInverted',
  OUTLINE = 'outline',
  OUTLINE_RED = 'outlineRed',
  BACKGROUND = 'background',
  BACKGROUND_INVERTED = 'backgroundInverted',
}

export enum ButtonSize {
  M = 'sizeM',
  L = 'sizeL',
  XL = 'sizeXL',
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>{
  className?: string;
  theme?: ButtonTheme;
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
    theme = ButtonTheme.PRIMAL,
    square,
    size = ButtonSize.M,
    disabled,
    fullWidth,
    ...otherProps
  } = props;

  const mods: Mods = {
    [classes[theme]]: true,
    [classes.square]: square,
    [classes[size]]: true,
    [classes.disabled]: disabled,
    [classes.fullWidth]: fullWidth,
  };

  return (
    <button
      type="button"
      className={classNames(classes.Button, mods, [className, classes[theme]])}
      disabled={disabled}
      {...otherProps}
    >
      {children}
    </button>
  );
});
