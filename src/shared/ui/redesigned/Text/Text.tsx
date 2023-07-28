import { memo } from 'react';

import { classNames } from '@/shared/lib/classNames/classNames';

import classes from './Text.module.scss';

export type TextVariant = 'primary' | 'error' | 'accent';

export type TextAlign = 'left' | 'right' | 'center';

export type TextSize = 'size_s' | 'size_m' | 'size_l';

interface TextProps {
  className?: string;
  title?: string | null;
  text?: string | null;
  variant?: TextVariant;
  align?: TextAlign;
  size?: TextSize;
  bold?: boolean;

  'data-testid'?: string;
}

type HeaderTagType = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

const mapSizeToHeaderTag: Record<TextSize, HeaderTagType> = {
  size_s: 'h3',
  size_m: 'h2',
  size_l: 'h1',
};

export const Text = memo((props: TextProps) => {
  const {
    className,
    title,
    text,
    variant = 'primary',
    align = 'left',
    size = 'size_m',
    bold = false,
    'data-testid': dataTestId = 'Text',
  } = props;

  const HeaderTag = mapSizeToHeaderTag[size];

  const mods: Record<string, boolean> = {
    [classes.bold]: bold,
  };

  return (
    <div
      className={classNames(classes.Text, mods, [
        className,
        classes[variant],
        classes[align],
        classes[size],
      ])}
    >
      {title && (
        <HeaderTag
          className={classes.title}
          data-testid={`${dataTestId}.Header`}
        >
          {title}
        </HeaderTag>
      )}
      {text && (
        <p className={classes.text} data-testid={`${dataTestId}.Body`}>
          {text}
        </p>
      )}
    </div>
  );
});
