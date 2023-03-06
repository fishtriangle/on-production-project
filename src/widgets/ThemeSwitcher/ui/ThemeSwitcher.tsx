import { classNames } from 'shared/lib/classNames/classNames';
import { memo, useEffect } from 'react';
import { Theme, useTheme } from 'app/providers/ThemeProvider';
import LightIcon from 'shared/assets/icons/theme-light.svg';
import DarkIcon from 'shared/assets/icons/theme-dark.svg';
import { Button, ButtonTheme } from 'shared/ui/Button/Button';
import classes from './ThemeSwitcher.module.scss';

interface ThemeSwitcherProps {
  className?: string;
  customTheme?: Theme;
}

export const ThemeSwitcher = memo(({ className, customTheme = Theme.LIGHT }: ThemeSwitcherProps) => {
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    if (theme === customTheme) {
      toggleTheme();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
      {theme === Theme.LIGHT ? <LightIcon /> : <DarkIcon fill="#00ff00" />}
    </Button>
  );
});
