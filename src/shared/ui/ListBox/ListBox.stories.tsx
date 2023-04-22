import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { ListBox } from './ListBox';

export default {
  title: 'shared/ListBox',
  component: ListBox,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof ListBox>;

const Template: ComponentStory<typeof ListBox> = (args) => <ListBox {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  // eslint-disable-next-line no-console
  onChange: (value: string) => console.log(value),
  label: 'Choose item',
  defaultValue: 'Item is not selected',
  items: [
    { value: '1', content: 'asdf' },
    { value: '2', content: 'sdbgdg', disabled: true },
    { value: '3', content: 'dfbgdfsdgf' },
  ],
};
