import { CSSProperties, memo, useMemo } from 'react';

import UserIcon from '@/shared/assets/icons/user.svg';
import { classNames, Mods } from '@/shared/lib/classNames/classNames';
import { AppImage } from '@/shared/ui/depricated/AppImage/AppImage';
import { Icon } from '@/shared/ui/depricated/Icon';
import { Skeleton } from '@/shared/ui/depricated/Skeleton';

import classes from './Avatar.module.scss';

interface AvatarProps {
  className?: string;
  src?: string;
  size?: number;
  alt?: string;
}

/**
 * Redesigned, use proper component.
 * @deprecated
 */
export const Avatar = memo((props: AvatarProps) => {
  const { className, src, size = 100, alt } = props;

  const mods: Mods = {};

  const styles = useMemo<CSSProperties>(
    () => ({
      width: size,
      height: size,
    }),
    [size],
  );

  const fallback = <Skeleton height={size} width={size} border="50%" />;
  const errorFallback = (
    <Icon
      Svg={UserIcon}
      width={size}
      height={size}
      className={classes.errorIcon}
    />
  );

  return (
    <AppImage
      fallback={fallback}
      errorFallback={errorFallback}
      src={src}
      style={styles}
      className={classNames(classes.Avatar, mods, [className])}
      alt={alt}
    />
  );
});
