import React from 'react';

import { ComponentStory, ComponentMeta } from '@storybook/react';

import { ListBox } from './ListBox';

export default {
  title: 'shared/PopUps/ListBox',
  component: ListBox,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
  decorators: [
    (Story) => (
      <div style={{ padding: '8rem 2rem' }}>
        <Story />
      </div>
    ),
  ],
} as ComponentMeta<typeof ListBox>;

const Template: ComponentStory<typeof ListBox> = (args) => (
  <ListBox {...args} />
);

export const Primary = Template.bind({});
Primary.args = {
  label: 'Choose item',
  defaultValue: 'Item is not selected',
  items: [
    { value: '1', content: 'asdf' },
    { value: '2', content: 'sdbgdg', disabled: true },
    { value: '3', content: 'dfbgdfsdgf' },
  ],
};

export const UpLeft = Template.bind({});
UpLeft.args = {
  direction: 'up left',
  label: 'Choose item',
  defaultValue: 'Item is not selected',
  items: [
    { value: '1', content: 'asdf' },
    { value: '2', content: 'sdbgdg', disabled: true },
    { value: '3', content: 'dfbgdfsdgf' },
  ],
};

export const UpRight = Template.bind({});
UpRight.args = {
  direction: 'up right',
  label: 'Choose item',
  defaultValue: 'Item is not selected',
  items: [
    { value: '1', content: 'asdf' },
    { value: '2', content: 'sdbgdg', disabled: true },
    { value: '3', content: 'dfbgdfsdgf' },
  ],
};

export const DownLeft = Template.bind({});
DownLeft.args = {
  direction: 'down left',
  label: 'Choose item',
  defaultValue: 'Item is not selected',
  items: [
    { value: '1', content: 'asdf' },
    { value: '2', content: 'sdbgdg', disabled: true },
    { value: '3', content: 'dfbgdfsdgf' },
  ],
};

export const DownRight = Template.bind({});
DownRight.args = {
  direction: 'down right',
  label: 'Choose item',
  defaultValue: 'Item is not selected',
  items: [
    { value: '1', content: 'asdf' },
    { value: '2', content: 'sdbgdg', disabled: true },
    { value: '3', content: 'dfbgdfsdgf' },
  ],
};
