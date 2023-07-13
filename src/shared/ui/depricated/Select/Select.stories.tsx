import React from 'react';

import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Select } from './Select';

export default {
  title: 'shared/Select',
  component: Select,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
  args: {
    to: '/',
    children: 'Select',
  },
} as ComponentMeta<typeof Select>;

const Template: ComponentStory<typeof Select> = (args) => <Select {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  label: 'Check',
  options: [
    {
      value: '123',
      content: 'Choose 1',
    },
    {
      value: '456',
      content: 'Choose 2',
    },
    {
      value: '789',
      content: 'Choose 3',
    },
  ],
};
