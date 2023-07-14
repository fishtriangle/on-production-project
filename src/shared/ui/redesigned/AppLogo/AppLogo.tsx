import { memo } from 'react';

import AppLogoIcon from '@/shared/assets/icons/app.svg';
import { classNames } from '@/shared/lib/classNames/classNames';
import { HStack } from '@/shared/ui/depricated/Stack';

import classes from './AppLogo.module.scss';

interface AppLogoProps {
  className?: string;
  size?: number;
}

export const AppLogo = memo(({ className, size = 50 }: AppLogoProps) => (
  <HStack
    maxWidth
    justify="center"
    className={classNames(classes.AppLogo, {}, [className])}
  >
    <div className={classes.gradientLarge} />
    <div className={classes.gradientSmall} />
    <AppLogoIcon
      width={size}
      height={size}
      color="black"
      className={classes.appLogoIcon}
    />
  </HStack>
));
