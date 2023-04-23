import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Dropdown } from './Dropdown';

export default {
  title: 'shared/Dropdown',
  component: Dropdown,
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
} as ComponentMeta<typeof Dropdown>;

const Template: ComponentStory<typeof Dropdown> = (args) => <Dropdown {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  trigger: <div>Trigger</div>,
  items: [
    {
      value: '1',
      content: 'Option 1',
    },
    {
      value: '2',
      content: 'Option 2',
      disabled: true,
    },
    {
      value: '3',
      content: 'Option 3',
    },
  ],
};

export const UpLeft = Template.bind({});
UpLeft.args = {
  direction: 'up left',
  trigger: <div>Trigger</div>,
  items: [
    {
      value: '1',
      content: 'Option 1',
    },
    {
      value: '2',
      content: 'Option 2',
      disabled: true,
    },
    {
      value: '3',
      content: 'Option 3',
    },
  ],
};

export const UpRight = Template.bind({});
UpRight.args = {
  direction: 'up right',
  trigger: <div>Trigger</div>,
  items: [
    {
      value: '1',
      content: 'Option 1',
    },
    {
      value: '2',
      content: 'Option 2',
      disabled: true,
    },
    {
      value: '3',
      content: 'Option 3',
    },
  ],
};

export const DownLeft = Template.bind({});
DownLeft.args = {
  direction: 'down left',
  trigger: <div>Trigger</div>,
  items: [
    {
      value: '1',
      content: 'Option 1',
    },
    {
      value: '2',
      content: 'Option 2',
      disabled: true,
    },
    {
      value: '3',
      content: 'Option 3',
    },
  ],
};

export const DownRight = Template.bind({});
DownRight.args = {
  direction: 'down right',
  trigger: <div>Trigger</div>,
  items: [
    {
      value: '1',
      content: 'Option 1',
    },
    {
      value: '2',
      content: 'Option 2',
      disabled: true,
    },
    {
      value: '3',
      content: 'Option 3',
    },
  ],
};
