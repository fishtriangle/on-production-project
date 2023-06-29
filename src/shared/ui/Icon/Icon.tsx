import { FC, memo, SVGProps } from 'react';

import { classNames, Mods } from '@/shared/lib/classNames/classNames';

import classes from './Icon.module.scss';

interface IconProps extends SVGProps<SVGSVGElement> {
  className?: string;
  Svg: FC<SVGProps<SVGSVGElement>>;
}

export const Icon = memo(({ className, Svg, ...otherProps }: IconProps) => {
  const mods: Mods = {};

  return (
    <Svg
      className={classNames(classes.Icon, mods, [className])}
      {...otherProps}
    />
  );
});
