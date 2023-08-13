import { Theme } from '../../src';
import { FeatureFlagDecorator } from '../../src/shared/config/storybook/FeatureFlagDecorator/FeatureFlagDecorator';
import { I18nDecorator } from '../../src/shared/config/storybook/I18nDecodator/I18nDecorator';
import { RouterDecorator } from '../../src/shared/config/storybook/RouterDecorator/RouterDecorator';
import { StoreDecorator } from '../../src/shared/config/storybook/StoreDecorator/StoreDecorator';
import { StyleDecorator } from '../../src/shared/config/storybook/StyleDecorator/StyleDecorator';
import { SuspenseDecorator } from '../../src/shared/config/storybook/SuspenseDecorator/SuspenseDecorator';
import { ThemeDecorator } from '../../src/shared/config/storybook/ThemeDecorator/ThemeDecorator';

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  layout: 'fullscreen',
  themes: {
    default: 'light',
    list: [
      { name: 'light', class: Theme.LIGHT, color: '#e8e8ea' },
      { name: 'dark', class: Theme.DARK, color: '#292d32' },
      { name: 'brown', class: Theme.BROWN, color: '#8b6431' },
    ],
  },
  backgrounds: {
    disable: true,
    grid: {
      disable: true,
    },
  },
};

export const decorators = [
  I18nDecorator,
  StyleDecorator,
  ThemeDecorator(Theme.NONE),
  RouterDecorator,
  StoreDecorator({}),
  SuspenseDecorator,
  FeatureFlagDecorator({
    isSiteRedesigned: false,
  }),
];
