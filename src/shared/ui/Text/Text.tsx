import { classNames } from 'shared/lib/classNames/classNames';
import { memo } from 'react';
import classes from './Text.module.scss';

export enum TextTheme {
  PRIMARY = 'primary',
  ERROR = 'error',
}

interface TextProps {
  className?: string;
  title?: string;
  text?: string;
  theme?: TextTheme;
}

export const Text = memo((props: TextProps) => {
  const {
    className,
    title,
    text,
    theme = TextTheme.PRIMARY,
  } = props;

  const mods: Record<string, boolean> = {
    [classes[theme]]: true,
  };

  return (
    <div className={classNames(classes.Text, mods, [className])}>
      {title && (<p className={classes.title}>{title}</p>)}
      {text && (<p className={classes.text}>{text}</p>)}
    </div>
  );
});
