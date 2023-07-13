import { memo } from 'react';

import AppLogoIcon from '@/shared/assets/icons/app.svg';
import { classNames } from '@/shared/lib/classNames/classNames';
import { HStack } from '@/shared/ui/depricated/Stack';

import classes from './AppLogo.module.scss';

interface AppLogoProps {
  className?: string;
}

/**
 * Redesigned, use proper component.
 * @deprecated
 */
export const AppLogo = memo(({ className }: AppLogoProps) => (
  <HStack
    maxWidth
    justify="center"
    className={classNames(classes.AppLogo, {}, [className])}
  >
    <div className={classes.gradientLarge} />
    <div className={classes.gradientSmall} />
    <AppLogoIcon className={classes.appLogoIcon} />
  </HStack>
));
