import { CSSProperties, memo } from 'react';
import { classNames, Mods } from '@/shared/lib/classNames/classNames';
import classes from './Skeleton.module.scss';

interface SkeletonProps {
  className?: string;
  height?: number | string;
  width?: number | string;
  border?: string;
}

export const Skeleton = memo((props: SkeletonProps) => {
  const {
    className, width, border, height,
  } = props;

  const style: CSSProperties = {
    width,
    height,
    borderRadius: border,
  };

  const mods: Mods = {};

  return (
    <div
      className={classNames(classes.Skeleton, mods, [className])}
      style={style}
    />
  );
});
