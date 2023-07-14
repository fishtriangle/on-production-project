import { FC, memo, SVGProps } from 'react';

import { classNames, Mods } from '@/shared/lib/classNames/classNames';

import classes from './Icon.module.scss';

type CustomSvgProps = Omit<SVGProps<SVGSVGElement>, 'onClick'>;

interface IconBaseProps extends CustomSvgProps {
  className?: string;
  Svg: FC<SVGProps<SVGSVGElement>>;
}

interface NonInteractiveIconProps extends IconBaseProps {
  clickable?: false;
}

interface InteractiveIconProps extends IconBaseProps {
  clickable: true;
  onClick: () => void;
}

type IconProps = NonInteractiveIconProps | InteractiveIconProps;

export const Icon = memo((props: IconProps) => {
  const {
    className,
    Svg,
    clickable,
    width = 32,
    height = 32,
    ...otherProps
  } = props;
  const mods: Mods = {};

  const icon = (
    <Svg
      className={classNames(classes.Icon, mods, [className])}
      width={width}
      height={height}
      {...otherProps}
      onClick={undefined}
    />
  );

  if (clickable) {
    return (
      <button
        type="button"
        onClick={props.onClick}
        className={classes.button}
        style={{ width, height }}
      >
        {icon}
      </button>
    );
  }

  return icon;
});
