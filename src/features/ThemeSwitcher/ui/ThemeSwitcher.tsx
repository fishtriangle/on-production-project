import { memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import { useTheme } from '@/shared/lib/hooks/useTheme/useTheme';
import LightIcon from '@/shared/assets/icons/theme-light.svg';
import DarkIcon from '@/shared/assets/icons/theme-dark.svg';
import BrownIcon from '@/shared/assets/icons/theme-brown.svg';
import { Button, ButtonTheme } from '@/shared/ui/Button/Button';
import classes from './ThemeSwitcher.module.scss';
import { Theme } from '@/shared/const/theme';

interface ThemeSwitcherProps {
  className?: string;
}

export const ThemeSwitcher = memo(({ className }: ThemeSwitcherProps) => {
  const { theme, toggleTheme } = useTheme();

  return (
    <Button
      theme={ButtonTheme.CLEAR}
      className={classNames(
        classes.ThemeSwitcher,
        { [classes.switched]: theme === Theme.LIGHT },
        [className],
      )}
      onClick={toggleTheme}
    >
      {theme === Theme.LIGHT && <LightIcon />}
      {theme === Theme.DARK && <DarkIcon />}
      {theme === Theme.BROWN && <BrownIcon />}
    </Button>
  );
});
