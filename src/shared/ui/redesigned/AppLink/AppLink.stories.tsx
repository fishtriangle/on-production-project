import React from 'react';

import { ComponentStory, ComponentMeta } from '@storybook/react';

import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from '@/shared/const/theme';

import { AppLink } from './AppLink';

export default {
  title: 'redesigned/shared/AppLogo',
  component: AppLink,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
  args: {
    to: '/',
    children: 'AppLink',
  },
} as ComponentMeta<typeof AppLink>;

const Template: ComponentStory<typeof AppLink> = (args) => (
  <AppLink {...args} />
);

export const Primary = Template.bind({});
Primary.args = {
  variant: 'primary',
};

export const PrimaryDark = Template.bind({});
PrimaryDark.args = {
  variant: 'primary',
};
PrimaryDark.decorators = [ThemeDecorator(Theme.DARK)];

export const Red = Template.bind({});
Red.args = {
  variant: 'red',
};

export const RedDark = Template.bind({});
RedDark.args = {
  variant: 'red',
};
RedDark.decorators = [ThemeDecorator(Theme.DARK)];
