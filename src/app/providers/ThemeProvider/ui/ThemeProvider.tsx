import { FC, ReactNode, useEffect, useMemo, useState } from 'react';

import { useUserSettings } from '@/entities/User';
import { Theme } from '@/shared/const/theme';

import { ThemeContext } from '../../../../shared/lib/context/ThemeContext';

interface ThemeProviderProps {
  initialTheme?: Theme;
  children: ReactNode;
}

const ThemeProvider: FC<ThemeProviderProps> = (props) => {
  const { initialTheme, children } = props;

  const { theme: defaultTheme = Theme.LIGHT } = useUserSettings();

  const [isThemeInitiated, setIsThemeInitiated] = useState(false);
  const [theme, setTheme] = useState<Theme>(initialTheme || defaultTheme);

  useEffect(() => {
    if (!isThemeInitiated) {
      setTheme(defaultTheme);
      setIsThemeInitiated(true);
    }
  }, [defaultTheme, isThemeInitiated]);

  const defaultProps = useMemo(
    () => ({
      theme,
      setTheme,
    }),
    [theme],
  );

  return (
    <ThemeContext.Provider value={defaultProps}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
