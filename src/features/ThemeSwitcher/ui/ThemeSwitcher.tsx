import { memo, useCallback } from 'react';

import { saveJsonSettings } from '@/entities/User';
import ThemeIcon from '@/shared/assets/icons/import/theme.svg';
import BrownIconDeprecated from '@/shared/assets/icons/theme-brown.svg';
import DarkIconDeprecated from '@/shared/assets/icons/theme-dark.svg';
import LightIconDeprecated from '@/shared/assets/icons/theme-light.svg';
import { Theme } from '@/shared/const/theme';
import { classNames } from '@/shared/lib/classNames/classNames';
import { ToggleFeatures } from '@/shared/lib/features';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useTheme } from '@/shared/lib/hooks/useTheme/useTheme';
import { Button, ButtonTheme } from '@/shared/ui/deprecated/Button';
import { Icon } from '@/shared/ui/redesigned/Icon';

import classes from './ThemeSwitcher.module.scss';

interface ThemeSwitcherProps {
  className?: string;
}

export const ThemeSwitcher = memo(({ className }: ThemeSwitcherProps) => {
  const { theme, toggleTheme } = useTheme();
  const dispatch = useAppDispatch();

  const onToggleThemeHandler = useCallback(() => {
    toggleTheme((newTheme) => {
      dispatch(saveJsonSettings({ theme: newTheme }));
    });
  }, [dispatch, toggleTheme]);

  const SwitcherDeprecated = useCallback(
    () => (
      <Button
        theme={ButtonTheme.CLEAR}
        className={classNames(
          classes.ThemeSwitcher,
          { [classes.switched]: theme === Theme.LIGHT },
          [className],
        )}
        onClick={onToggleThemeHandler}
      >
        {theme === Theme.LIGHT && <LightIconDeprecated />}
        {theme === Theme.DARK && <DarkIconDeprecated />}
        {theme === Theme.BROWN && <BrownIconDeprecated />}
      </Button>
    ),
    [className, onToggleThemeHandler, theme],
  );

  return (
    <ToggleFeatures
      featureName="isSiteRedesigned"
      on={<Icon Svg={ThemeIcon} clickable onClick={onToggleThemeHandler} />}
      off={<SwitcherDeprecated />}
    />
  );
});
