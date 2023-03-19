import { classNames } from 'shared/lib/classNames/classNames';
import { memo } from 'react';
import classes from './Text.module.scss';

export enum TextTheme {
  PRIMARY = 'primary',
  ERROR = 'error',
}

export enum TextAlign {
  RIGHT = 'right',
  LEFT = 'left',
  CENTER = 'center',
}

export enum TextSize {
  M = 'size_m',
  L = 'size_l',
}

interface TextProps {
  className?: string;
  title?: string;
  text?: string;
  theme?: TextTheme;
  align?: TextAlign;
  size?: TextSize;
}

export const Text = memo((props: TextProps) => {
  const {
    className,
    title,
    text,
    theme = TextTheme.PRIMARY,
    align = TextAlign.LEFT,
    size = TextSize.M,
  } = props;

  const mods: Record<string, boolean> = {
    [classes[theme]]: true,
    [classes[align]]: true,
    [classes[size]]: true,
  };

  return (
    <div className={classNames(classes.Text, mods, [className])}>
      {title && (<p className={classes.title}>{title}</p>)}
      {text && (<p className={classes.text}>{text}</p>)}
    </div>
  );
});
