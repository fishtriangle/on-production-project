import React from 'react';

import { ComponentStory, ComponentMeta } from '@storybook/react';

import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from '@/shared/const/theme';

import { Button } from './Button';

export default {
  title: 'redesigned/shared/Button',
  component: Button,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = (args) => <Button {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  children: 'Text',
};

export const Clear = Template.bind({});
Clear.args = {
  children: 'Text',
  variant: 'clear',
};

export const Disabled = Template.bind({});
Disabled.args = {
  children: 'Text',
  disabled: true,
};

export const Outline = Template.bind({});
Outline.args = {
  children: 'Text',
  variant: 'outline',
};

export const OutlineL = Template.bind({});
OutlineL.args = {
  children: 'Text',
  variant: 'outline',
  size: 'sizeL',
};

export const OutlineXL = Template.bind({});
OutlineXL.args = {
  children: 'Text',
  variant: 'outline',
  size: 'sizeXL',
};

export const OutlineDark = Template.bind({});
OutlineDark.args = {
  children: 'Text',
  variant: 'outline',
};
OutlineDark.decorators = [ThemeDecorator(Theme.DARK)];
