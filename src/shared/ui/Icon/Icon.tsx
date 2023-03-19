import { classNames, Mods } from 'shared/lib/classNames/classNames';
import { memo } from 'react';
import classes from './Icon.module.scss';

interface IconProps {
  className?: string;
  Svg: React.VFC<React.SVGProps<SVGSVGElement>>;
}

export const Icon = memo(({ className, Svg }: IconProps) => {
  const mods: Mods = {};

  return (
    <Svg className={classNames(classes.Icon, mods, [className])} />
  );
});
