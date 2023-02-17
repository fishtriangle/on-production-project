import 'app/styles/index.scss';
import { Story } from '@storybook/react';
import { Theme, ThemeProvider } from 'app/providers/ThemeProvider';

export const ThemeDecorator = (theme: Theme) => (Story: Story) => (
  <ThemeProvider>
    <div className={`app ${theme}`}>
      <Story />
    </div>
  </ThemeProvider>
);
