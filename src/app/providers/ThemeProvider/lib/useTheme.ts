import { useContext } from 'react';
import { LOCAL_STORAGE_THEME_KEY, Theme, ThemeContext } from './ThemeContext';

interface IUseTheme {
  toggleTheme: () => void;
  theme: Theme;
}

export function useTheme(): IUseTheme {
  const { theme, setTheme } = useContext(ThemeContext);

  const toggleTheme = () => {
    let newTheme: Theme;
    switch (theme) {
    case Theme.LIGHT:
      newTheme = Theme.DARK;
      break;
    case Theme.DARK:
      newTheme = Theme.BROWN;
      break;
    case Theme.BROWN:
      newTheme = Theme.LIGHT;
      break;
    default:
      newTheme = Theme.LIGHT;
    }
    setTheme?.(newTheme);
    localStorage.setItem(LOCAL_STORAGE_THEME_KEY, newTheme);
  };

  return {
    theme: theme || Theme.LIGHT,
    toggleTheme,
  };
}
